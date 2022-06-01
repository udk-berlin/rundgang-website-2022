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
  line-height: 1;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: ${({ theme }) => theme.spacing.xs};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    margin: ${({ theme }) => theme.spacing.xxs};
  }
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
      borderRadius: theme.spacing.md,
      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
      color: color,
      backgroundColor: background,
      borderColor: color,
    };
  }}
`;
const Tag = ({
  selected,
  levelSelected,
  onClick,
  showCross = true,
  children,
}) => {
  return (
    <TagWrapper
      onClick={onClick}
      selected={selected}
      levelSelected={levelSelected}
    >
      {children}
      {selected && showCross ? (
        <TagIcon size="12px">&#57344;</TagIcon>
      ) : (
        showCross && <TagIcon size="20px">+</TagIcon>
      )}
    </TagWrapper>
  );
};

export default Tag;
