import _ from "lodash";

const BASE_URL = "https://api.dev.medienhaus.udk-berlin.de/api/v2/";
const PATH_URL = "/path";
const TREE_URL = "/tree";
const LIST_URL = "/list";
const FILTER_URL = "/filter";
const ROOT = "!yGwpTLQiIMoyuhGggS:dev.medienhaus.udk-berlin.de";
const STRUCTURE_ROOT = "!YPRUkokMRFexJfMRtB:dev.medienhaus.udk-berlin.de";
const LOCATIONS_ROOT = "!ZfLuOQsYLtkuIvswLv:dev.medienhaus.udk-berlin.de";

const GET_OPTIONS = {
  method: "GET",
};

class API {
  get = async (urlParams = "") => {
    const request = new Request(`${BASE_URL}${urlParams}`, GET_OPTIONS);
    const response = await fetch(request);
    return response.json();
  };

  getRoot = async () => {
    return this.get(ROOT).catch(() => console.log("no root id"));
  };

  getLocations = async () => {
    return this.getTreeFromId(LOCATIONS_ROOT).catch(() =>
      console.log("no LOCATIONS_ROOT id"),
    );
  };

  getStructure = async () => {
    return this.getTreeFromId(STRUCTURE_ROOT).catch(() =>
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
}
export default API;
