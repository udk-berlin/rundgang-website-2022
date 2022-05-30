import React from "react";
import styled, { css } from "styled-components";
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
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.sm}`};
`;
const NumberItems = styled.span`
  color: ${({ theme }) => theme.colors.lightgray};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  margin: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.sm}`};
`;
const ToggleIcon = styled.span`
  font-family: "Inter";
  font-size: ${({ theme }) => theme.fontSizes.xs};
  margin: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.xs}`};
`;
const TagGroupTitle = styled.div`
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.md};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

const TagGroupStretch = styled(motion.div)`
  height: 100%;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;
const TagSubGroup = styled.div`
  width: 100%;
`;
const TagSubGroupTitle = styled.div`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: ${({ theme }) => theme.spacing.sm};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;
const Tags = styled.div`
  width: 99%;
  display: flex;
  flex-wrap: wrap;
`;

const TagGroup = ({ group }) => {
  const { uiStore } = useStores();
  const isOpen = uiStore.openTagGroup == group.level;
  return (
    <TagGroupWrapper key={`${group.level}-taggroup`}>
      <TagGroupTitle
        key={`${group.level}-title`}
        onClick={() => uiStore.handleToggleOpen(group.level)}
      >
        <LocalizedText id={group.name} />
        <NumberItems>{group.numberItems}</NumberItems>
        {isOpen ? (
          <ToggleIcon>&#8595;</ToggleIcon>
        ) : (
          <ToggleIcon>&#8594;</ToggleIcon>
        )}
      </TagGroupTitle>
      <TagGroupStretch
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        initial={false}
        key={`${group.level}-stretch`}
        transition={{ type: "linear", duration: 0.5 }}
      >
        {Object.entries(group.children).map(([subgroup, children]) => (
          <TagSubGroup key={`${subgroup}-subgroup`}>
            <TagSubGroupTitle>{subgroup}</TagSubGroupTitle>
            <Tags>
              {children.map(child => (
                <Tag
                  onClick={() =>
                    uiStore.setSelected(
                      group.level,
                      child.id,
                      child.parent,
                      child.grandparent,
                    )
                  }
                  selected={uiStore.selected[group.level] == child.id}
                  levelSelected={uiStore.selected[group.level] !== null}
                  key={child.id}
                  tagtitle={child.name}
                />
              ))}
            </Tags>
          </TagSubGroup>
        ))}
      </TagGroupStretch>
    </TagGroupWrapper>
  );
};

export default observer(TagGroup);
