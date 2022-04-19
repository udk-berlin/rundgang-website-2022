import { makeAutoObservable } from "mobx";
import FilterStore from "./modules/FilterStore";

class UiStore {
  constructor() {
    this.filterStore = new FilterStore();

    this.allStores = [this.filterStore];

    makeAutoObservable(this, {
      filterStore: false,
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

  setIsLoaded(loaded) {
    this.isLoaded = loaded;
  }
}

export default UiStore;
