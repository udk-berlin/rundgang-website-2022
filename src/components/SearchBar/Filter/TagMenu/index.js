import React, { useEffect, useState } from "react";
import _ from "lodash";
import styled from "styled-components";
import { observer } from "mobx-react";
import TagGroup from "./TagGroup";
import { groupss } from "./testData";
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
const INITIAL_SELECTION = { 0: null, 1: null, 2: null };
const TagMenu = () => {
  const { dataStore } = useStores();
  const [groups, setGroups] = useState([]);
  const [selected, setSelected] = useState(INITIAL_SELECTION);
  const [openTagGroup, setOpenTagGroup] = useState(0);

  const handleClickTag = (level, id, parent, grandparent) => {
    let newSelected = selected;
    if (level == 0) {
      newSelected = { 0: id, 1: null, 2: null };
    }
    if (level == 1) {
      newSelected = { 0: parent, 1: id, 2: null };
    }
    if (level == 2) {
      newSelected = { 0: grandparent, 1: parent, 2: id };
    }
    setSelected(newSelected);
    if (level < 2) {
      setOpenTagGroup(level + 1);
    }
  };

  const handleReset = () => {
    setSelected(INITIAL_SELECTION);
    setOpenTagGroup(null);
  };

  useEffect(() => {
    if (dataStore.api.structure) {
      const hierarchy = dataStore.api.structure;
      const children0 = _.values(hierarchy.children);
      const level0 = {
        name: "Fakultäten und Zentren",
        id: 0,
        numberItems: children0.length,
        children: _.groupBy(children0, "template"),
      };

      const children1 = children0
        .map(c =>
          _.values(c.children).map(child => ({ ...child, parent: c.id })),
        )
        .flat();
      const level1 = {
        name: "Studiengänge und Initiativen",
        id: 1,
        numberItems: children1.length,
        children: _.groupBy(children1, "template"),
      };

      const children2 = children1
        .map(c =>
          _.values(c.children).map(child => ({
            ...child,
            parent: c.id,
            grandparent: c.parent,
          })),
        )
        .flat();
      const level2 = {
        name: "Kurse und Klassen",
        id: 2,
        numberItems: children2.length,
        children: _.groupBy(children2, "template"),
      };
      setGroups([level0, level1, level2]);
    }
  }, [dataStore.api.structure]);

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
          selected={selected}
          handleClickTag={handleClickTag}
        />
      ))}
      <ResetButton onClick={handleReset}>
        <LocalizedText id="reset" />
      </ResetButton>
    </FilterMenuWrapper>
  );
};

export default observer(TagMenu);
