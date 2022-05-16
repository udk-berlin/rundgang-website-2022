import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { motion } from "framer-motion";
import { useStores } from "@/stores/index";

const variants = {
  open: { scaleY: 1, height: "100%" },
  closed: { scaleY: 0, height: "0" },
};

const Tags = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const TagGroupWrapper = styled.div`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.sm}`};
`;
const TagGroupTitle = styled.div`
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  @media ${({ theme }) => theme.breakpoints.md} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

const Tag = styled.span`
  border: 1px solid black;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border-radius: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  margin: ${({ theme }) => theme.spacing.xs};
  white-space: nowrap;
  @media ${({ theme }) => theme.breakpoints.md} {
    font-size: ${({ theme }) => theme.fontSizes.xxs};
  }
`;

const TagGroup = ({ handleToggleOpen, group, isOpen }) => {
  const { uiStore } = useStores();
  return (
    <TagGroupWrapper key={`${group.id}-taggroup`}>
      <TagGroupTitle onClick={() => handleToggleOpen(group.id)}>
        {group.name}
        {isOpen ? <span>&#9660;</span> : <span>&#9654;</span>}
      </TagGroupTitle>
      <Tags
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        initial={false}
        transition={{ type: "linear", duration: 0.5 }}
      >
        {group.children.map(child => (
          <Tag>{child}</Tag>
        ))}
      </Tags>
    </TagGroupWrapper>
  );
};

export default observer(TagGroup);
