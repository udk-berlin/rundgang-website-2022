import React, { useMemo } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { useStores } from "@/stores/index";
import ClickAwayListener from "../simple/ClickAwayListener";

const AutoCompleteWrapper = styled.div`
  position: absolute;
  top: 55px;
  left: 12px;
  max-width: calc(100% - 54px);
  min-width: 50%;
  background: white;
  z-index: 100;
  box-shadow: 5px 5px 5px 0px #d9d9d9, -5px 5px 5px 0px #d9d9d9;
`;

const AutoCompleteItem = styled.div`
  cursor: pointer;
  padding: ${({ theme }) => `${theme.space(8)} ${theme.space(16)}`};
  border-bottom: 1px solid #d9d9d9;
  font-size: ${({ theme }) => theme.fontSizes.md};
  &:hover {
    background: ${({ theme }) => theme.colors.highlight};
  }
  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding: ${({ theme }) => `${theme.space(4)} ${theme.space(8)}`};
  }
`;

const AutoComplete = ({ searchValue, handleSelect, handleReset }) => {
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
    <ClickAwayListener onClickAway={e => handleReset(e)}>
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
    </ClickAwayListener>
  );
};

export default observer(AutoComplete);
