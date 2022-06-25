import React, { useMemo } from "react";
import styled from "styled-components";
import { useStores } from "@/stores/index";

const AutoCompleteWrapper = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.mm};
  position: absolute;
  top: calc(5vh + 14px);
  left: 16px;
  min-width: 50%;
  background: white;
  z-index: 100;
  box-shadow: 7px 7px 7px 2px #e2ff5d88, -7px 7px 7px 2px #e2ff5d88;
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
      item.template,
      item.id,
      item.parent,
      item.grandparent,
      item.greatgrandparent,
    );
    handleSelect(item.name);
  };

  console.log(uiStore.filterStore.isTagSelected);

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
