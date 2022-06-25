import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html {
  height: 100%; 
  width: 100%;
  *::selection {
    background: black;
    color: #E2FF5D;
  } 
  *::-webkit-scrollbar {
    width: 0.8em;
    height: 0.8em;
  }
  *::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0,0,0,0.00);
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.00);
  }
  *::-webkit-scrollbar-thumb {
    background-color: black;
    outline: 1px solid black;
  }
}
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
