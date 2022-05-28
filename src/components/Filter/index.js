import PropTypes from "prop-types";
import styled from "styled-components";
import React, { useState } from "react";
import { observer } from "mobx-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStores } from "@/stores/index";
import InputField from "./InputField";
import TagMenu from "./TagMenu";
import LocalizedText from "modules/i18n/components/LocalizedText";

const variants = {
  favourites: { height: "5vh", width: "0px" },
  filter: { height: "fit-content", width: "98vw" },
  closed: { height: "5vh", width: "100%" },
};

const FilterWrapper = styled(motion.div)`
  width: 100%;
  position: relative;
  margin: ${({ theme }) => `0 ${theme.spacing.md}`};
  border: ${({ theme }) => `4px solid ${theme.colors.highlight}`};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin: ${({ theme }) => `0 ${theme.spacing.xs}`};
  }
`;

const GoButton = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  font-family: "Diatype";
  cursor: pointer;
  flex-grow: 0;
  padding: ${({ theme }) => `${theme.spacing.sm}`};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ active, theme }) =>
    active ? theme.colors.black : theme.colors.lightgray};
  text-align: right;
`;

const ResetButton = styled.button`
  border: 3px solid black;
  background: white;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  position: absolute;
  top: 0px;
  right: 0px;
  margin: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.md}`};
`;

const Filter = ({ onFocus, onClose }) => {
  const { dataStore, uiStore } = useStores();

  return (
    <FilterWrapper
      animate={uiStore.isOpen !== null ? uiStore.isOpen : "closed"}
      variants={variants}
      transition={{ type: "linear", duration: 0.5 }}
    >
      <InputField onFocus={onFocus} />
      <AnimatePresence>
        {uiStore.isOpen == "filter" && (
          <>
            <TagMenu />
            <GoButton
              active={uiStore.isTagSelected}
              onClick={() => {
                onClose();
                dataStore.api.getIdFromLink(uiStore.selectedId, true);
              }}
            >
              &#8594;
            </GoButton>
            <ResetButton onClick={() => uiStore.handleReset()}>
              <LocalizedText id="reset" />
            </ResetButton>
          </>
        )}
      </AnimatePresence>
    </FilterWrapper>
  );
};

export default observer(Filter);
