import PropTypes from "prop-types";
import styled from "styled-components";
import React, { useMemo, useState } from "react";
import { observer } from "mobx-react";
import { useStores } from "@/stores/index";
import { useIntl } from "react-intl";
import { motion } from "framer-motion";
import LocalizedText from "modules/i18n/components/LocalizedText";

const groups = [
  {
    name: "Fakultäten und Zentren",
    id: 0,
    children: [
      "Fakultät Gestaltung",
      "Fakultät Kunst",
      "Fakultät Musik",
      "Fakultät Architektur",
    ],
  },
  {
    name: "Studiengänge",
    id: 1,
    children: [
      "Visuelle Kommunikation",
      "Fakultät Kunst",
      "Fakultät Musik",
      "Fakultät Architektur",
    ],
  },
  {
    name: "Klassen und Kurse",
    id: 2,
    children: [
      "Visuelle Kommunikation",
      "Fakultät Kunst",
      "Fakultät Musik",
      "Fakultät Architektur",
    ],
  },
];

const variants = {
  open: { scaleY: 1, height: "100%" },
  closed: { scaleY: 0, height: "0" },
};
const FilterMenuWrapper = styled.div`
  width: 100%;
  height: fit-content;
`;

const TagGroup = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
`;

const TagGroupWrapper = styled.div`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.sm}`};
`;
const TagGroupTitle = styled.div`
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const Tag = styled.div`
  border: 1px solid black;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border-radius: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  height: fit-content;
  margin: ${({ theme }) => theme.spacing.xs};
`;

const TagMenu = () => {
  const { uiStore } = useStores();
  const [openTagGroup, setOpenTagGroup] = useState(0);

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
        <TagGroupWrapper key={`${group.id}-taggroup`}>
          <TagGroupTitle onClick={() => handleToggleOpen(group.id)}>
            {group.name}
            {openTagGroup == group.id ? (
              <span>&#9660;</span>
            ) : (
              <span>&#9654;</span>
            )}
          </TagGroupTitle>
          <TagGroup
            animate={group.id == openTagGroup ? "open" : "closed"}
            variants={variants}
              initial={false}
            transition={{ type: "linear", duration: 0.5 }}
          >
            {group.children.map(child => (
              <Tag>{child}</Tag>
            ))}
          </TagGroup>
        </TagGroupWrapper>
      ))}
    </FilterMenuWrapper>
  );
};

export default observer(TagMenu);
