import PropTypes from "prop-types";
import styled from "styled-components";
import React, { useState } from "react";
import { observer } from "mobx-react";
import { motion, AnimatePresence } from "framer-motion";
import ClickAwayListener from "./ClickAwayListener";
import InputField from "./InputField";
import TagMenu from "./TagMenu";

const variants = {
  open: { height: "fit-content", width: "100%" },
  closed: { height: "5vh", width: "100%" },
};

const FilterWrapper = styled(motion.div)`
  margin: ${({ theme }) => `0 ${theme.spacing.md}`};
  border: ${({ theme }) => `4px solid ${theme.colors.highlight}`};
  @media ${({ theme }) => theme.breakpoints.md} {
    margin: ${({ theme }) => `0 ${theme.spacing.xs}`};
  }
`;

const CloseButton = styled.div`
  font-family: "Diatype";
  cursor: pointer;
  flex-grow: 0;
  padding: ${({ theme }) => `${theme.spacing.sm}`};
  font-size: ${({ theme }) => theme.fontSizes.md};
  text-align: right;
`;

const Filter = ({ isOpen, onFocus, onClose }) => {
  const handleReset = e => {
    setValue("");
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <ClickAwayListener onClickAway={onClose}>
      <FilterWrapper
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={{ type: "linear", duration: 0.5 }}
      >
        <InputField onFocus={onFocus} isOpen={isOpen} />
        <AnimatePresence>
          {isOpen && (
            <>
              <TagMenu />
              <CloseButton onClick={onClose}>&#57344;</CloseButton>
            </>
          )}
        </AnimatePresence>
      </FilterWrapper>
    </ClickAwayListener>
  );
};

export default observer(Filter);
