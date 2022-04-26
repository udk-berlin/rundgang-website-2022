import { makeAutoObservable } from "mobx";
import FilterStore from "./modules/FilterStore";

class UiStore {
  constructor() {
    this.filterStore = new FilterStore();
    this.isOpen = false;
    this.allStores = [this.filterStore];
    this.numberSavedItems = 0;
    this.menuItems = ["orte", "zeiten", "katalog", "advice"];
    this.selected = null;
    this.previous = null;
    this.direction = "left";

    makeAutoObservable(this, {
      filterStore: false,
      isOpen: false,
    });
  }

  connect = ({ dataStore }) => {
    this.dataStore = dataStore;
    this.allStores.forEach(store => store?.connect?.(this));
  };

  initialize = () => {
    console.log("initialize");
    this.allStores.forEach(store => store?.initialize?.(this));
  };

  get isLoaded() {
    return (
      this.allStores.filter(store => store.isInitialized === false).length === 0
    );
  }

  get scaleFactor() {
    return this.menuItems && this.menuItems.length < 3 ? 6 : 4.8;
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

  setSelected(sel) {
    this.previous = this.selected;
    this.selected = sel;
  }

  setNumberSavedItems(num) {
    this.numberSavedItems = num;
  }

  setMenuItems(items) {
    this.menuItems = items;
  }

  setMenuState(direction) {
    let prev = this.selected;
    if (direction == "right") {
      this.selected =
        this.selected >= this.menuItems.length - 1 ? 0 : this.selected + 1;
      this.previous = prev;
      this.direction = "right";
    } else {
      this.selected =
        this.selected == 0 ? this.menuItems.length - 1 : this.selected - 1;
      this.previous = prev;
      this.direction = "left";
    }
  }

  setDirection = dir => {
    this.direction = dir;
  };

  setSelectedFromLink = item => {
    let sel = this.menuItems.indexOf(item);
    this.selected = sel;
  };
}

export default UiStore;
