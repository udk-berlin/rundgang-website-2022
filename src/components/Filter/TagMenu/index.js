import React from "react";
import { entries } from "lodash";
import styled from "styled-components";
import { observer } from "mobx-react";
import TagGroup from "./TagGroup";
import LocalizedText from "modules/i18n/components/LocalizedText";
import { useStores } from "@/stores/index";

const FilterMenuWrapper = styled.div`
  width: 100%;
  height: fit-content;
`;

const ResetButton = styled.button`
  font-family: "Diatype";
  cursor: pointer;
  border: 1px solid black;
  color: black;
  background: ${({ theme }) => theme.colors.lightgrey};
  border-radius: ${({ theme }) => theme.space(48)};
  font-size: ${({ theme }) => theme.fontSizes.md};
  padding: ${({ theme }) => `6px 8px 6px ${theme.space(8)} `};
  height: fit-content;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin: auto;
    margin-left: 0;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  position: sticky;
  align-items: center;
  bottom: 0px;
  padding: 16px 8px 8px 16px;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding-left: 8px;
  }
`;

const FilterMenu = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  max-height: calc(80vh - 66px);
  overflow-y: auto;
  margin-bottom: 16px;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    height: 55vh;
  }
`;

const TagMenu = ({ handleSubmit }) => {
  const { uiStore } = useStores();
  return (
    <FilterMenu>
      <Buttons>
        <ResetButton
          onClick={() => {
            uiStore.filterStore.handleReset();
            handleSubmit();
          }}
        >
          <LocalizedText id="reset" />
        </ResetButton>
      </Buttons>
      <FilterMenuWrapper>
        {entries(uiStore.filterStore.currentTags).map(([name, group]) => (
          <TagGroup
            key={`${name}-taggroupwerapper`}
            group={group}
            name={name}
            handleSubmit={handleSubmit}
          />
        ))}
      </FilterMenuWrapper>
    </FilterMenu>
  );
};

export default observer(TagMenu);
