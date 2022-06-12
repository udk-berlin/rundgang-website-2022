import { makeAutoObservable, toJS } from "mobx";
import FilterStore from "./FilterStore";

class UiStore {
  constructor() {
    this.isOpen = false;
    this.filterStore = new FilterStore();
    this.allStores = [this.filterStore];
    this.savedItemIds = [];
    this.title = "rundgang";

    makeAutoObservable(this, {});
  }

  connect = ({ dataStore }) => {
    this.dataStore = dataStore;
    this.allStores.forEach(store => store?.connect?.(this, dataStore));
  };

  initialize = () => {
    this.allStores.forEach(store => store?.initialize?.(this));
  };

  get isLoaded() {
    return (
      this.allStores.filter(store => store.isInitialized === false).length === 0
    );
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
    return this.savedItemIds.map(id => this.dataStore.api.cachedIds[id]);
  }

  get savedEvents() {
    let savedEvents = this.dataStore.api.eventlist.filter(ev =>
      this.savedItemIds.find(sav => sav == ev.id),
    );
    return this.dataStore.createEventStructure(savedEvents);
  }

  isSaved(id) {
    return this.savedItemIds.find(x => x == id);
  }

  addToSaved(e, id) {
    e.preventDefault();
    if (this.savedItemIds.includes(id)) {
      this.savedItemIds = this.savedItemIds.filter(i => i !== id);
    } else {
      this.savedItemIds.push(id);
    }
  }

  setTitle(title, id) {
    console.log(title, id);
    if (
      id == this.dataStore?.api?.root?.id ||
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

  get items() {
    if (
      this.dataStore.api.currentRoot &&
      this.dataStore.api.currentRoot?.id !== this.dataStore.api.root.id &&
      this.dataStore.api.currentItems
    ) {
      return this.dataStore.api.currentItems;
    }
    return [];
  }
}

export default UiStore;
