import { createGlobalStyle } from "styled-components";

const GlobalFonts = createGlobalStyle`
@font-face {
  font-family: 'Diatype';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/ABCDiatype-Regular-Trial.woff2") format('woff2')
}
@font-face {
  font-family: 'DiatypeItalic';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/ABCDiatype-RegularItalic-Trial.woff2") format('woff2')
}

@font-face {
  font-family: 'DiatypeBold';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("/fonts/ABCDiatype-Bold-Trial.woff2") format('woff2');
}

@font-face {
  font-family: 'DiatypeBlack';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url("/fonts/ABCDiatype-Black-Trial.woff2") format('woff2');
}


@font-face {
  font-family: 'DiatypeMono';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/ABCDiatypeMono-Regular-Trial.woff2") format('woff2');
}
`;

export default GlobalFonts;
