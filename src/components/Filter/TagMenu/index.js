import React, { useEffect, useState } from "react";
import _ from "lodash";
import styled from "styled-components";
import { observer } from "mobx-react";
import TagGroup from "./TagGroup";
import { useStores } from "@/stores/index";

const FilterMenuWrapper = styled.div`
  width: 100%;
  height: fit-content;
`;


const TagMenu = () => {
  const { uiStore } = useStores();
  return (
    <FilterMenuWrapper>
      {uiStore.currentTags.map(group => (
        <TagGroup key={`${group.level}-taggroup`} group={group} />
      ))}
    </FilterMenuWrapper>
  );
};

export default observer(TagMenu);
