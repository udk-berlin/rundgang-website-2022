import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStores } from "@/stores/index";
import { useDebounce } from "@/hooks/useDebounce";
import { observer } from "mobx-react";
import Filter from "./Filter";
import Favorites from "./Favorites";

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
  const [isOpen, setIsOpen] = useState(false);

  const handleOnFocus = () => {
    setIsOpen(true);
  };
  const handleOnClose = () => {
    setIsOpen(false);
  };

  return (
    <SearchBarWrapper>
      <FlexContainer>
        <Filter isOpen={isOpen} onFocus={handleOnFocus} onClose={handleOnClose} />
        {isOpen ? null : <Favorites />}
      </FlexContainer>
    </SearchBarWrapper>
  );
};

export default observer(SearchBar);
