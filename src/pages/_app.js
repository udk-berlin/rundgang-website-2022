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
import { useIsMobile } from "@/utils/useWindowSize";
import { makeUrlFromId } from "@/utils/idUtils";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
`;

export default function App({ Component, pageProps }) {
  const { data } = pageProps;
  const snapshot = data?.dataStore;
  const { dataStore, uiStore } = useStoreInstances(snapshot);
  const router = useRouter();
  const isMobile = useIsMobile();
  const [showLine, setShowLine] = useState(false);

  const messages = useMemo(() => {
    switch (router.locale) {
      case "de":
        return deFile;
      case "en":
        return enFile;
      default:
        return deFile;
    }
  }, [router.locale]);

  useEffect(() => {
    dataStore.initialize();
  }, []);

  useEffect(() => {
    if (dataStore.api.isLoaded) {
      uiStore.initialize();
    }
  }, [dataStore.api.isLoaded]);

  useEffect(() => {
    let pid = router.query.pid;
    setShowLine(false);
    if (pid) {
      dataStore.api.getIdFromLink(pid, true);
    } else if (router.pathname !== "/") {
      let id = router.pathname.replaceAll("/", "").replaceAll("[pid]", "");
      dataStore.api.getIdFromLink(id, true);
    } else if (dataStore.api.root) {
      dataStore.api.getIdFromLink(dataStore.api.root.id, true);
    }
  }, [router.query, router.pathname]);

  useEffect(() => {
    if (router.pathname == "/" && !isMobile) {
      setShowLine(true);
    }
  }, [router.pathname]);

  return (
    <>
      <GlobalFonts />
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Provider dataStore={dataStore} uiStore={uiStore}>
          <IntlProvider
            locale={router.locale}
            messages={messages}
            onError={() => null}
          >
            <MotionConfig reducedMotion="user">
              <Container scrollable={Boolean(router.pathname !== "/")}>
                <Header key={router.pathname} />
                <AnimatePresence exitBeforeEnter initial={true}>
                  <Component key={router.pathname} {...pageProps} />
                </AnimatePresence>
                <Footer />
                {/* {showLine ? <CursorLine /> : null} */}
              </Container>
            </MotionConfig>
          </IntlProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
}
