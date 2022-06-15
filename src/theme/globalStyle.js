import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html {
  height: 100%; 
  box-sizing: border-box; }
body {
  margin: 0;
  padding: 0;
  font-family: "Diatype", sans-serif;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}
a {
  color: black;
  text-decoration: none;
}
`;

export default GlobalStyle;
