const bowser = require("bowser");
const isBot = require("isbot");

const LOG = (...msg) => console.log("[BCM]", ...msg);

const DEFAULT_BROWSER_SATISFACTION = {
  Chrome: ">=52",
  Firefox: ">=50",
  "Internet Explorer": ">=11",
  Safari: ">=5",
};
const DEFAULT_REDIRECT_PATH = "/not-supported";
const DEFAULT_PASS_BOTS = true;
const DEFAULT_PASS_UNKNOWN = true;

const browserIsSupported = (
  useragent,
  browserSatisfactions,
  passUnknownSatisfaction,
) => {
  const browser = bowser.getParser(useragent);
  const isSupported = browser.satisfies(browserSatisfactions);
  if (typeof isSupported === "undefined") {
    LOG("� browser is unknown:", browser.getBrowser(), browser.getOS());
    return passUnknownSatisfaction;
  } else if (isSupported) {
    LOG("✅ browser is supported:", browser.getBrowser(), browser.getOS());
    return true;
  } else {
    LOG("❌ not supported:", browser.getBrowser(), browser.getOS());
    return false;
  }
};

const createExpressBrowserCheckMiddleware =
  (options = {}) =>
  (req, res, next) => {
    const {
      browserSatisfactions = DEFAULT_BROWSER_SATISFACTION,
      redirectPath = DEFAULT_REDIRECT_PATH,
      passBots = DEFAULT_PASS_BOTS,
      passUnknown = DEFAULT_PASS_UNKNOWN,
    } = options;
    if (req.path === redirectPath) {
      next();
      return;
    }

    const useragent = req.headers["user-agent"];
    LOG("checking user agent:", useragent);
    // before we check for real browser support we need to let user-agents pass
    // that come from (ms-)office, because when windows user open a page from an
    // office program the headers user-agent is not the default browser but
    // something with (ms-)office
    // if (isMSOffice(useragent)) {
    //   console.log('[BC] isMSOffice');
    //   return;
    // }
    // if the useragent is a crawler/bot let him through
    if (passBots && isBot(useragent)) {
      LOG("bot/crawler identified; letting pass");
      next();
      return;
    }
    // check for all supported browsers; if one doesnt match
    // we redirect to the redirectPath;
    if (browserIsSupported(useragent, browserSatisfactions, passUnknown)) {
      next();
      return;
    }
    res.redirect(redirectPath);
  };

module.exports = {
  createExpressBrowserCheckMiddleware,
};
