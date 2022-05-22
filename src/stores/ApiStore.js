import _ from "lodash";
import {
  makeAutoObservable,
  reaction,
  runInAction,
  observable,
  action,
  toJS,
} from "mobx";
import Api from "./Api";

class ApiStore {
  constructor() {
    this.api = new Api();
    this.root = null;
    this.locations = null;
    this.structure = null;
    this.cachedIds = {};
    this.currentRoot = null;
    this.currentPath = null;
    this.isLoaded = false;
    this.status = "initial";
    makeAutoObservable(this, {
      api: false,
      isLoaded: false,
      root: observable,
      currentRoot: observable,
      setCachedId: action,
    });
  }

  setCachedId = data => {
    if (data.id && !data.id in this.cachedIds) {
      this.cachedIds[data.id] = data;
    }
  };

  getIdFromLink = async (searchId, asroot = false) => {
    try {
      let data = this.cachedIds[searchId];
      let path = ""
      if (!data) {
        data = await this.api.getId(searchId);
        path = await this.api.getPathToId(searchId)
        this.setCachedId(data);
      }
      runInAction(() => {
        if (asroot) {
          this.currentRoot = data;
          this.currentPath = path
        }
        this.status = "success";
      });
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
    }
  };

  initializeRoot = async () => {
    try {
      const data = await this.api.getRoot();
      const structure = await this.api.getStructure();
      const locations = await this.api.getLocations();
      runInAction(() => {
        this.root = data;
        this.locations = locations;
        this.structure = structure;
        this.status = "success";
      });
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
    }
  };

  initialize = () => {
    this.initializeRoot()
      .then(() => {
        this.isLoaded = true;
        console.log("is loaded");
      })
      .then(() => {});
  };

  connect(parentStore) {
    this.parentStore = parentStore;
  }
}
export default ApiStore;
