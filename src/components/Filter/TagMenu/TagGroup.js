import React, { useMemo } from "react";
import _ from "lodash";
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
  padding: ${({ theme }) =>
    `${theme.spacing.md} ${theme.spacing.sm} ${theme.spacing.md} ${theme.spacing.md}`};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding: ${({ theme }) =>
      `${theme.spacing.sm} ${theme.spacing.sm} ${theme.spacing.sm} ${theme.spacing.sm}`};
  }
`;
const NumberItems = styled.span`
  color: ${({ theme }) => theme.colors.lightgrey};
  margin: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.sm}`};
  font-size: ${({ theme }) => theme.fontSizes.mm};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;
const ToggleIcon = styled.span`
  font-family: "Inter";
  font-size: ${({ theme }) => theme.fontSizes.xs};
  margin: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.xs}`};
`;
const TagGroupTitle = styled.div`
  text-align: left;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.lm};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.mm};
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
  padding: 8px 4px;
`;

const Tags = styled.div`
  width: 99%;
  display: flex;
  flex-wrap: wrap;
`;

const TagGroup = ({ group, name }) => {
  const { uiStore } = useStores();
  const isOpen = uiStore.filterStore.openTagGroup == name;
  const groups = useMemo(
    () => _.entries(_.groupBy(group, "template")),
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
                  onClick={() =>
                    uiStore.filterStore.setSelected(
                      name,
                      child.id,
                      child.parent,
                      child.grandparent,
                      child.greatgrandparent,
                    )
                  }
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
