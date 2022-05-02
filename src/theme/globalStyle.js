import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Diatype", sans-serif;
  width: 100%;
  height: 100vh;
}
a {
  color: black;
  text-decoration: none;
}


`;

export default GlobalStyle;
