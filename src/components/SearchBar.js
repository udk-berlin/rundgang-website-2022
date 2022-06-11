import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import Filter from "@/components/Filter";
import Favorites from "@/components/Favorites";
import ClickAwayListener from "@/components/simple/ClickAwayListener";
import { useStores } from "@/stores/index";
import useIsScrolled from "@/utils/useIsScrolled";

const SearchBarWrapper = styled.div`
  position: ${({ isScrolled }) => (isScrolled ? "fixed" : "relative")};
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  z-index: 4000;
  padding-bottom: 10px;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: justify;
  width: 100%;
`;

const SearchBar = () => {
  const { uiStore } = useStores();
  const isScrolled = useIsScrolled(0);

  const handleOpen = useCallback(
    item => {
      uiStore.setIsOpen(item);
    },
    [uiStore.isOpen],
  );
  const handleClose = useCallback(
    item => {
      if (item === uiStore.isOpen) {
        uiStore.setIsOpen(null);
      }
    },
    [uiStore.isOpen],
  );

  return (
    <SearchBarWrapper isScrolled={isScrolled}>
      <ClickAwayListener onClickAway={() => uiStore.setIsOpen(null)}>
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
  );
};

export default observer(SearchBar);
