import { action, makeAutoObservable, observable, toJS } from "mobx";
const INITIAL_SELECTION = {
  fakultaeten: null,
  zentren: null,
  beratungsangebote: null,
  institute: null,
  studiengaenge: null,
  fachgebiete: null,
  klassen: null,
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
        case "fakultaeten":
          this.selected = {
            ...INITIAL_SELECTION,
            fakultaeten: id,
            zentren: "none",
          };
          break;
        case "zentren":
          this.selected = {
            ...INITIAL_SELECTION,
            zentren: id,
            fakultaeten: "none",
          };
          break;
        case "beratungsangebote":
          this.selected = {
            ...INITIAL_SELECTION,
            ...selectAncestors(["fakultaeten", "zentren"]),
            beratungsangebote: id,
          };
          break;
        case "institute":
          this.selected = {
            ...INITIAL_SELECTION,
            institute: id,
            ...selectAncestors([
              "fakultaeten",
              "zentren",
              "studiengaenge",
              "beratungsangebote",
            ]),
          };
          break;
        case "studiengaenge":
          this.selected = {
            ...INITIAL_SELECTION,
            studiengaenge: id,
            ...selectAncestors([
              "fakultaeten",
              "zentren",
              "institute",
              "beratungsangebote",
            ]),
          };
          break;
        case "fachgebiete":
          this.selected = {
            ...INITIAL_SELECTION,
            fachgebiete: id,
            ...selectAncestors([
              "fakultaeten",
              "zentren",
              "institute",
              "beratungsangebote",
              "studiengaenge",
            ]),
          };
          break;
        case "klassen":
          this.selected = {
            klassen: id,
            ...selectAncestors([
              "fakultaeten",
              "zentren",
              "institute",
              "beratungsangebote",
              "studiengaenge",
              "fachgebiete",
            ]),
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
      return [...new Map(res.map(v => [v.id, v])).values()];
    };

    const fakultaeten = filterTemplate(_.values(wholeStructure), ["Fakultät"]);
    const zentren = filterTemplate(_.values(wholeStructure), ["Institut"]);
    const beratungsangebote = filterTemplate(_.values(wholeStructure), [
      "Beratungsangebot",
    ]);

    const ebene0 = fakultaeten.concat(zentren).concat(beratungsangebote);
    const ebene0children = getChildList(ebene0);
    const institute = filterTemplate(ebene0children, ["Institut"]);
    const studienganglist = getChildList(
      ebene0children.concat(institute),
    ).concat(ebene0children);
    const studiengaenge = filterTemplate(studienganglist, ["Studiengang"]);

    const ebene1 = studiengaenge.concat(institute);
    let ebene1children = getChildList(ebene1);
    ebene1children = ebene1children.concat(getChildList(ebene1children));
    const fachgebiete = filterTemplate(ebene1children, ["Fachgebiet"]);
    const klassen = filterTemplate(ebene1children.concat(ebene0children), [
      "class",
      "Beratungsangebot",
    ]);

    return {
      fakultaeten,
      zentren,
      beratungsangebote,
      institute,
      studiengaenge,
      fachgebiete,
      klassen,
    };
  }

  get contextList() {
    return Object.values(this.initialTags)
      .flat()
      .concat(Object.values(this.dataStore.api.locations?.children));
  }

  get currentTags() {
    let sel = Boolean(
      _.values(this.selected).find(v => v !== null && v !== "none"),
    );
    if (sel) {
      let allTags = this.initialTags;
      const flEl = (group, sel) =>
        group.filter(
          k =>
            k.parent == sel ||
            k.grandparent == sel ||
            k.greatgrandparent == sel,
        );
      if (this.selected.klassen !== null) {
        return allTags;
      }
      if (
        this.selected.fachgebiete !== null &&
        this.selected.fachgebiete !== "none"
      ) {
        allTags = {
          ...allTags,
          klassen: flEl(allTags.klassen, this.selected.fachgebiete),
        };
      }
      if (
        this.selected.studiengaenge !== null &&
        this.selected.studiengaenge !== "none"
      ) {
        allTags = {
          ...allTags,
          fachgebiete: flEl(allTags.fachgebiete, this.selected.studiengaenge),
          klassen: flEl(allTags.klassen, this.selected.studiengaenge),
        };
      }
      if (
        this.selected.institute !== null &&
        this.selected.institute !== "none"
      ) {
        allTags = {
          ...allTags,
          studiengaenge: flEl(allTags.studiengaenge, this.selected.institute),
          fachgebiete: flEl(allTags.fachgebiete, this.selected.institute),
          klassen: flEl(allTags.klassen, this.selected.institute),
        };
      }
      if (this.selected.zentren !== null && this.selected.zentren !== "none") {
        allTags = {
          ...allTags,
          studiengaenge: flEl(allTags.studiengaenge, this.selected.zentren),
          fachgebiete: flEl(allTags.fachgebiete, this.selected.zentren),
          klassen: flEl(allTags.klassen, this.selected.zentren),
        };
      }
      if (
        this.selected.fakultaeten !== null &&
        this.selected.fakultaeten !== "none"
      ) {
        allTags = {
          ...allTags,
          institute: flEl(allTags.institute, this.selected.fakultaeten),
          studiengaenge: flEl(allTags.studiengaenge, this.selected.fakultaeten),
          fachgebiete: flEl(allTags.fachgebiete, this.selected.fakultaeten),
          klassen: flEl(allTags.klassen, this.selected.fakultaeten),
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
