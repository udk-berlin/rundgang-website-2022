import { toJS, makeAutoObservable, reaction } from "mobx";
import ApiStore from "./ApiStore";

class DataStore {
  constructor() {
    this.api = new ApiStore();

    this.allStores = [this.api];

    reaction(
      () => this.api.isLoaded,
      () => {
        this.initialize();
      },
    );

    makeAutoObservable(this, {
      api: false,
    });
  }

  connect = () => {
    this.allStores.forEach(store => store?.connect?.(this));
  };

  load = () => {
    console.log("load children stores");
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

  // funciton that creates the snapshot of thr store
  // you should extract connected stores via destructuring
  toJSON = () => {
    const { ...rest } = this;
    return toJS(rest);
  };

  hydrate = snapshot => {
    this.api.hydrate(snapshot.api);
  };
}

export default DataStore;
