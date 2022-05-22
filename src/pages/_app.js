import React, { useMemo, useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import { useRouter } from "next/router";
import deFile from "modules/i18n/localizations/de.json";
import enFile from "modules/i18n/localizations/en.json";
import { Provider } from "mobx-react";
import styled, { ThemeProvider } from "styled-components";
import { MotionConfig, AnimatePresence } from "framer-motion";
import { theme } from "theme/index";
import GlobalStyle from "theme/globalStyle";
import GlobalFonts from "public/fonts/globalFonts";
import { useStoreInstances } from "../stores/index";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CursorLine from "@/components/CursorLine";
import { makeIdFromUrl } from "@/utils/idUtils";
import { useIsMobile } from "@/utils/useWindowSize";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
`;

export default function App({ Component, pageProps, router }) {
  const { data } = pageProps;
  const snapshot = data?.dataStore;
  const { dataStore, uiStore } = useStoreInstances(snapshot);
  const { locale, pathname, query } = useRouter();
  const isMobile = useIsMobile();
  const [showLine, setShowLine] = useState(false);

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
    dataStore.initialize();
    dataStore.load();
    uiStore.initialize();
  }, []);

  useEffect(() => {
    let pid = query.pid;
    setShowLine(false);
    if (pid) {
      let id = makeIdFromUrl(pid);
      dataStore.api.getIdFromLink(id, true);
    } else {
      if (pathname == "/" && !isMobile) {
        setShowLine(true);
      }
    }
  }, [query]);

  useEffect(() => {
    if (pathname == "/" && !isMobile) {
      setShowLine(true);
    }
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
            <MotionConfig reducedMotion="user">
              <Container>
                <Header key={pathname} />
                <AnimatePresence
                  exitBeforeEnter
                  initial={true}
                  onExitComplete={() => window.scrollTo(0, 0)}
                >
                  <Component key={pathname} {...pageProps} />
                </AnimatePresence>
                <Footer />
                {showLine ? <CursorLine /> : null}
              </Container>
            </MotionConfig>
          </IntlProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
}
