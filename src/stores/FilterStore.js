import _ from "lodash";
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
    this.selectedId = null;
    this.setOpenTagGroup(0);
  };

  setSelected = (name, id, ancestors) => {
    if (this.selected[name] == id) {
      this.selected = INITIAL_SELECTION;
      this.selectedId = null;
    } else {
      this.selectedId = id;
      const selectAncestors = ancestors => {
        return _.keys(INITIAL_SELECTION).reduce((obj, cat) => {
          let selId = "none";
          if (
            cat in this.initialTags &&
            this.initialTags[cat].find(x => x.id == id)
          ) {
            selId = id;
          } else if (
            cat in this.initialTags &&
            this.initialTags[cat].find(x => ancestors.includes(x.id))
          ) {
            selId = this.initialTags[cat].find(x =>
              ancestors.includes(x.id),
            )?.id;
          }
          return { ...obj, [cat]: selId };
        }, {});
      };
      if (
        ["ebene0", "faculty", "consulting service", "centre"].includes(name)
      ) {
        this.selected = {
          ...INITIAL_SELECTION,
          ebene0: id,
        };
      } else if (["initiatives", "initiative"].includes(name)) {
        this.selected = {
          ...INITIAL_SELECTION,
          initiatives: id,
        };
      } else if (["ebene1", "institute", "subject"].includes(name)) {
        this.selected = {
          ...INITIAL_SELECTION,
          ebene1: id,
          ...selectAncestors(ancestors),
        };
      } else if (["classes", "class"].includes(name)) {
        this.selected = {
          ...INITIAL_SELECTION,
          classes: id,
          ...selectAncestors(ancestors),
        };
      } else if (["seminars", "seminar", "course"].includes(name)) {
        this.selected = {
          ...INITIAL_SELECTION,
          seminars: id,
          ...selectAncestors(ancestors),
        };
      } else {
        this.selected = INITIAL_SELECTION;
      }
    }
  };

  get initialTags() {
    return this.dataStore.api.tags;
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
      .concat(Object.values(this.dataStore.api.locations));
  }

  get currentTags() {
    let sel = Boolean(_.values(this.selected).find(v => v && v !== "none"));
    if (sel) {
      let allTags = this.initialTags;
      const flEl = (group, sel) => {
        if (group && sel) {
          let res = group.filter(k => k.ancestors.includes(sel));
          res = [...new Map(res.map(item => [item.name, item])).values()];
          return res;
        }
        return group;
      };
      if (this.selected?.seminars !== null) {
        return allTags;
      }
      if (this.selected?.classes && this.selected.classes !== "none") {
        allTags = {
          ...allTags,
          seminars: flEl(allTags.seminars, this.selected.classes),
        };
      }
      if (this.selected?.ebene1 && this.selected.ebene1 !== "none") {
        allTags = {
          ...allTags,
          initiatives: flEl(allTags.initiatives, this.selected.ebene1),
          classes: flEl(allTags.classes, this.selected.ebene1),
          seminars: flEl(allTags.seminars, this.selected.ebene1),
        };
      }
      if (this.selected?.initiatives && this.selected.initiatives !== "none") {
        allTags = {
          ...allTags,
          classes: flEl(allTags.classes, this.selected.initiatives),
          seminars: flEl(allTags.seminars, this.selected.initiatives),
        };
      }
      if (this.selected.ebene0 && this.selected.ebene0 !== "none") {
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
