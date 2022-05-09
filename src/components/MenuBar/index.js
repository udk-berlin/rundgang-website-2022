import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useStores } from "@/stores/index";
import { AnimatePresence } from "framer-motion";
import useWindowSize from "@/hooks/useWindowSize";
import LocalizedText from "modules/i18n/components/LocalizedText";
import LocalizedLink from "modules/i18n/components/LocalizedLink";
import Stretch from "../Stretch";

const MenuBarWrapper = styled.div`
  width: 100%;
  font-family: "Diatype";
  background: white;
`;

const Title = styled.div`
  display: flex;
`;

const MenuBar = () => {
  const { uiStore } = useStores();
  const size = useWindowSize();

  return (
    <MenuBarWrapper>
      {uiStore.title !== null ? (
        <Stretch>
          <Title width={size.width} height={size.height}>
            <LocalizedLink to="/">&#8592;</LocalizedLink>
            <LocalizedText id={uiStore.title} />
          </Title>
        </Stretch>
      ) : (
        <Stretch>
          <Title width={size.width} height={size.height}>
            RUNDGANG 23.07-24.07
          </Title>
        </Stretch>
      )}
    </MenuBarWrapper>
  );
};

export default observer(MenuBar);
