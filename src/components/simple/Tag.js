import React from "react";
import styled from "styled-components";

const TagIcon = styled.span`
  font-size: ${({ size }) => size};
  padding-left: ${({ theme }) => theme.spacing.xs};
`;

const TagWrapper = styled.span`
  border: 1px solid black;
  white-space: nowrap;
  cursor: pointer;
  ${({ theme, selected, levelSelected }) => {
    let color = theme.colors.black;
    let background = theme.colors.white;
    if (selected) {
      color = theme.colors.white;
      background = theme.colors.black;
    } else if (levelSelected) {
      color = theme.colors.lightgray;
    }
    return {
      fontSize: theme.fontSizes.xs,
      borderRadius: theme.spacing.md,
      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
      margin: theme.spacing.xs,
      color: color,
      backgroundColor: background,
      borderColor: color,
    };
  }}
`;
const Tag = ({ selected, levelSelected, onClick, tagtitle }) => {
  return (
    <TagWrapper
      onClick={onClick}
      selected={selected}
      levelSelected={levelSelected}
    >
      {tagtitle}
      {selected ? (
        <TagIcon size="12px">&#57344;</TagIcon>
      ) : (
        <TagIcon size="20px">+</TagIcon>
      )}
    </TagWrapper>
  );
};

export default Tag;
