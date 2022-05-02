import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStores } from "@/stores/index";
import { useDebounce } from "@/hooks/useDebounce";
import { observer } from "mobx-react";
import SmartInput from "./SmartInput";
import Favorites from "./Favorites";

const SearchBarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  text-align: justify;
  align-items: center;
`;

const SearchWrapper = styled.div`
  width: 100%;
  height: 100%;
  border: ${({ theme }) => `4px solid ${theme.colors.secondary}`};
  margin: ${({ theme }) => `${theme.spacing.md}px`};
`;

const SearchBar = () => {
  const { uiStore } = useStores();
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const debouncedSearchTerm = useDebounce(value, 600);

  const handleChangeValue = ({ text }) => {
    setIsLoading(true);
    setValue(text);
  };

  const handleFocus = () => {
    uiStore.setIsOpen(true);
  };

  const handleBlur = () => {
    uiStore.setIsOpen(false);
  };

  useEffect(() => {
    setIsLoading(false);
    setResults(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <SearchBarWrapper>
      <SearchWrapper>
        <SmartInput
          text={value}
          plugins={[]}
          onChange={handleChangeValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </SearchWrapper>
      <Favorites />
    </SearchBarWrapper>
  );
};

export default observer(SearchBar);
