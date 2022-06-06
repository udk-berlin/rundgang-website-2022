import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  font-family: "Diatype", sans-serif;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  overflow-x: hidden;
  scroll-behavior: smooth;
}
a {
  color: black;
  text-decoration: none;
}
`;

export default GlobalStyle;
