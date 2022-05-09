import React, { useMemo, useEffect } from "react";
import { IntlProvider } from "react-intl";
import { useRouter } from "next/router";
import deFile from "modules/i18n/localizations/de.json";
import enFile from "modules/i18n/localizations/en.json";
import { Provider } from "mobx-react";
import styled, { ThemeProvider } from "styled-components";
import { AnimatePresence } from "framer-motion";
import { theme } from "theme/index";
import GlobalStyle from "theme/globalStyle";
import GlobalFonts from "public/fonts/globalFonts";
import SearchBar from "@/components/SearchBar";
import { useStoreInstances } from "../stores/index";
import MenuBar from "@/components/MenuBar";
import Footer from "@/components/Footer";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export default function App({ Component, pageProps, router }) {
  const { data } = pageProps;
  const snapshot = data?.dataStore;
  const { dataStore, uiStore } = useStoreInstances(snapshot);
  const { locale, pathname } = useRouter();

  const messages = useMemo(() => {
    switch (locale) {
      case "de":
        return deFile;
      case "en":
        return enFile;
      default:
        return deFile;
    }
  }, [locale]);

  useEffect(() => {
    dataStore.connect();
    dataStore.initialize();
    dataStore.load();
    uiStore.initialize();
  }, []);

  useEffect(() => {
    let title = pathname.replace("/", "");
    if (title.length) {
      uiStore.setTitle(title);
    } else {
      uiStore.setTitle(null);
    }
  }, [pathname]);

  return (
    <>
      <GlobalFonts />
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Provider dataStore={dataStore} uiStore={uiStore}>
          <IntlProvider
            locale={locale}
            messages={messages}
            onError={() => null}
          >
            <Container>
              <MenuBar key={pathname} />
              <SearchBar key="searchbar" />
              <AnimatePresence
                exitBeforeEnter
                initial={true}
                onExitComplete={() => window.scrollTo(0, 0)}
              >
                <Component key={pathname} {...pageProps} />
              </AnimatePresence>
            <Footer />
            </Container>
          </IntlProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
}
