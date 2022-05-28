import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import { useStores } from "@/stores/index";
import LocalizedText from "modules/i18n/components/LocalizedText";
import LocalizedLink from "modules/i18n/components/LocalizedLink";
import Stretch from "@/components/simple/Stretch";
import { makeUrlFromId } from "@/utils/idUtils";

const PageTitleWrapper = styled.div`
  width: 100%;
  font-family: "Diatype";
  background: white;
  height: fit-content;
  display: flex;
`;

const Title = styled.div`
  display: flex;
`;

const PageTitle = () => {
  const { uiStore, dataStore } = useStores();
  const intl = useIntl();
  const router = useRouter();
  const [backRoute, setBackRoute] = useState("/");

  useEffect(() => {
    if (router.query && dataStore?.api?.currentPath) {
      let parent = dataStore?.api?.currentPath.slice(-2)[0];
      if (
        parent &&
        parent.id !== "!yGwpTLQiIMoyuhGggS:dev.medienhaus.udk-berlin.de"
      ) {
        let url = makeUrlFromId(parent.id);
        if (!router.pathname.includes(url)) {
          url = router.pathname.replace("[pid]", url);
          setBackRoute(url);
        } else {
          url = router.pathname.replace("/[pid]", "");
          setBackRoute(url);
        }
      } else {
        setBackRoute("/");
      }
    } else {
      setBackRoute("/");
    }
  }, [dataStore.api.currentPath]);

  return (
    <PageTitleWrapper>
      <AnimatePresence initial={true}>
        {uiStore.title !== null ? (
          <Stretch
            title={intl.formatMessage({ id: uiStore.title })}
            direction="left"
            key={`${uiStore.title}_title`}
            duration={0.7}
          >
            <Title>
              <LocalizedLink to={backRoute}>&#8592;</LocalizedLink>
              <LocalizedText id={uiStore.title} />
            </Title>
          </Stretch>
        ) : (
          <Stretch
            title="RUNDGANG"
            preferredSize={17}
            direction="right"
            key="rundgang_title"
            duration={0.7}
          >
            <Title>
              RUNDGANG
              <span style={{ fontSize: "4vh", whiteSpace: "nowrap" }}>
                23.07-24.07
              </span>
            </Title>
          </Stretch>
        )}
      </AnimatePresence>
    </PageTitleWrapper>
  );
};

export default observer(PageTitle);
