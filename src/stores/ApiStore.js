import _ from "lodash";
import {
  makeAutoObservable,
  runInAction,
  observable,
  action,
  toJS,
} from "mobx";

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
const STRUCTURE_ROOT = "!zIFTaCEWSjCgNiWvCA:dev.medienhaus.udk-berlin.de";
const LOCATIONS_ROOT = "!mYrhgyDxLiGjDyLrzW:dev.medienhaus.udk-berlin.de";

const GET_OPTIONS = {
  method: "GET",
};

class ApiStore {
  constructor() {
    this.root = null;
    this.locations = null;
    this.structure = null;
    this.eventlist = null;
    this.cachedIds = {};
    this.currentRoot = null;
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
    const response = await fetch(request).then(res => {
      if (!res.ok) {
        return null;
      }
      return res.json();
    });
    return response;
  };

  getRoot = async () => {
    return this.get(ROOT).catch(() => console.log("no ROOT id"));
  };

  getLocations = async () => {
    return this.get(`${LOCATIONS_ROOT}/tree/filter${TYPE_CONTEXT}`)
      .then(res =>
        Promise.all(
          _.values(res.children).map(async building => {
            let data = await this.getId(building.id);
            return {
              ...building,
              extra: data,
            };
          }),
        ),
      )
      .catch(() => console.log("no list of locations ids"));
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

  getEventList = async () => {
    return this.getFilteredListFromId(ROOT, "/allocation/temporal")
      .then(res =>
        Promise.all(
          res
            .map(async ev => {
              if (ev.type == "item") {
                let locpath = await this.getPathToId(ev.id);
                return {
                  ...ev,
                  building: locpath.find(
                    loc => loc.template == "location-building",
                  ),
                  room: locpath.find(loc => loc.template == "location-room"),
                };
              } else return null;
            })
            .filter(a => a),
        ),
      )
      .catch(() => console.log("no eventlist"));
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
    ).then(res => {
      res = res
        .flat()
        .filter(
          x =>
            !["structure-root", "Universität", "location-university"].includes(
              x.template,
            ),
        );
      return [...new Map(res.map(v => [v.id, v])).values()];
    });
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

  setCachedId = (data, tags) => {
    if (data.id && !(data.id in this.cachedIds)) {
      this.cachedIds[data.id] = { ...data, tags: tags };
    }
  };

  setStatus = s => {
    this.status = s;
  };

  getIdFromLink = async (searchId, asroot = false) => {
    this.setStatus("pending");
    try {
      let data = searchId in this.cachedIds ? this.cachedIds[searchId] : null;
      if (data) {
        runInAction(() => {
          if (asroot) {
            this.currentItems = data.allItemsBelow.map(
              item => this.cachedIds[item.id],
            );
            this.currentRoot = data;
          }
          this.setStatus("success");
        });
      } else {
        let title = searchId;
        if (!searchId.includes(":dev.medienhaus.udk-berlin.de")) {
          searchId = makeIdFromUrl(searchId);
        }
        let tags = data?.tags ? data.tags : [];
        if (!data) {
          data = await this.getId(searchId);
          if (!tags?.length && data.localDepth > 2) {
            tags = await this.getParentsFromId(data);
            data = { ...data, tags: tags };
          }

          this.setCachedId(data, tags);
        }
        let currentItems = data?.allItemsBelow?.length
          ? data.allItemsBelow.map(item => this.cachedIds[item.id])
          : null;
        if (data?.type == "context" && !currentItems) {
          let items = await this.getFilteredListFromId(searchId, TYPE_ITEM);

          data = { ...data, allItemsBelow: items.map(i => i.id) };
          currentItems = await Promise.all(
            items.map(async item => {
              if (item.id in this.cachedIds) {
                return this.cachedIds[item.id];
              } else {
                let res = await this.getId(item.id);
                if (res) {
                  let itemTags = await this.getParentsFromId(res);
                  this.setCachedId(res, itemTags);
                  return { ...res, tags: itemTags };
                } else return null;
              }
            }),
          );
          currentItems = currentItems.filter(a => a);
        } else if (data?.type == "item" && asroot) {
          let renderedItem = await this.getRenderedItem(searchId);
          data = { ...data, rendered: renderedItem };
        }

        if (title == "beratungsangebote") {
          currentItems = currentItems.filter(l =>
            l.tags.find(tag => tag.template == "consulting service"),
          );
        }
        if (data.template == "location-building") {
          data.context = data.context.sort(
            (a, b) => parseInt(a.name) - parseInt(b.name),
          );
          let levels = await Promise.all(
            data.context.map(async level => {
              if (level.id in this.cachedIds) {
                return this.cachedIds[level.id];
              } else {
                let res = await this.getId(level.id);
                this.setCachedId(res, tags);
                return res;
              }
            }),
          );
          data.levels = levels;
        }
        data.name = title in ALIAS_IDS ? title : data.name;

        runInAction(() => {
          if (asroot) {
            this.currentItems = currentItems;
            this.currentRoot = data;
          }
          this.setStatus("success");
        });
      }
    } catch (error) {
      runInAction(() => {
        this.setStatus("error");
      });
    }
  };

  initializeRoot = async () => {
    this.setStatus("pending");
    try {
      const data = await this.getRoot();
      const structure = await this.getStructure();
      const locations = await this.getLocations();
      const eventlist = await this.getEventList();
      runInAction(() => {
        this.root = data;
        this.locations = locations;
        this.structure = structure;
        this.eventlist = eventlist;
        this.setStatus("success");
        this.isLoaded = true;
      });
    } catch (error) {
      runInAction(() => {
        this.setStatus("error");
      });
    }
  };

  hydrate = snapshot => {
    console.log(snapshot);
  };

  initialize = () => {
    this.initializeRoot();
  };

  connect(parentStore) {
    this.parentStore = parentStore;
  }
}
export default ApiStore;
