import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useStores } from "@/stores/index";
import LocalizedText from "modules/i18n/components/LocalizedText";
import LocalizedLink from "modules/i18n/components/LocalizedLink";
import Stretch from "./Stretch";

const PageTitleWrapper = styled.div`
  width: 100%;
  font-family: "Diatype";
  background: white;
  height: fit-content;
  position: sticky;
  top: 0px;
`;

const Title = styled.div`
  display: flex;
`;

const PageTitle = () => {
  const { uiStore } = useStores();

  return (
    <PageTitleWrapper>
      {uiStore.title !== null ? (
        <Stretch title={uiStore.title}>
          <Title>
            <LocalizedLink to="/">&#8592;</LocalizedLink>
            <LocalizedText id={uiStore.title} />
          </Title>
        </Stretch>
      ) : (
        <Stretch title="RUNDGANG"  preferredSize={13.5}>
          <Title>
            RUNDGANG
            <span style={{ fontSize: "4vh", whiteSpace: "nowrap" }}>
              23.07-24.07
            </span>
          </Title>
        </Stretch>
      )}
    </PageTitleWrapper>
  );
};

export default observer(PageTitle);
