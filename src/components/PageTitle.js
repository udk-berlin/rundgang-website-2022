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
  white-space: nowrap;
  width: max-content;
`;

const PageTitle = () => {
  const { uiStore, dataStore } = useStores();
  const intl = useIntl();
  const router = useRouter();
  const [backRoute, setBackRoute] = useState("/");

  useEffect(() => {
    if (router.query && dataStore?.api?.currentPath) {
      let parent = dataStore?.api?.currentPath.slice(-2)[0];
      if (parent && parent.id !== dataStore?.api?.root?.id) {
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
        <Stretch
          title={intl.formatMessage({ id: uiStore.title })}
          key={`${uiStore.title}_title`}
          lineh={1}
          preferredSize={13}
        >
          <Title>
            {uiStore.title !== "rundgang" && (
              <LocalizedLink to={backRoute}>
                <span style={{ fontFamily: "Inter" }}>&#8592;</span>
              </LocalizedLink>
            )}
            <LocalizedText id={uiStore.title} />
          </Title>
        </Stretch>
      </AnimatePresence>
    </PageTitleWrapper>
  );
};

export default observer(PageTitle);
