import * as React from "react";
import { Provider } from "mobx-react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { useStoreInstances } from "../stores/index";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  a {
    color: black;
    text-decoration: none;
  }
`;

const theme = {
  colors: {
    primary: "#000000",
    secondary: "#E2FF5D",
    white: "#ffffff",
  },
  background: {
    primary: "#ffffff",
    secondary: "#E2FF5D",
  },
};

export default function App({ Component, pageProps }) {
  const { data } = pageProps;
  const snapshot = data?.dataStore;
  const { dataStore, uiStore } = useStoreInstances(snapshot);
  React.useEffect(() => {
    dataStore.connect();
    dataStore.initialize();
    dataStore.load();
    uiStore.initialize();
  }, []);
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Provider dataStore={dataStore} uiStore={uiStore}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </>
  );
}
