import { makeAutoObservable } from "mobx";

class UiStore {
  constructor() {
    this.isOpen = false;
    this.allStores = [];
    this.numberSavedItems = 0;
    this.title = null;

    makeAutoObservable(this, {
      isOpen: false,
    });
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
  setNumberSavedItems(num) {
    this.numberSavedItems = num;
  }
  setTitle(title) {
    console.log(title);
    this.title = title;
  }
}

export default UiStore;
