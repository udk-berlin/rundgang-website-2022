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
    this.filteredByIds = null;
    this.isLoaded = false;

    makeAutoObservable(this, {
      setIsOpen: action,
      setTitle: action,
      setIsLoaded: action,
      title: observable,
      isOpen: observable,
      isLoaded: observable,
    });
  }

  setIsLoaded = isl => {
    this.isLoaded = isl;
  };

  connect = ({ dataStore }) => {
    this.dataStore = dataStore;
    this.allStores.forEach(store => store?.connect?.(this, dataStore));
  };

  setIsOpen = open => {
    this.isOpen = open;
  };

  get numberSavedItems() {
    return this.savedItemIds.length;
  }

  get savedItems() {
    return this.savedItemIds.map(id => this.dataStore.api.cachedIds[id]);
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
      id == this.dataStore?.api?.root?.id &&
      (title == "rundgang22-root" ||
        title == "rundgang22" ||
        title == "Rundgang22")
    ) {
      this.title = "rundgang";
    } else {
      this.title = title;
    }
    this.setIsLoaded(true);
  }

  setFloorLevel(level) {
    this.floorLevel = level;
  }

  setSelectedRoom(r) {
    this.selectedRoom = r;
  }

  setFilteredByIds(arr) {
    this.filteredByIds = arr;
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

  get filteredEvents() {
    if (this.dataStore.api?.eventlist && this.items) {
      let events = Object.values(this.dataStore.api.eventlist).filter(ev =>
        this.items.find(item => item.id == ev.id),
      );
      return this.dataStore.createEventStructure(events);
    }
    return null;
  }

  get filteredLocations() {
    if (this.items) {
      let locations = this.dataStore.api?.locations?.filter(loc =>
        this.items.find(item => item.tags?.find(t => t.id == loc.id)),
      );
      if (locations?.length) {
        return locations;
      }
    }
    return [];
  }

  get savedEvents() {
    if (this.dataStore.api?.eventlist) {
      let events = Object.values(this.dataStore.api.eventlist).filter(ev =>
        this.savedItemIds.find(id => id == ev.id),
      );
      return this.dataStore.createEventStructure(events);
    }
    return null;
  }

  get houseInfo() {
    if (this.dataStore.api?.locations?.length) {
      return this.dataStore.api.locations.reduce(
        (obj, item) => ({
          ...obj,
          [item.name]: item,
        }),
        {},
      );
    }
    return null;
  }

  get items() {
    if (this.dataStore.api.currentRoot && this.dataStore.api.currentItems) {
      if (
        this.dataStore.api.currentRoot?.template == "location-building" &&
        this.floorLevel
      ) {
        let env = process.env.NODE_ENV == "development" ? "dev" : "production";
        let tag = this.selectedRoom ? this.selectedRoom[env] : this.floorLevel;
        return this.dataStore.api.currentItems.filter(el =>
          el.tags.find(t => t.id == tag || t.name == tag),
        );
      }
      if (this.filteredByIds?.length) {
        return this.dataStore.api.currentItems.filter(el =>
          el.tags.find(t => this.filteredByIds.includes(t.id)),
        );
      }
      return this.dataStore.api.currentItems;
    }
    return null;
  }
}

export default UiStore;
