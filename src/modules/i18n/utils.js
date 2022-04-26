import { LOCALES } from "../../utils/multilanguage";

export const getMatchingRoute = (language, path) => {
  /**
   * Get the key of the route the user is currently on
   */
  // const route = path.substring(3); // remove local part '/en' from the pathname /en/contact

  const { route } = Object.values(LOCALES).reduce(
    (prev, lang) => {
      if (prev.matched) return prev;

      const l = `/${lang}`;

      if (prev.route.includes(l))
        return {
          route: prev.route.replace(l, ""),
          matched: true,
        };

      return prev;
    },
    { route: path, matched: false },
  );

  /**
   * Return localized route
   */
  return `/${language}${route}`;
};
