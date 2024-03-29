import React, { useMemo } from "react";
import { groupBy, entries } from "lodash";
import styled from "styled-components";
import { observer } from "mobx-react";
import { motion } from "framer-motion";
import { useStores } from "@/stores/index";
import Tag from "../../simple/Tag";
import LocalizedText from "modules/i18n/components/LocalizedText";

const variants = {
  open: { scaleY: 1, height: "100%", width: "100%" },
  closed: { scaleY: 0, height: "0", width: "100%" },
};

const TagGroupWrapper = styled.div`
  height: fit-content;
  padding: ${({ theme }) =>
    `${theme.space(8)} ${theme.space(8)} ${theme.space(8)} ${theme.space(16)}`};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding: ${({ theme }) =>
      `${theme.space(8)} ${theme.space(8)} ${theme.space(8)} ${theme.space(
        8,
      )}`};
  }
`;
const NumberItems = styled.span`
  color: ${({ theme }) => theme.colors.lightgrey};
  margin: ${({ theme }) => `${theme.space(8)} ${theme.space(8)}`};
  font-size: ${({ theme }) => theme.fontSizes.mm};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;
const ToggleIcon = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.mm};
  margin: ${({ theme }) => `${theme.space(4)} ${theme.space(4)}`};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;
const TagGroupTitle = styled.div`
  text-align: left;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.lm};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

const TagGroupStretch = styled(motion.div)`
  height: fit-content;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;
const TagSubGroup = styled.div`
  width: 100%;
`;

const TagSubGroupTitle = styled.div`
  padding: 8px 4px;
`;

const Tags = styled.div`
  width: 99%;
  display: flex;
  flex-wrap: wrap;
`;

const TagGroup = ({ group, name, handleSubmit }) => {
  const { uiStore } = useStores();
  const isOpen = uiStore.filterStore.openTagGroup == name;
  const groups = useMemo(
    () =>
      entries(groupBy(group, "template")).sort((a, b) =>
        a[0] == "subject" || a[0] == "faculty" ? -1 : 1,
      ),
    [uiStore.filterStore.selected],
  );
  return (
    <TagGroupWrapper>
      <TagGroupTitle onClick={() => uiStore.filterStore.handleToggleOpen(name)}>
        <LocalizedText id={name} />
        <NumberItems>{group?.length}</NumberItems>
        {isOpen ? (
          <ToggleIcon>&#8593;</ToggleIcon>
        ) : (
          <ToggleIcon>&#8595;</ToggleIcon>
        )}
      </TagGroupTitle>
      <TagGroupStretch
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        initial={false}
        transition={{ type: "linear", duration: 0.5 }}
      >
        {groups.map(([k, v]) => (
          <TagSubGroup key={`${k}-taggroup-${name}`}>
            {groups.length > 1 && (
              <TagSubGroupTitle>
                <LocalizedText id={k} />
              </TagSubGroupTitle>
            )}
            <Tags>
              {v.map((child, i) => (
                <Tag
                  onClick={() => {
                    uiStore.filterStore.setSelected(name, child.id);
                    handleSubmit();
                  }}
                  selected={uiStore.filterStore.selected[name] == child.id}
                  levelSelected={uiStore.filterStore.selected[name] !== null}
                  key={`${i}-tag-${child.id}-${name}`}
                >
                  {child.name}
                </Tag>
              ))}
            </Tags>
          </TagSubGroup>
        ))}
      </TagGroupStretch>
    </TagGroupWrapper>
  );
};

export default observer(TagGroup);
