import { toJS, makeAutoObservable, reaction } from "mobx";
import ApiStore from "./ApiStore";
import { eventlocations } from "./test_data";

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

  get eventHouses() {
    return eventlocations;
  }

  get eventRooms() {
    let res = eventlocations
      .map((house, i) => [house, ...house.children])
      .flat()
      .map((place, i) => ({ ...place, index: i }));
    return res;
  }

  get isLoaded() {
    return (
      this.allStores.filter(store => store.isInitialized === false).length === 0
    );
  }

  connect = stores => {
    this.allStores.forEach(store => store?.connect?.(this));
    this.uiStore = stores.uiStore;
    this.sideEffects = [
      reaction(
        () => this.api.currentRoot,
        root => {
          if (root) {
            this.uiStore.setTitle(root.name);
          }
        },
      ),
    ];
  };

  initialize = () => {
    this.allStores.forEach(store => store?.initialize?.(this));
  };

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
