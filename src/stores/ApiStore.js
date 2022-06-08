import _ from "lodash";
import { makeIdFromUrl, ALIAS_IDS } from "@/utils/idUtils";

const BASE_URL = "https://api.dev.medienhaus.udk-berlin.de/api/v2/";
const PATH_URL = "/pathlist";
const TREE_URL = "/tree";
const LIST_URL = "/list";
const FILTER_URL = "/list/filter";
const TYPE_ITEM = "/type/item";
const TYPE_CONTEXT = "/type/context";
const RENDER_JSON = "/render/json";
const ROOT = "!ZHxOBBJSDIRTvbpMRw:dev.medienhaus.udk-berlin.de";
const STRUCTURE_ROOT = "!gzsKJXOMipzIxsoqYk:dev.medienhaus.udk-berlin.de";
const LOCATIONS_ROOT = "!mYrhgyDxLiGjDyLrzW:dev.medienhaus.udk-berlin.de";

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
    return this.get(`${LOCATIONS_ROOT}/tree/filter${TYPE_CONTEXT}`).catch(() =>
      console.log("no LOCATIONS_ROOT id"),
    );
  };

  getStructure = async () => {
    return this.get(`${STRUCTURE_ROOT}/tree/filter${TYPE_CONTEXT}`).catch(() =>
      console.log("no STRUCTURE_ROOT id"),
    );
  };

  getContexts = async () => {
    return this.getFilteredListFromId(ROOT, TYPE_CONTEXT).catch(() =>
      console.log("no list of contexts id"),
    );
  };

  getId = async id => {
    return this.get(id);
  };

  getPathToId = async id => {
    return this.get(`${id}${PATH_URL}`);
  };

  getParentsFromId = async item => {
    return Promise.all(
      item.parents.map(parent => this.getPathToId(parent)),
    ).then(res =>
      res
        .flat()
        .filter(
          x =>
            !["structure-root", "Universität", "location-university"].includes(
              x.template,
            ),
        ),
    );
  };

  getTreeFromId = async id => {
    return this.get(`${id}${TREE_URL}`);
  };

  getRenderedItem = async id => {
    return this.get(`${id}${RENDER_JSON}`);
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
    if (data.id && !(data.id in this.cachedIds)) {
      this.cachedIds[data.id] = data;
    }
  };

  getIdFromLink = async (searchId, asroot = false) => {
    try {
      let title = searchId;
      if (!searchId.includes(":dev.medienhaus.udk-berlin.de")) {
        searchId = makeIdFromUrl(searchId);
      }
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
      if (data?.type == "context" && asroot && !currentItems) {
        let items = await this.getFilteredListFromId(searchId, TYPE_ITEM);
        data = { ...data, allItemsBelow: items.map(i => i.id) };
        currentItems = await Promise.all(
          items.map(async item => {
            if (item.id in this.cachedIds) {
              return this.cachedIds[item.id];
            } else {
              let res = await this.getId(item.id);
              this.setCachedId(res);
              return res;
            }
          }),
        );
      } else if (data?.type == "item" && asroot) {
        let renderedItem = await this.getRenderedItem(searchId);
        data = { ...data, rendered: renderedItem };
      }
      data.name = title in ALIAS_IDS ? title : data.name;
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
