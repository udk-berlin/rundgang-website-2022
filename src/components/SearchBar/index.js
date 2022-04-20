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

const SearchBar = () => {
  const { uiStore } = useStores();
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const debouncedSearchTerm = useDebounce(value, 600);

  const handleChangeValue = ({ text }) => {
    uiStore.filterStore.parseText(text);
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
    setResults(uiStore.filterStore.result);
  }, [debouncedSearchTerm]);

  return (
    <SearchBarWrapper>
      <SmartInput
        text={value}
        plugins={[]}
        onChange={handleChangeValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <Favorites />
    </SearchBarWrapper>
  );
};

export default observer(SearchBar);
