import React, { useMemo } from "react";
import styled from "styled-components";
import { useStores } from "@/stores/index";

const AutoCompleteWrapper = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.mm};
  position: absolute;
  top: calc(5vh + 14px);
  left: 16px;
  background: white;
  z-index: 100;
  box-shadow: 7px 7px 7px 2px #E2FF5D88, -7px 7px 7px 2px #E2FF5D88;
`;

const AutoCompleteItem = styled.div`
  cursor: pointer;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  &:hover {
    background: ${({ theme }) => theme.colors.highlight};
  }
`;

const AutoComplete = ({ searchValue, handleSelect }) => {
  const { uiStore } = useStores();
  let listWithIds = useMemo(
    () =>
      uiStore.filterStore.contextList
        .filter(item =>
          item.name.toUpperCase().includes(searchValue.toUpperCase()),
        )
        .slice(0, 10),
    [searchValue],
  );

  const onItemClicked = item => {
    uiStore.filterStore.setSelected(
      "klassen",
      item.id,
      item.parent,
      item.grandparent,
      item.greatgrandparent,
    );
    handleSelect(item.name);
  };

  return (
    <AutoCompleteWrapper>
      {listWithIds && listWithIds.length > 0
        ? listWithIds.map(item => (
            <AutoCompleteItem
              onClick={() => onItemClicked(item)}
              key={`autocomplete-item-${item.id}`}
            >
              {item.name}
            </AutoCompleteItem>
          ))
        : null}
    </AutoCompleteWrapper>
  );
};

export default AutoComplete;
