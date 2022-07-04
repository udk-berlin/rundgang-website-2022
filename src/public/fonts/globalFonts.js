import { createGlobalStyle } from "styled-components";

const GlobalFonts = createGlobalStyle`
@font-face {
  font-family: 'Diatype';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/EduDiatype-Regular.woff2") format('woff2')
}

@font-face {
  font-family: 'DiatypeBold';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("/fonts/EduDiatype-Bold.woff2") format('woff2');
}

`;

export default GlobalFonts;
