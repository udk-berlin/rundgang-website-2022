import {
  makeAutoObservable,
  runInAction,
  observable,
  action,
  toJS,
} from "mobx";
import { shuffle } from "lodash";
import { makeIdFromUrl, ALIAS_IDS } from "@/utils/idUtils";
import wrangleData from "./wrangleData";

const PATH_URL = "/pathlist";
const TREE_URL = "/tree";
const FILTER_URL = "/list/filter";
const TYPE_ITEM = "/type/item";
const RENDER_JSON = "/render/json";

const GET_OPTIONS = {
  method: "GET",
};

class ApiStore {
  constructor() {
    this.root = null;
    this.locations = null;
    this.eventlist = null;
    this.cachedIds = {};
    this.tags = {};
    this.existingRooms = {};
    this.pathlist = {};
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
    const request = new Request(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}${urlParams}`,
      GET_OPTIONS,
    );
    const response = await fetch(request).then(res => {
      if (!res.ok) {
        return null;
      }
      return res.json();
    });
    return response;
  };

  getRoot = async () => {
    return this.get(process.env.NEXT_PUBLIC_API_ROOT_URL).catch(() =>
      console.log("no ROOT id"),
    );
  };

  getLocations = async () => {
    return this.get(process.env.NEXT_PUBLIC_LOCATIONS_ROOT)
      .then(res =>
        Promise.all(
          Object.values(res.context).map(async building => {
            let data = await this.getId(building.id);
            return {
              ...building,
              ...data,
            };
          }),
        ),
      )
      .catch(() => console.log("no list of locations ids"));
  };

  getId = async id => {
    if (id in this.cachedIds) {
      return this.cachedIds[id];
    }
    return this.get(id);
  };

  getPathToId = async id => {
    if (id in this.pathlist) {
      return this.pathlist[id];
    }
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
    const request = new Request(process.env.NEXT_PUBLIC_BASE_API_URL, options);
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
    try {
      let data = searchId in this.cachedIds ? this.cachedIds[searchId] : null;
      if (data && (data.currentItems || data.renderedItem)) {
        runInAction(() => {
          if (asroot) {
            this.currentItems = data.allItemsBelow.map(
              item => this.cachedIds[item.id],
            );
            this.currentRoot = data;
          }
        });
      } else {
        this.setStatus("pending");
        let title = searchId;
        if (!searchId.includes(process.env.NEXT_PUBLIC_ID_ENDING)) {
          searchId = makeIdFromUrl(searchId);
        }
        let tags = data?.tags ? data.tags : [];
        if (!data) {
          data = await this.getId(searchId);
          if (tags.length < 1) {
            tags = await this.getParentsFromId(data);
            data = { ...data, tags: tags };
          }
          this.setCachedId(data, tags);
        }
        let currentItems = data?.allItemsBelow?.length
          ? data.allItemsBelow.map(item => this.cachedIds[item.id])
          : null;
        if (data?.type == "context") {
          let items = await this.getFilteredListFromId(searchId, TYPE_ITEM);

          data = { ...data, allItemsBelow: items.map(i => i.id) };
          currentItems = await Promise.all(
            items.map(async item => {
              if (item.id in this.cachedIds && item.id in this.pathlist) {
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
          currentItems = shuffle(currentItems.filter(a => a));
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
        data.name =
          title in ALIAS_IDS[process.env.NODE_ENV] ? title : data.name;

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
      console.time("load data");
      const tree = await this.getTreeFromId(
        process.env.NEXT_PUBLIC_API_ROOT_URL,
      );
      const locations = await this.getLocations();
      const events = await this.getFilteredListFromId(
        process.env.NEXT_PUBLIC_API_ROOT_URL,
        "/allocation/temporal",
      );
      const { tags, rooms, eventlist, pathlist } = await wrangleData(
        tree,
        events,
      );
      runInAction(() => {
        this.tags = tags;
        this.pathlist = pathlist;
        this.existingRooms = rooms;
        this.locations = locations;
        this.eventlist = eventlist;
        this.setStatus("success");
        this.isLoaded = true;
        console.timeEnd("load api");
        console.log("all data was processed");
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

  initialize = async () => {
    const root = await this.getId(process.env.NEXT_PUBLIC_API_ROOT_URL);
    runInAction(() => {
      this.root = root;
    });
    this.initializeRoot();
  };

  connect(parentStore) {
    this.parentStore = parentStore;
  }
}
export default ApiStore;
