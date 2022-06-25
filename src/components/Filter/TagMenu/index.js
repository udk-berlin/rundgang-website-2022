import React, { useEffect, useState } from "react";
import _ from "lodash";
import styled from "styled-components";
import { observer } from "mobx-react";
import TagGroup from "./TagGroup";
import LocalizedText from "modules/i18n/components/LocalizedText";
import { useStores } from "@/stores/index";

const FilterMenuWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;
const GoButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  flex-grow: 0;
  font-size: 70px;
  padding: 0px;
  text-align: right;
  font-family: "Inter";
  line-height: 1;
  transform: ${({ active }) => (active ? "scaleY(1)" : "scaleY(0.7)")};
`;

const ResetButton = styled.button`
  font-family: "Diatype";
  cursor: pointer;
  border: 2px solid black;
  background: ${({ theme }) => theme.colors.lightgrey};
  border-radius: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  height: fit-content;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin: auto;
    margin-left: 0;
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  position: sticky;
  align-items: center;
  bottom: 70px;
  padding-left: 16px;
  padding-right: 8px;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    bottom: 60px;
  }
`;

const FilterMenu = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  max-height: calc(80vh - 66px);
`;

const TagMenu = ({ handleSubmit }) => {
  const { uiStore } = useStores();
  return (
    <FilterMenu>
      <FilterMenuWrapper>
        {_.entries(uiStore.filterStore.currentTags).map(([name, group]) => (
          <TagGroup
            key={`${name}-taggroupwerapper`}
            group={group}
            name={name}
          />
        ))}
      </FilterMenuWrapper>
      <Buttons>
        <ResetButton onClick={() => uiStore.filterStore.handleReset()}>
          <LocalizedText id="reset" />
        </ResetButton>
        <GoButton
          active={uiStore.filterStore.isTagSelected}
          onClick={() => handleSubmit()}
        >
          {uiStore.filterStore.isTagSelected ? (
            <span>&#8594;</span>
          ) : (
            <span>&#x2715;</span>
          )}
        </GoButton>
      </Buttons>
    </FilterMenu>
  );
};

export default observer(TagMenu);
