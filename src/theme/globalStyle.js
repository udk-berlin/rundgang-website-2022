import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html {
  scrollbar-width: thin;       
  scrollbar-color: black #d9d9d9;
  *::selection {
    background: black;
    color: #E2FF5D;
  } 
  *::-webkit-scrollbar {
    width:8px;
    height: 8px;
  }
  *::-webkit-scrollbar-track {
    background-color: #d9d9d9;
    outline: 1px solid #d9d9d9;
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
