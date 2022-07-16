import React, { useMemo } from "react";
import styled from "styled-components";
import { useIntl } from "react-intl";

const TagIcon = styled.span`
  font-size: ${({ size }) => size}px;
  padding-left: ${({ theme }) => theme.space(8)};
  line-height: 0.6;
  margin: auto;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding-left: ${({ theme }) => theme.space(2)};
    font-size: ${({ size }) => size * 0.9}px;
  }
`;

const TagWrapper = styled.span`
  border: 1px solid black;
  cursor: pointer;
  width: fit-content;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 1;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: ${({ theme }) => theme.space(4)};
  padding: ${({ theme }) => `6px 8px 6px ${theme.space(8)} `};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    margin: ${({ theme }) => theme.space(4)};
  }
  ${({ theme, selected, levelSelected }) => {
    let color = theme.colors.black;
    let background = "transparent";
    if (selected) {
      color = theme.colors.white;
      background = theme.colors.black;
    } else if (levelSelected) {
      color = theme.colors.lightgrey;
    }
    return {
      borderRadius: theme.space(48),
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
  template,
}) => {
  const intl = useIntl();
  const tagPrefix = useMemo(
    () =>
      template?.startsWith("location")
        ? intl.formatMessage({ id: template })
        : "",
    [template, intl.locale],
  );
  return (
    <TagWrapper
      onClick={onClick}
      selected={selected}
      levelSelected={levelSelected}
    >
      {tagPrefix}
      {children}
      {selected && showCross ? (
        <TagIcon size="16">&#x2715;</TagIcon>
      ) : (
        showCross && <TagIcon size="22">+</TagIcon>
      )}
    </TagWrapper>
  );
};

export default Tag;
