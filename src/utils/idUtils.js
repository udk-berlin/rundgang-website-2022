export const ALIASES = {
  development: {
    ZHxOBBJSDIRTvbpMRw: "index",
    mYrhgyDxLiGjDyLrzW: "orte",
    ZHxOBBJSDIRTvbpMRw: "katalog",
    ZHxOBBJSDIRTvbpMRw: "zeiten",
    ZHxOBBJSDIRTvbpMRw: "beratungsangebote",
  },
  production: {
    ZHxOBBJSDIRTvbpMRw: "index",
    mYrhgyDxLiGjDyLrzW: "orte",
    ZHxOBBJSDIRTvbpMRw: "katalog",
    ZHxOBBJSDIRTvbpMRw: "zeiten",
    ZHxOBBJSDIRTvbpMRw: "beratungsangebote",
  },
};

export const ALIAS_IDS = {
  development: {
    index: "ZHxOBBJSDIRTvbpMRw",
    orte: "mYrhgyDxLiGjDyLrzW",
    katalog: "ZHxOBBJSDIRTvbpMRw",
    zeiten: "ZHxOBBJSDIRTvbpMRw",
    beratungsangebote: "ZHxOBBJSDIRTvbpMRw",
  },
  production: {
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
  if (code in ALIASES[process.env.NODE_ENV]) {
    return ALIASES[process.env.NODE_ENV][code];
  }
  return code;
};

export const idsfromAliases = () => {
  console.log(
    JSON.stringify(
      Object.entries(ALIASES[process.env.NODE_ENV]).reduce(
        (obj, e) => ({ ...obj, [e[1]]: e[0] }),
        {},
      ),
    ),
  );
};

export const makeIdFromUrl = url => {
  //idsfromAliases();
  if (!url) return null;
  url = url in ALIAS_IDS[[process.env.NODE_ENV]] ? ALIAS_IDS[process.env.NODE_ENV][url] : url;
  if (url.length !== 18) return null;
  return `!${url}:dev.medienhaus.udk-berlin.de`;
};
