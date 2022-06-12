import { toJS, makeAutoObservable, reaction } from "mobx";
import _ from "lodash";
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

  createEventStructure(eventlist) {
    let sorted = eventlist
      .map(ev => ev.allocation.temporal.map(t => ({ ...ev, time: t })))
      .flat()
      .slice()
      .sort((a, b) => a.time.start - b.time.start);
    let res = sorted.reduce((obj, ev) => {
      if (obj && ev.building.name in obj) {
        if (ev.room.name in obj[ev.building.name]) {
          obj[ev.building.name][ev.room.name].push(ev);
        } else {
          obj[ev.building.name] = {
            ...obj[ev.building.name],
            [ev.room.name]: [ev],
          };
        }
      } else {
        obj = { ...obj, [ev.building.name]: { [ev.room.name]: [ev] } };
      }
      return obj;
    }, {});
    return res;
  }

  get eventLocations() {
    if (this.api.eventlist) {
      return this.createEventStructure(this.api.eventlist);
    }
    return null;
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
        rootNode => {
          if (rootNode?.name && rootNode?.id) {
            this.uiStore.setTitle(rootNode.name, rootNode.id);
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
