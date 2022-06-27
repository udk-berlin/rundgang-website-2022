import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import Filter from "@/components/Filter";
import Favorites from "@/components/Favorites";
import ClickAwayListener from "@/components/simple/ClickAwayListener";
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

  const handleOpen = useCallback(
    item => {
      if (
        (item == "favourites" && uiStore.numberSavedItems) ||
        item !== "favourites"
      ) {
        uiStore.setIsOpen(item);
      }
    },
    [uiStore.isOpen],
  );
  const handleClose = useCallback(
    item => {
      if (!item || item === uiStore.isOpen) {
        uiStore.setIsOpen(null);
      }
    },
    [uiStore.isOpen],
  );

  return !uiStore.currentContext?.type ||
    uiStore.currentContext?.type !== "item" ? (
    <SearchBarWrapper>
      <ClickAwayListener onClickAway={() => handleClose()}>
        <FlexContainer>
          <Filter
            onClick={() => handleOpen("filter")}
            onClose={() => handleClose("filter")}
          />
          <Favorites
            onClick={() => handleOpen("favourites")}
            onClose={() => handleClose("favourites")}
          />
        </FlexContainer>
      </ClickAwayListener>
    </SearchBarWrapper>
  ) : null;
};

export default observer(SearchBar);
