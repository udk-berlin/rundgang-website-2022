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
      {_.entries(uiStore.filterStore.currentTags).map(([name, group]) => (
        <TagGroup key={`${name}-taggroupwerapper`} group={group} name={name} />
      ))}
    </FilterMenuWrapper>
  );
};

export default observer(TagMenu);
