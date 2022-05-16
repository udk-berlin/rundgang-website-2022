import React, { useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import TagGroup from "./TagGroup";
import { groups } from "./testData";

const FilterMenuWrapper = styled.div`
  width: fit-content;
  height: fit-content;
`;

const TagMenu = () => {
  const [openTagGroup, setOpenTagGroup] = useState(0);

  const handleToggleOpen = group => {
    if (group == openTagGroup) {
      setOpenTagGroup(null);
    } else {
      setOpenTagGroup(group);
    }
  };
  return (
    <FilterMenuWrapper>
      {groups.map(group => (
        <TagGroup
          key={`${group.id}-taggroup`}
          group={group}
          isOpen={openTagGroup == group.id}
          handleToggleOpen={handleToggleOpen}
        />
      ))}
    </FilterMenuWrapper>
  );
};

export default observer(TagMenu);
