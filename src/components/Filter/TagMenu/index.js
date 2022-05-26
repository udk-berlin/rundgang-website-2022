import React, { useEffect, useState } from "react";
import _ from "lodash";
import styled from "styled-components";
import { observer } from "mobx-react";
import TagGroup from "./TagGroup";
import { useStores } from "@/stores/index";
import LocalizedText from "modules/i18n/components/LocalizedText";

const FilterMenuWrapper = styled.div`
  width: 100%;
  height: fit-content;
`;

const ResetButton = styled.button`
  border: 3px solid black;
  background: white;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const TagMenu = () => {
  const { dataStore, uiStore } = useStores();
  return (
    <FilterMenuWrapper>
      {uiStore.currentTags.map(group => (
        <TagGroup key={`${group.level}-taggroup`} group={group} />
      ))}
      <ResetButton onClick={() => uiStore.handleReset()}>
        <LocalizedText id="reset" />
      </ResetButton>
    </FilterMenuWrapper>
  );
};

export default observer(TagMenu);
