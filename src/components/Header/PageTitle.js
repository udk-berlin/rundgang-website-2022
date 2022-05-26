import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useIntl } from "react-intl";
import { AnimatePresence } from "framer-motion";
import { useStores } from "@/stores/index";
import LocalizedText from "modules/i18n/components/LocalizedText";
import LocalizedLink from "modules/i18n/components/LocalizedLink";
import Stretch from "@/components/simple/Stretch";

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
  const { uiStore } = useStores();
  const intl = useIntl();

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
              <LocalizedLink to="/">&#8592;</LocalizedLink>
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
