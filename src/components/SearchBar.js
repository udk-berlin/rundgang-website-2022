import React, { useCallback } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import Filter from "@/components/Filter";
import Favorites from "@/components/Favorites";
import ClickAwayListener from "react-click-away-listener";
import CloseButton from "@/components/simple/CloseButton";
import { useStores } from "@/stores/index";
import { SEARCHBAR_HEIGHT, SEARCHBAR_PADDING } from "@/utils/constants";

const SearchBarWrapper = styled.div`
  width: 100%;
  height: ${SEARCHBAR_HEIGHT + SEARCHBAR_PADDING}px;
  background-color: white;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const SearchBar = () => {
  const { uiStore } = useStores();

  const handleOpen = item => {
    uiStore.setIsOpen(item);
  };
  const handleClose = useCallback(
    item => {
      if (uiStore.isOpen == item) {
        uiStore.setIsOpen(null);
      }
    },
    [uiStore.isOpen],
  );

  return !uiStore.currentContext?.type ||
    uiStore.currentContext?.type !== "item" ? (
    <SearchBarWrapper>
      <FlexContainer id="flex-container-searchbar">
        <ClickAwayListener
          onClickAway={() => handleClose("filter")}
          mouseEvent="mouseup"
          touchEvent="touchstart"
        >
          <Filter onOpen={() => handleOpen("filter")} />
        </ClickAwayListener>
        <ClickAwayListener
          onClickAway={() => handleClose("favourites")}
          mouseEvent="mouseup"
          touchEvent="touchstart"
        >
          <Favorites onOpen={() => handleOpen("favourites")} />
        </ClickAwayListener>
      </FlexContainer>
      {uiStore.isOpen && (
        <CloseButton stretching={uiStore.isOpen == "favourites" ? 50 : 100} onClick={() => handleClose(uiStore.isOpen)} />
      )}
    </SearchBarWrapper>
  ) : null;
};

export default observer(SearchBar);
