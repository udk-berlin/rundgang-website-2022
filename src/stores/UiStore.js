import { action, makeAutoObservable, observable, toJS } from "mobx";
import FilterStore from "./FilterStore";

class UiStore {
  constructor() {
    this.isOpen = false;
    this.filterStore = new FilterStore();
    this.allStores = [this.filterStore];
    this.savedItemIds = [];
    this.title = null;
    this.floorLevel = null;
    this.selectedRoom = null;

    makeAutoObservable(this, {
      setIsOpen: action,
      isOpen: observable,
    });
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
    if (title == "locations" || title == "orte") {
      this.title = "orte";
    } else if (title == "Universität der Künste Berlin" || title == "katalog") {
      this.title = "katalog";
    } else if (title == "zeiten") {
      this.title = "zeiten";
    } else if (
      id == this.dataStore?.api?.root?.id ||
      title == "rundgang22-root"
    ) {
      this.title = "rundgang";
    } else {
      this.title = title;
    }
  }

  setFloorLevel(level) {
    this.floorLevel = level;
  }

  setSelectedRoom(r) {
    this.selectedRoom = r;
  }

  get floorPlan() {
    if (this.dataStore.api.currentRoot?.template == "location-building") {
      return this.dataStore.api.currentRoot.levels.find(
        i => i.name == this.floorLevel,
      );
    }
    return null;
  }

  get buildingLevels() {
    return this.dataStore.api.currentRoot?.levels?.filter(
      c => c.template == "location-level",
    );
  }

  get currentContext() {
    if (this.dataStore.api.currentRoot) {
      return this.dataStore.api.currentRoot;
    }
    return null;
  }

  get items() {
    if (this.dataStore.api.currentRoot && this.dataStore.api.currentItems) {
      if (
        this.dataStore.api.currentRoot?.template == "location-building" &&
        this.floorLevel
      ) {
        let tag = this.selectedRoom ? this.selectedRoom.name : this.floorLevel;
        return this.dataStore.api.currentItems.filter(el =>
          el.tags.find(t => t.name == tag),
        );
      }
      return this.dataStore.api.currentItems;
    }
    return [];
  }
}

export default UiStore;
