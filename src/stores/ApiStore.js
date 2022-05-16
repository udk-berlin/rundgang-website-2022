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
    this.locations = [];
    this.hierarchy = [];
    this.currentRoot = null;
    this.isInitialized = false;
    this.status = "initial";
    makeAutoObservable(this, {
      api: false,
      root: observable,
      currentRoot: observable,
    });
  }

  getMainTree = async currentRoot => {
    try {
      if (currentRoot.context?.length) {
        const data = await this.api.getTreeFromId(currentRoot.id);
        let locationIds = _.keys(
          _.values(data.children).find(c => c.name == "Locations").children,
        );
        let hierarchyIds = _.keys(
          _.values(data.children).find(c => c.name == "UDK").children,
        );
        console.log(toJS(data));
        const locations = await Promise.all(
          locationIds.map(id => this.api.getId(id)),
        );
        const hierarchy = await Promise.all(
          hierarchyIds.map(id => this.api.getId(id)),
        );

        runInAction(() => {
          if (locations?.length && hierarchy?.length) {
            this.locations = locations;
            this.hierarchy = hierarchy;
            this.status = "success";
          } else {
            this.status = "error";
          }
        });
      }
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
    }
  };

  getIdFromLink = async linkName => {
    let searchId = `!${linkName}:dev.medienhaus.udk-berlin.de`;
    try {
      const data = await this.api.getId(searchId);
      runInAction(() => {
        this.currentRoot = data;
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
      runInAction(() => {
        this.root = data;
        this.status = "success";
      });
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
    }
  };

  initialize = () => {
    this.initializeRoot().then(() => {
      this.isInitialized = true;
      this.getMainTree(this.root);
    });
  };

  connect(parentStore) {
    this.parentStore = parentStore;
  }
}
export default ApiStore;
