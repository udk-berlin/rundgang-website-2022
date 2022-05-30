import { makeAutoObservable } from "mobx";
const INITIAL_SELECTION = { 0: null, 1: null, 2: null };
class UiStore {
  constructor() {
    this.isOpen = false;
    this.allStores = [];
    this.savedItemIds = [];
    this.title = "rundgang";
    this.selected = INITIAL_SELECTION;
    this.openTagGroup = 0;

    makeAutoObservable(this, {});
  }

  connect = ({ dataStore }) => {
    this.dataStore = dataStore;
    this.allStores.forEach(store => store?.connect?.(this));
  };

  initialize = () => {
    this.allStores.forEach(store => store?.initialize?.(this));
  };

  get isLoaded() {
    return (
      this.allStores.filter(store => store.isInitialized === false).length === 0
    );
  }

  get selectedItem() {
    return this.menuItems[this.selected];
  }

  setIsLoaded(loaded) {
    this.isLoaded = loaded;
  }

  setIsOpen(open) {
    this.isOpen = open;
  }

  get numberSavedItems() {
    return this.savedItemIds.length;
  }

  get savedItems() {
    console.log(this.dataStore.api.cachedIds);
    return this.savedItemIds.map(id => this.dataStore.api.cachedIds[id]);
  }

  addToSaved(id) {
    if (this.savedItemIds.includes(id)) {
      this.savedItemIds = this.savedItemIds.filter(i => i !== id);
    } else {
      this.savedItemIds.push(id);
    }
  }

  setTitle(title, id) {
    if (
      id == "!yGwpTLQiIMoyuhGggS:dev.medienhaus.udk-berlin.de" ||
      title == "rundgang22-struct-root"
    ) {
      this.title = "rundgang";
    } else if (title == "locations") {
      this.title = "orte";
    } else if (title == "Universität der Künste Berlin") {
      this.title = "katalog";
    } else {
      this.title = title;
    }
  }
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

  handleReset = () => {
    this.selected = INITIAL_SELECTION;
    this.setOpenTagGroup(0);
  };

  setSelected = (level, id, parent, grandparent) => {
    let newSelected = this.selected;
    if (id == this.selected[level]) {
      id = null;
    }
    if (level == 0) {
      newSelected = { 0: id, 1: null, 2: null };
    }
    if (level == 1) {
      newSelected = { 0: parent, 1: id, 2: null };
    }
    if (level == 2) {
      newSelected = { 0: grandparent, 1: parent, 2: id };
    }
    this.selected = newSelected;
    if (level < 2 && id !== null) {
      this.setOpenTagGroup(level + 1);
    }
  };

  get currentTags() {
    let wholeStructure = this.dataStore.api.structure?.children;

    const children0 = _.values(wholeStructure);
    let children1 = children0
      .map(c => _.values(c.children).map(child => ({ ...child, parent: c.id })))
      .flat();
    let children2 = children1
      .map(c =>
        _.values(c.children).map(child => ({
          ...child,
          parent: c.id,
          grandparent: c.parent,
        })),
      )
      .flat();

    if (this.selected[1] !== null) {
      children1 = children1.filter(c => c.parent == this.selected[0]);
      children2 = children2.filter(c => c.parent == this.selected[1]);
    } else if (this.selected[0] !== null) {
      children1 = children1.filter(c => c.parent == this.selected[0]);
      children2 = children2.filter(c => c.grandparent == this.selected[0]);
    }
    const level0 = {
      name: "level0",
      level: 0,
      numberItems: children0.length,
      children: _.groupBy(children0, "template"),
    };
    const level1 = {
      name: "level1",
      level: 1,
      numberItems: children1.length,
      children: _.groupBy(children1, "template"),
    };
    const level2 = {
      name: "level2",
      level: 2,
      numberItems: children2.length,
      children: _.groupBy(children2, "template"),
    };
    return [level0, level1, level2];
  }

  get isTagSelected() {
    if (
      this.selected[0] !== null ||
      this.selected[1] !== null ||
      this.selected[2] !== null
    ) {
      return true;
    }
    return false;
  }

  get selectedId() {
    if (this.selected[2] !== null) {
      return this.selected[2];
    }
    if (this.selected[1] !== null) {
      return this.selected[1];
    }
    if (this.selected[0] !== null) {
      return this.selected[0];
    }
    return null;
  }

  get items() {
    if (
      this.dataStore.api.currentRoot &&
      this.dataStore.api.currentRoot.id !== this.dataStore.api.root.id
    ) {
      return this.dataStore.api.currentItems;
    }
    return [];
  }
}

export default UiStore;
