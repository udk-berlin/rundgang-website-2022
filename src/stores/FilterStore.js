import { action, makeAutoObservable, observable, toJS } from "mobx";
const INITIAL_SELECTION = {
  ebene0: null,
  initiatives: null,
  ebene1: null,
  classes: null,
  seminars: null,
};
class FilterStore {
  constructor() {
    this.selected = INITIAL_SELECTION;
    this.openTagGroup = 0;
    this.isInitialized = true;
    this.selectedId = null;
    this.isTagSelected = false;

    makeAutoObservable(this, {
      setIsTagSelected: action,
      setOpenTagGroup: action,
      handleReset: action,
      openTagGroup: observable,
      isTagSelected: observable,
    });
  }

  connect = ({ store, dataStore }) => {
    this.parentStore = store;
    this.dataStore = dataStore;
  };

  setOpenTagGroup(openTagGroup) {
    this.openTagGroup = openTagGroup;
  }

  handleToggleOpen = group => {
    if (group == this.openTagGroup) {
      this.setOpenTagGroup(null);
    } else {
      this.setOpenTagGroup(group);
    }
  };

  setIsTagSelected(isSel) {
    this.isTagSelected = isSel;
  }

  handleReset = () => {
    this.selected = INITIAL_SELECTION;
    this.setOpenTagGroup(0);
  };

  setSelected = (name, id, parent, grandparent, greatgrandparent) => {
    if (this.selected[name] == id) {
      this.selected = INITIAL_SELECTION;
      this.selectedId = null;
    } else {
      this.selectedId = id;
      const selectAncestors = categories => {
        return categories.reduce((obj, cat) => {
          let selId = "none";
          if (this.initialTags[cat].find(x => x.id == id)) {
            selId = id;
          } else if (this.initialTags[cat].find(x => x.id == parent)) {
            selId = parent;
          } else if (this.initialTags[cat].find(x => x.id == grandparent)) {
            selId = grandparent;
          } else if (
            this.initialTags[cat].find(x => x.id == greatgrandparent)
          ) {
            selId = greatgrandparent;
          }
          return { ...obj, [cat]: selId };
        }, {});
      };
      switch (name) {
        case "ebene0":
          this.selected = {
            ...INITIAL_SELECTION,
            ebene0: id,
          };
          break;
        case "faculty":
          this.selected = {
            ...INITIAL_SELECTION,
            ebene0: id,
          };
          break;
        case "consulting service":
          this.selected = {
            ...INITIAL_SELECTION,
            ebene0: id,
          };
          break;
        case "centre":
          this.selected = {
            ...INITIAL_SELECTION,
            ebene0: id,
          };
          break;
        case "initiatives":
          this.selected = {
            ...INITIAL_SELECTION,
            initiatives: id,
          };
          break;
        case "ebene1":
          this.selected = {
            ...INITIAL_SELECTION,
            ebene1: id,
            ...selectAncestors(["ebene0", "initiatives"]),
          };
          break;
        case "institute":
          this.selected = {
            ...INITIAL_SELECTION,
            ebene1: id,
            ...selectAncestors(["ebene0", "initiatives"]),
          };
          break;
        case "subject":
          this.selected = {
            ...INITIAL_SELECTION,
            ebene1: id,
            ...selectAncestors(["ebene0", "initiatives"]),
          };
          break;
        case "classes":
          this.selected = {
            ...INITIAL_SELECTION,
            classes: id,
            ...selectAncestors(["ebene0", "initiatives", "ebene1"]),
          };
          break;
        case "class":
          this.selected = {
            ...INITIAL_SELECTION,
            classes: id,
            ...selectAncestors(["ebene0", "initiatives", "ebene1"]),
          };
          break;
        case "seminars":
          this.selected = {
            seminars: id,
            ...selectAncestors(["ebene0", "initiatives", "ebene1", "classes"]),
          };
          break;
        case "seminar":
          this.selected = {
            seminars: id,
            ...selectAncestors(["ebene0", "initiatives", "ebene1", "classes"]),
          };
          break;
        case "course":
          this.selected = {
            seminars: id,
            ...selectAncestors(["ebene0", "initiatives", "ebene1", "classes"]),
          };
          break;
        default:
          this.selected = INITIAL_SELECTION;
      }
    }
  };

  get initialTags() {
    let wholeStructure = this.dataStore.api.structure?.children;

    const getChildList = list =>
      list
        .map(c =>
          _.values(c.children).map(child => ({
            ...child,
            parent: c.id,
            grandparent: c.parent,
            greatgrandparent: c.grandparent,
          })),
        )
        .flat();

    const filterTemplate = (list, template) => {
      let res = list.filter(c => template.includes(c.template));
      //let filternames = [...new Map(res.map(v => [v.name, v])).values()];
      return res;
    };

    const faculties = filterTemplate(_.values(wholeStructure), ["faculty"]);
    const centres = filterTemplate(_.values(wholeStructure), ["centre"]);
    const beratungsangebote = filterTemplate(_.values(wholeStructure), [
      "consulting service",
    ]);
    const initiatives = filterTemplate(_.values(wholeStructure), [
      "initiative",
    ]);

    const ebene0 = faculties.concat(centres).concat(beratungsangebote);
    const ebene0children = getChildList(ebene0);
    const institutes = filterTemplate(ebene0children, ["institute"]);
    const studienganglist = getChildList(
      ebene0children.concat(institutes),
    ).concat(ebene0children);
    const subjects = filterTemplate(studienganglist, ["subject"]);

    const ebene1 = subjects.concat(institutes);
    let ebene1children = getChildList(ebene1);
    ebene1children = ebene1children.concat(getChildList(ebene1children));
    const classes = filterTemplate(ebene1children, ["class"]);
    const seminars = filterTemplate(ebene1children.concat(ebene0children), [
      "seminar",
      "consulting service",
      "course",
    ]);

    return { ebene0, initiatives, ebene1, classes, seminars };
  }

  get contextList() {
    return [
      ...new Map(
        _.values(this.initialTags)
          .flat()
          .map(item => [item.name, item]),
      ).values(),
    ]
      .flat()
      .concat(Object.values(this.dataStore.api.locations?.children));
  }

  get currentTags() {
    let sel = Boolean(
      _.values(this.selected).find(v => v !== null && v !== "none"),
    );
    if (sel) {
      let allTags = this.initialTags;
      const flEl = (group, sel) => {
        let res = group.filter(
          k =>
            k.parent == sel ||
            k.grandparent == sel ||
            k.greatgrandparent == sel,
        );
        res = [...new Map(res.map(item => [item.name, item])).values()];
        return res;
      };
      if (this.selected.seminars !== null) {
        return allTags;
      }
      if (this.selected.classes !== null && this.selected.classes !== "none") {
        allTags = {
          ...allTags,
          seminars: flEl(allTags.seminars, this.selected.classes),
        };
      }
      if (this.selected.ebene1 !== null && this.selected.ebene1 !== "none") {
        allTags = {
          ...allTags,
          initiatives: flEl(allTags.initiatives, this.selected.ebene1),
          classes: flEl(allTags.classes, this.selected.ebene1),
          seminars: flEl(allTags.seminars, this.selected.ebene1),
        };
      }
      if (
        this.selected.initiatives !== null &&
        this.selected.initiatives !== "none"
      ) {
        allTags = {
          ...allTags,
          classes: flEl(allTags.classes, this.selected.initiatives),
          seminars: flEl(allTags.seminars, this.selected.initiatives),
        };
      }
      if (this.selected.ebene0 !== null && this.selected.ebene0 !== "none") {
        allTags = {
          ...allTags,
          ebene1: flEl(allTags.ebene1, this.selected.ebene0),
          initiatives: flEl(allTags.initiatives, this.selected.ebene0),
          classes: flEl(allTags.classes, this.selected.ebene0),
          seminars: flEl(allTags.seminars, this.selected.ebene0),
        };
      }
      this.setIsTagSelected(true);
      return allTags;
    } else {
      this.setIsTagSelected(false);
      return this.initialTags;
    }
  }
}

export default FilterStore;
