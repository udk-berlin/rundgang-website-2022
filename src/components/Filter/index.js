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

const GoButton = styled.button`
  border: none;
  background: none;
  font-family: "Inter";
  cursor: pointer;
  flex-grow: 0;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ active, theme }) =>
    active ? theme.colors.black : theme.colors.lightgrey};
  text-align: right;
`;

const ResetButton = styled.button`
  border: none;
  background: ${({ theme }) => theme.colors.lightgrey};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  height: fit-content;
  margin-top: auto;
  margin-bottom: auto;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin: ${({ theme }) => `0 ${theme.spacing.mm}`};
`;

const Filter = ({ onFocus, onClose }) => {
  const { dataStore, uiStore } = useStores();

  console.log(uiStore.filterStore.selectedId);

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
            <Buttons>
              <ResetButton onClick={() => uiStore.filterStore.handleReset()}>
                <LocalizedText id="reset" />
              </ResetButton>
              <GoButton
                active={uiStore.filterStore.isTagSelected}
                onClick={() => {
                  onClose();
                  dataStore.api.getIdFromLink(
                    uiStore.filterStore.selectedId,
                    true
                  );
                }}
              >
                &#8594;
              </GoButton>
            </Buttons>
          </>
        )}
      </AnimatePresence>
    </FilterWrapper>
  );
};

export default observer(Filter);
