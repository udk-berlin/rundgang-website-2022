import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import Filter from "./Filter";
import Favorites from "./Favorites";
import ClickAwayListener from "../simple/ClickAwayListener";

const SearchBarWrapper = styled.div`
  width: 100%;
  background: white;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: justify;
  width: 100%;
`;

const SearchBar = () => {
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
    <SearchBarWrapper>
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
