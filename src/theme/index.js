const COLORS = {
  white: "#FFFFFF",
  darkgrey: "#444444",
  maingrey: "#939393",
  lightgrey: "#d9d9d9",
  highlight: "#E2FF5D",
  lightHighlight: "#F1FFB3",
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
    xxs: "12px",
    xs: "14px",
    sm: "16px",
    md: "20px",
    mm: "24px",
    lm: "32px",
    ll: "36px",
    lg: "42px",
    xl: "48px",
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
      fontFamily: diatypeBold,
      fontWeight: "bold",
    },
  },
  spacing: {
    xxs: "2px",
    xs: "4px",
    sm: "8px",
    md: "16px",
    mm: "32px",
    lg: "48px",
    xl: "64px",
  },
  space: p => `${p}px`,
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
