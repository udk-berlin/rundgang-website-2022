import { createGlobalStyle } from "styled-components";
import DiatypeRegular from "@/public/fonts/ABCDiatype-Regular-Trial.woff2";
import DiatypeItalic from "@/public/fonts/ABCDiatype-RegularItalic-Trial.woff2";
import DiatypeBold from "@/public/fonts/ABCDiatype-Bold-Trial.woff2";
import DiatypeBlack from "@/public/fonts/ABCDiatype-Black-Trial.woff2";
import DiatypeMono from "@/public/fonts/ABCDiatypeMono-Regular-Trial.woff2";

const GlobalFonts = createGlobalStyle`

@font-face {
  font-family: 'Diatype';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(${DiatypeRegular}) format('woff2')
}
@font-face {
  font-family: 'Diatype';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url(${DiatypeItalic}) format('woff2')
}

@font-face {
  font-family: 'Diatype';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(${DiatypeBold}) format('woff2');
}

@font-face {
  font-family: 'Diatype';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url(${DiatypeBlack}) format('woff2');
}


@font-face {
  font-family: 'DiatypeMono';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(${DiatypeMono}) format('woff2');
}
`;

export default GlobalFonts;
