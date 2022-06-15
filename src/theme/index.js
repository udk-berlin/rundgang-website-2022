const COLORS = {
  white: "#FFFFFF",
  darkgrey: "#444444",
  lightgrey: "#d9d9d9",
  highlight: "#E2FF5D",
  black: "#000",
};
const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};
const diatypeRegular = ["Diatype", "sans-serif"].join(",");
const diatypeBold = ["DiatypeBold", "sans-serif"].join(",");
const diatypeBlack = ["DiatypeBlack", "sans-serif"].join(",");
const diatypeItalic = ["DiatypeItalic", "sans-serif"].join(",");

export const theme = {
  colors: {
    primary: COLORS.black,
    secondary: COLORS.highlight,
    ...COLORS,
  },
  background: {
    primary: COLORS.white,
    secondary: COLORS.highlight,
  },
  fontSizes: {
    xxs: "0.6em",
    xs: "0.8em",
    sm: "1.1em",
    md: "1.2em",
    mm: "1.5em",
    lm: "2em",
    lg: "3em",
    xl: "4em",
    xxl: "8vh",
    xxxl: "18vh",
  },
  typography: {
    fontFamily: diatypeRegular,
    color: COLORS.jetblack,

    h1: {
      fontSize: "9vw",
      fontFamily: diatypeBlack,
      fontWeight: "black",
    },
    h2: {
      fontFamily: diatypeBold,
      fontWeight: "bold",
    },
    h3: {
      fontFamily: diatypeItalic,
      fontStyle: "italic",
    },
    h4: {
      fontFamily: diatypeItalic,
      fontStyle: "italic",
    },
    h5: {
      fontFamily: diatypeRegular,
      paddingBottom: ".3em",
    },
    b: {
      fontFamily: diatypeRegular,
      fontWeight: "bold",
    },
  },
  spacing: {
    xxs: "0.1em",
    xs: "0.25em",
    sm: "0.5em",
    md: "1em",
    mm: "1.5em",
    lg: "2em",
    xl: "4em",
  },
  breakpoints: {
    mobileS: `(max-width: ${size.mobileS})`,
    mobileM: `(max-width: ${size.mobileM})`,
    mobileL: `(max-width: ${size.mobileL})`,
    tablet: `(max-width: ${size.tablet})`,
    laptop: `(min-width: ${size.laptop})`,
    laptopL: `(max-width: ${size.laptopL})`,
    desktop: `(max-width: ${size.desktop})`,
    desktopL: `(max-width: ${size.desktop})`,
  },
};
