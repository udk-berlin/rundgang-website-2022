import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  font-family: "Diatype", sans-serif;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;
}
a {
  color: black;
  text-decoration: none;
}
`;

export default GlobalStyle;
