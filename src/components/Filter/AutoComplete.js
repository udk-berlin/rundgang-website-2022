import React, { useMemo } from "react";
import styled from "styled-components";
import { useStores } from "@/stores/index";

const AutoCompleteWrapper = styled.div`
  position: absolute;
  top: calc(5vh + 14px);
  left: 8px;
  max-width: calc(100% - 52px);
  min-width: 50%;
  background: white;
  z-index: 100;
  box-shadow: 5px 5px 5px 0px #d9d9d9, -5px 5px 5px 0px #d9d9d9;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    top: 5vh;
  }
`;

const AutoCompleteItem = styled.div`
  cursor: pointer;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-bottom: 1px solid #d9d9d9;
  font-size: ${({ theme }) => theme.fontSizes.md};
  &:hover {
    background: ${({ theme }) => theme.colors.highlight};
  }
  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
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
    handleSelect();
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
