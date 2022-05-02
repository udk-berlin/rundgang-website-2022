const COLORS = {
  white: "#FFFFFF",
  darkgray: "#222222",
  lightgray: "#818181",
  highlight: "#E2FF5D",
  black: "#000",
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
    xs: "0.8em",
    sm: "1em",
    md: "2em",
    lg: "3em",
    xl: "4em",
    xxl: "10vw",
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
    xs: "0.25em",
    sm: "0.5em",
    md: "1em",
    lg: "2em",
    xl: "4em",
  },
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1400,
  },
};
