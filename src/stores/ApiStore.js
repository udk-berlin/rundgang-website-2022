import _ from "lodash";

const BASE_URL = "https://api.dev.medienhaus.udk-berlin.de/api/v2/";
const PATH_URL = "/pathlist";
const TREE_URL = "/tree";
const LIST_URL = "/list";
const FILTER_URL = "/list/filter";
const TYPE_ITEM = "/type/item";
const TYPE_CONTEXT = "/type/context";
const ROOT = "!yGwpTLQiIMoyuhGggS:dev.medienhaus.udk-berlin.de";
const STRUCTURE_ROOT = "!YPRUkokMRFexJfMRtB:dev.medienhaus.udk-berlin.de";
const LOCATIONS_ROOT = "!ZfLuOQsYLtkuIvswLv:dev.medienhaus.udk-berlin.de";

const GET_OPTIONS = {
  method: "GET",
};

import {
  makeAutoObservable,
  runInAction,
  observable,
  action,
  toJS,
} from "mobx";

class ApiStore {
  constructor() {
    this.root = null;
    this.locations = null;
    this.structure = null;
    this.cachedIds = {};
    this.currentRoot = null;
    this.currentPath = null;
    this.currentItems = null;
    this.isLoaded = false;
    this.status = "initial";
    makeAutoObservable(this, {
      isLoaded: false,
      root: observable,
      currentRoot: observable,
      setCachedId: action,
    });
  }

  get = async (urlParams = "") => {
    const request = new Request(`${BASE_URL}${urlParams}`, GET_OPTIONS);
    const response = await fetch(request);
    return response.json();
  };

  getRoot = async () => {
    return this.get(ROOT).catch(() => console.log("no ROOT id"));
  };

  getLocations = async () => {
    return this.getTreeFromId(LOCATIONS_ROOT).catch(() =>
      console.log("no LOCATIONS_ROOT id"),
    );
  };

  getStructure = async () => {
    return this.get(`${STRUCTURE_ROOT}/tree/filter${TYPE_CONTEXT}`).catch(() =>
      console.log("no STRUCTURE_ROOT id"),
    );
  };

  getId = async id => {
    return this.get(id);
  };

  getPathToId = async id => {
    return this.get(`${id}${PATH_URL}`);
  };

  getTreeFromId = async id => {
    return this.get(`${id}${TREE_URL}`);
  };

  getListFromId = async id => {
    return this.get(`${id}${LIST_URL}`);
  };

  getFilteredListFromId = async (id, filterParams) => {
    return this.get(`${id}${FILTER_URL}${filterParams}`);
  };

  post = async model => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    var options = {
      method: "POST",
      headers,
      body: JSON.stringify(model),
    };
    const request = new Request(BASE_URL, options);
    const response = await fetch(request);
    return response;
  };

  setCachedId = data => {
    if (data.id && !data.id in this.cachedIds) {
      this.cachedIds[data.id] = data;
    }
  };

  getIdFromLink = async (searchId, asroot = false) => {
    try {
      let data = searchId in this.cachedIds ? this.cachedIds[searchId] : null;
      let path = "";
      if (!data) {
        data = await this.getId(searchId);
        path = await this.getPathToId(searchId);
        this.setCachedId(data);
      }
      let currentItems = data?.allItemsBelow?.length
        ? data.allItemsBelow.map(item => this.cachedIds[item.id])
        : null;
      if (data && asroot && !currentItems) {
        let items = await this.getFilteredListFromId(searchId, TYPE_ITEM);
        data = { ...data, allItemsBelow: items.map(i => i.id) };
        currentItems = await Promise.all(
          items.map(async item => {
            if (item.id in this.cachedIds) {
              return this.cachedIds[item.id];
            } else {
              return await this.getId(item.id);
            }
          }),
        );
      }
      runInAction(() => {
        if (asroot) {
          this.currentRoot = data;
          this.currentPath = path;
          this.currentItems = currentItems;
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
      const data = await this.getRoot();
      const structure = await this.getStructure();
      const locations = await this.getLocations();
      runInAction(() => {
        this.root = data;
        this.locations = locations;
        this.structure = structure;
        this.status = "success";
        this.isLoaded = true;
        console.log("isLoaded Api");
      });
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
    }
  };

  initialize = () => {
    this.initializeRoot();
  };

  connect(parentStore) {
    this.parentStore = parentStore;
  }
}
export default ApiStore;
