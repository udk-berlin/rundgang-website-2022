import { toJS, makeAutoObservable, reaction } from "mobx";
import ApiStore from "./ApiStore";

class DataStore {
  constructor() {
    this.api = new ApiStore();

    this.allStores = [this.api];

    makeAutoObservable(this, {
      api: false,
    });
  }

  createEventStructure(eventlist) {
    let sorted = eventlist
      .map(ev => ev.allocation?.temporal.map(t => ({ ...ev, time: t })))
      .filter(a => a)
      .flat()
      .slice()
      .sort((a, b) => a.time.start - b.time.start)
      .map((ev, i) => ({ ...ev, sortIndex: i }));
    let res = sorted.reduce((obj, ev) => {
      if (ev?.building) {
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
      }
      return obj;
    }, {});
    return res;
  }

  get eventLocations() {
    if (this.api.eventlist) {
      return this.createEventStructure(Object.values(this.api.eventlist));
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
  };

  initialize = async () => {
    this.allStores.forEach(store =>
      !store.isInitialized ? store?.initialize?.(this) : null,
    );
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
