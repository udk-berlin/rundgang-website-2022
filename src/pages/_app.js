import React, { useMemo } from "react";
import { IntlProvider } from "react-intl";
import { useRouter } from "next/router";
import deFile from "modules/i18n/localizations/de.json";
import enFile from "modules/i18n/localizations/en.json";
import { Provider } from "mobx-react";
import { ThemeProvider } from "styled-components";
import { AnimatePresence } from "framer-motion";
import { theme } from "theme/index";
import GlobalStyle from "theme/globalStyle";
import GlobalFonts from "public/fonts/globalFonts";
import SearchBar from "@/components/SearchBar";
import { useStoreInstances } from "../stores/index";
import MenuBar from "@/components/MenuBar";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps, router }) {
  const { data } = pageProps;
  const snapshot = data?.dataStore;
  const { dataStore, uiStore } = useStoreInstances(snapshot);
  const { locale } = useRouter();

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

  React.useEffect(() => {
    dataStore.connect();
    dataStore.initialize();
    dataStore.load();
    uiStore.initialize();
  }, []);
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
            <MenuBar />
            <AnimatePresence
              exitBeforeEnter
              initial={false}
              onExitComplete={() => window.scrollTo(0, 0)}
            >
              <SearchBar key="searchbar" />
              <Component key="component" {...pageProps} />
            </AnimatePresence>
            <Footer />
          </IntlProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
}
