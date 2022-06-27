import React, { useMemo } from "react";
import styled from "styled-components";
import { useIntl } from "react-intl";

const TagIcon = styled.span`
  font-size: ${({ size }) => size};
  padding-left: ${({ theme }) => theme.spacing.sm};
  line-height: 0.6;
  margin: auto;
`;

const TagWrapper = styled.span`
  border: 1px solid black;
  cursor: pointer;
  width: fit-content;
  word-wrap: break-word;
  word-break: break-all;
  line-height: 1;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `6px 8px 6px ${theme.spacing.sm} `};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    margin: ${({ theme }) => theme.spacing.xs};
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
      borderRadius: theme.spacing.lg,
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
        <TagIcon size="12px">&#57344;</TagIcon>
      ) : (
        showCross && <TagIcon size="22px">+</TagIcon>
      )}
    </TagWrapper>
  );
};

export default Tag;
