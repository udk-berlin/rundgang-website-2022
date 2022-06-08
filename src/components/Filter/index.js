import PropTypes from "prop-types";
import styled from "styled-components";
import React, { useMemo, useState } from "react";
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

const GoButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  flex-grow: 0;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  text-align: right;
  font-family: "Inter";
  margin-left: auto;
  margin-top: auto;
`;

const ResetButton = styled.button`
  font-family: "Diatype";
  cursor: pointer;
  border: none;
  background: ${({ theme }) => theme.colors.lightgrey};
  font-size: ${({ theme }) => theme.fontSizes.lm};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  height: fit-content;
  margin: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xs}`};
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin: ${({ theme }) => `0 ${theme.spacing.sm}`};
`;

const Filter = ({ onClick, onClose }) => {
  const { dataStore, uiStore } = useStores();

  const handleSubmit = () => {
    onClose();
    dataStore.api.getIdFromLink(uiStore.filterStore.selectedId, true);
  };

  return (
    <FilterWrapper
      animate={uiStore.isOpen !== null ? uiStore.isOpen : "closed"}
      variants={variants}
      transition={{ type: "linear", duration: 0.5 }}
    >
      <InputField handleFocus={onClick} handleSubmit={handleSubmit} />
      <AnimatePresence>
        {uiStore.isOpen == "filter" && (
          <>
            <TagMenu />
            <Buttons>
              <ResetButton onClick={() => uiStore.filterStore.handleReset()}>
                <LocalizedText id="reset" />
              </ResetButton>
              <GoButton
                active={uiStore.filterStore.isTagSelected}
                onClick={() => handleSubmit()}
              >
                {uiStore.filterStore.isTagSelected ? (
                  <span>&#8594;</span>
                ) : (
                  <span>&#x2715;</span>
                )}
              </GoButton>
            </Buttons>
          </>
        )}
      </AnimatePresence>
    </FilterWrapper>
  );
};

export default observer(Filter);
