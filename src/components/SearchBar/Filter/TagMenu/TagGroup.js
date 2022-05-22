import React from "react";
import styled, { css } from "styled-components";
import { observer } from "mobx-react";
import { motion } from "framer-motion";
import { useStores } from "@/stores/index";
import Tag from "../../../simple/Tag";

const variants = {
  open: { scaleY: 1, height: "100%", width: "100%" },
  closed: { scaleY: 0, height: "0", width: "100%" },
};

const TagGroupWrapper = styled.div`
  width: fit-content;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.sm}`};
`;
const NumberItems = styled.span`
  color: ${({ theme }) => theme.colors.lightgray};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  margin: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.sm}`};
`;
const ToggleIcon = styled.span`
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
  margin: ${({ theme }) => theme.spacing.xs};
`;

const TagGroup = ({
  handleToggleOpen,
  group,
  isOpen,
  selected,
  handleClickTag,
}) => {
  const { uiStore } = useStores();
  return (
    <TagGroupWrapper key={`${group.id}-taggroup`}>
      <TagGroupTitle
        key={`${group.id}-title`}
        onClick={() => handleToggleOpen(group.id)}
      >
        {group.name}
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
        key={`${group.id}-stretch`}
        transition={{ type: "linear", duration: 0.5 }}
      >
        {Object.entries(group.children).map(([subgroup, children]) => (
          <TagSubGroup key={`${subgroup}-subgroup`}>
            <TagSubGroupTitle>{subgroup}</TagSubGroupTitle>
            <Tags>
              {children.map(child => (
                <Tag
                  onClick={() =>
                    handleClickTag(
                      group.id,
                      child.id,
                      child.parent,
                      child.grandparent,
                    )
                  }
                  selected={selected[group.id] == child.id}
                  levelSelected={selected[group.id] !== null}
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
