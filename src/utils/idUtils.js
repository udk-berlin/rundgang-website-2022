export const ALIASES = {
  development: {
    "!ZHxOBBJSDIRTvbpMRw:dev.medienhaus.udk-berlin.de": "index",
    "!mYrhgyDxLiGjDyLrzW:dev.medienhaus.udk-berlin.de": "orte",
    "!ZHxOBBJSDIRTvbpMRw:dev.medienhaus.udk-berlin.de": "katalog",
    "!ZHxOBBJSDIRTvbpMRw:dev.medienhaus.udk-berlin.de": "zeiten",
    "!ZHxOBBJSDIRTvbpMRw:dev.medienhaus.udk-berlin.de": "beratungsangebote",
  },
  production: {
    "!CszUweVEGwuKVEiJBg:content.udk-berlin.de": "index",
    "!QEMZncAAlhtFVagfSI:content.udk-berlin.de": "orte",
    "!CszUweVEGwuKVEiJBg:content.udk-berlin.de": "katalog",
    "!CszUweVEGwuKVEiJBg:content.udk-berlin.de": "zeiten",
    "!CszUweVEGwuKVEiJBg:content.udk-berlin.de": "beratungsangebote",
  },
};

export const ALIAS_IDS = {
  development: {
    index: "!ZHxOBBJSDIRTvbpMRw:dev.medienhaus.udk-berlin.de",
    orte: "!mYrhgyDxLiGjDyLrzW:dev.medienhaus.udk-berlin.de",
    katalog: "!ZHxOBBJSDIRTvbpMRw:dev.medienhaus.udk-berlin.de",
    zeiten: "!ZHxOBBJSDIRTvbpMRw:dev.medienhaus.udk-berlin.de",
    beratungsangebote: "!ZHxOBBJSDIRTvbpMRw:dev.medienhaus.udk-berlin.de",
  },
  production: {
    index: "!CszUweVEGwuKVEiJBg:content.udk-berlin.de",
    orte: "!QEMZncAAlhtFVagfSI:content.udk-berlin.de",
    katalog: "!CszUweVEGwuKVEiJBg:content.udk-berlin.de",
    zeiten: "!CszUweVEGwuKVEiJBg:content.udk-berlin.de",
    beratungsangebote: "!CszUweVEGwuKVEiJBg:content.udk-berlin.de",
  },
};

export const makeUrlFromId = idString => {
  if (!idString) return "";
  if (idString in ALIASES[process.env.NODE_ENV]) {
    return ALIASES[process.env.NODE_ENV][idString];
  }
  return idString;
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
  url =
    url in ALIAS_IDS[process.env.NODE_ENV]
      ? ALIAS_IDS[process.env.NODE_ENV][url]
      : url;
  return url;
};
