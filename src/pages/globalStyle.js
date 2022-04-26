import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Diatype';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(/fonts/ABCDiatype-Regular-Trial.woff2) format('woff2')
}
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Diatype", sans-serif;
}
a {
  color: black;
  text-decoration: none;
}


`;

export default GlobalStyle;
