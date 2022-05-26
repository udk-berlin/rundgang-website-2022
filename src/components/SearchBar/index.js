import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import Filter from "@/components/Filter";
import Favorites from "@/components/Favorites";
import ClickAwayListener from "@/components/simple/ClickAwayListener";
import useIsSticky from "@/utils/useIsSticky";

const SearchBarWrapper = styled.div`
  position: ${({ position }) => position};
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  z-index: 4000;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: justify;
  width: 100%;
`;

const SearchBar = () => {
  const isSticky = useIsSticky(100);
  const [openField, setOpenField] = useState(null);

  const handleOpen = useCallback(
    item => {
      setOpenField(item);
    },
    [openField],
  );
  const handleClose = useCallback(
    item => {
      if (item === openField) {
        setOpenField(null);
      }
    },
    [openField],
  );

  return (
    <SearchBarWrapper position={openField ? "relative" : isSticky}>
      <ClickAwayListener onClickAway={() => setOpenField(null)}>
        <FlexContainer>
          <Filter
            openField={openField}
            onFocus={() => handleOpen("filter")}
            onClose={() => handleClose("filter")}
          />
          <Favorites
            openField={openField}
            onClick={() => handleOpen("favourites")}
            onClose={() => handleClose("favourites")}
          />
        </FlexContainer>
      </ClickAwayListener>
    </SearchBarWrapper>
  );
};

export default observer(SearchBar);
