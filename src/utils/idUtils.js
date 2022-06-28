export const ALIASES = {
  DEV: {
    ZHxOBBJSDIRTvbpMRw: "index",
    mYrhgyDxLiGjDyLrzW: "orte",
    ZHxOBBJSDIRTvbpMRw: "katalog",
    ZHxOBBJSDIRTvbpMRw: "zeiten",
    ZHxOBBJSDIRTvbpMRw: "beratungsangebote",
  },
  PRODUCTION: {
    ZHxOBBJSDIRTvbpMRw: "index",
    mYrhgyDxLiGjDyLrzW: "orte",
    ZHxOBBJSDIRTvbpMRw: "katalog",
    ZHxOBBJSDIRTvbpMRw: "zeiten",
    ZHxOBBJSDIRTvbpMRw: "beratungsangebote",
  },
};

export const ALIAS_IDS = {
  DEV: {
    index: "ZHxOBBJSDIRTvbpMRw",
    orte: "mYrhgyDxLiGjDyLrzW",
    katalog: "ZHxOBBJSDIRTvbpMRw",
    zeiten: "ZHxOBBJSDIRTvbpMRw",
    beratungsangebote: "ZHxOBBJSDIRTvbpMRw",
  },
  PRODUCTION: {
    index: "ZHxOBBJSDIRTvbpMRw",
    orte: "mYrhgyDxLiGjDyLrzW",
    katalog: "ZHxOBBJSDIRTvbpMRw",
    zeiten: "ZHxOBBJSDIRTvbpMRw",
    beratungsangebote: "ZHxOBBJSDIRTvbpMRw",
  },
};

export const makeUrlFromId = idString => {
  if (!idString) return "";
  let [id] = idString.split(":");
  let code = encodeURI(id.replace("!", ""));
  if (code in ALIASES.DEV) {
    return ALIASES.DEV[code];
  }
  return code;
};

export const idsfromAliases = () => {
  console.log(
    JSON.stringify(
      Object.entries(ALIASES.DEV).reduce(
        (obj, e) => ({ ...obj, [e[1]]: e[0] }),
        {},
      ),
    ),
  );
};

export const makeIdFromUrl = url => {
  //idsfromAliases();
  if (!url) return null;
  url = url in ALIAS_IDS.DEV ? ALIAS_IDS.DEV[url] : url;
  if (url.length !== 18) return null;
  return `!${url}:dev.medienhaus.udk-berlin.de`;
};
