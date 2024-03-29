import { makeAutoObservable, runInAction, observable, action } from "mobx";
import { shuffle, keyBy, values } from "lodash";
import { makeIdFromUrl, ALIAS_IDS } from "@/utils/idUtils";
import wrangleData from "./wrangleData";
import locationData from "./locationData.json";

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
      isLoaded: observable,
      root: observable,
      currentRoot: observable,
      setCachedId: action,
      initialize: action,
    });

    this.initialize();
  }

  get = async (urlParams = "") => {
    const request = new Request(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}${urlParams}`,
      GET_OPTIONS,
    );
    const response = await fetch(request).then(res => {
      if (!res.ok) {
        // HACKY HACK ALERT
        // If we're trying to load a specific student project by its ID (`/c/<matrix-room-id>`) and the API does not
        // know about it (404) then we forward the visitor to the old Rundgang website, assuming and hoping that the
        // requested student project was from last year's rundgang.
        if (res.status == 404 && window.location.href.includes('/c/!')) {
          window.location.href = `https://2021.rundgang.udk-berlin.de/c/${window.location.href.substring(window.location.href.indexOf('/c/!') + 3)}`
        }
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

  getId = async id => {
    return this.get(id);
  };

  getPathToId = async id => {
    if (id in this.pathlist) {
      return this.pathlist[id];
    }
    return this.get(`${id}${PATH_URL}`);
  };

  getParentsFromId = async item => {
    if (item.id in this.pathlist) {
      return this.pathlist[item.id];
    }
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
    if (data.id && !(data.id in this.pathlist)) {
      this.pathlist[data.id] = tags;
    }
  };

  setStatus = s => {
    this.status = s;
  };

  getIdFromLink = async (searchId, asroot = false) => {
    try {
      this.setStatus("pending");
      let title = searchId;
      if (!searchId.includes(process.env.NEXT_PUBLIC_ID_ENDING)) {
        searchId = makeIdFromUrl(searchId);
      }
      let data = searchId in this.cachedIds ? this.cachedIds[searchId] : null;
      let tags = searchId in this.pathlist ? this.pathlist[searchId] : null;
      if (!data || data?.type == "item") {
        data = await this.getId(searchId);
      }
      if (!tags) {
        tags = await this.getParentsFromId(data);
      }
      data = { ...data, tags };
      let currentItems = null;
      if (data?.type == "context") {
        if (searchId !== this.root.id) {
          currentItems = await this.getFilteredListFromId(searchId, TYPE_ITEM);
          currentItems = shuffle(currentItems);
        } else {
          currentItems = values(this.cachedIds);
        }
        currentItems = await Promise.all(
          currentItems.map(async item => {
            if (item.id in this.cachedIds && item.id in this.pathlist) {
              if (!this.cachedIds[item.id]?.tags) {
                this.setCachedId(
                  this.cachedIds[item.id],
                  this.pathlist[item.id],
                );
              }
              return {
                ...item,
                ...this.cachedIds[item.id],
                tags: this.pathlist[item.id],
              };
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

        if (title == "beratungsangebote") {
          currentItems = currentItems.filter(l =>
            l.tags.find(tag => tag.template == "consulting service"),
          );
        }
        if (data.template == "location-building" && !data.levels) {
          data.context = data.context.sort(
            (a, b) => parseInt(a.name) - parseInt(b.name),
          );
          data.image = this.locations.find(l => l.id == data.id)?.image;
          let levels = await Promise.all(
            data.context.map(async level => {
              if (
                level.id in this.cachedIds &&
                this.cachedIds[level.id].thumbnail_full_size
              ) {
                return {
                  ...this.cachedIds[level.id],
                  tags: this.pathlist[level.id],
                };
              } else {
                let res = await this.getId(level.id);
                let levelTags = await this.getParentsFromId(res);
                this.setCachedId(res, levelTags);
                return res;
              }
            }),
          );
          data.levels = levels;
        }
      } else if (data?.type == "item" && asroot) {
        let renderedItem = await this.getRenderedItem(searchId);
        data = { ...data, rendered: renderedItem };
      }
      data.name = title in ALIAS_IDS[process.env.NODE_ENV] ? title : data.name;

      this.setCachedId(data, tags);
      runInAction(() => {
        if (asroot) {
          this.currentItems = currentItems;
          this.currentRoot = data;
        }
        this.setStatus("success");
      });
    } catch (error) {
      runInAction(() => {
        this.setStatus("error");
      });
    }
  };

  initialize = async () => {
    this.setStatus("pending");
    try {
      const treeload = this.getTreeFromId(process.env.NEXT_PUBLIC_API_ROOT_URL);
      const listload = this.get(
        `${process.env.NEXT_PUBLIC_API_ROOT_URL}/detailedList/filter/type/item`,
      );
      const [tree, detailedList] = await Promise.all([treeload, listload]);

      const wrangled = wrangleData(tree, detailedList);
      const locations = locationData.map(loc => ({
        ...loc,
        id: loc.id[process.env.NODE_ENV],
      }));
      

      runInAction(() => {
        const { tags, rooms, eventlist, pathlist, allItems } = wrangled;
        this.tags = tags;
        this.pathlist = pathlist;
        this.existingRooms = rooms;
        this.cachedIds = keyBy(allItems, "id");
        this.eventlist = eventlist;
        this.isLoaded = true;
        delete tree["children"];
        this.locations = locations;
        this.root = tree;
        this.setStatus("success");
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

  connect(parentStore) {
    this.parentStore = parentStore;
  }
}
export default ApiStore;
