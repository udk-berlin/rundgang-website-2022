export const ALIASES = {
  gzsKJXOMipzIxsoqYk: "index",
  mYrhgyDxLiGjDyLrzW: "orte",
  gzsKJXOMipzIxsoqYk: "katalog",
  gzsKJXOMipzIxsoqYk: "zeiten",
  gzsKJXOMipzIxsoqYk: "beratungsangebote",
};

export const ALIAS_IDS = {
  index: "yGwpTLQiIMoyuhGggS",
  orte: "mYrhgyDxLiGjDyLrzW",
  katalog: "gzsKJXOMipzIxsoqYk",
  zeiten: "gzsKJXOMipzIxsoqYk",
  beratungsangebote: "gzsKJXOMipzIxsoqYk",
};

export const makeUrlFromId = (idString) => {
  if (!idString) return "";
  let [id] = idString.split(":");
  let code = encodeURI(id.replace("!", ""));
  if (code in ALIASES) {
    return ALIASES[code];
  }
  return code;
};

export const idsfromAliases = () => {
  console.log(
    JSON.stringify(
      Object.entries(ALIASES).reduce((obj, e) => ({ ...obj, [e[1]]: e[0] }), {})
    )
  );
};

export const makeIdFromUrl = (url) => {
  //idsfromAliases();
  if (!url) return null;
  url = url in ALIAS_IDS ? ALIAS_IDS[url] : url;
  if (url.length !== 18) return null;
  return `!${url}:dev.medienhaus.udk-berlin.de`;
};
