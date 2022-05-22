import PropTypes from "prop-types";
import styled from "styled-components";
import React, { useState } from "react";
import { observer } from "mobx-react";
import { motion, AnimatePresence } from "framer-motion";
import InputField from "./InputField";
import TagMenu from "./TagMenu";

const variants = {
  favourites: { height: "5vh", width: "0px" },
  filter: { height: "fit-content", width: "98vw" },
  closed: { height: "5vh", width: "100%" },
};

const FilterWrapper = styled(motion.div)`
  position: relative;
  margin: ${({ theme }) => `0 ${theme.spacing.md}`};
  border: ${({ theme }) => `4px solid ${theme.colors.highlight}`};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin: ${({ theme }) => `0 ${theme.spacing.xs}`};
  }
`;

const CloseButton = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  font-family: "Diatype";
  cursor: pointer;
  flex-grow: 0;
  padding: ${({ theme }) => `${theme.spacing.sm}`};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  text-align: right;
`;

const Filter = ({ openField, onFocus, onClose }) => {
  return (
      <FilterWrapper
        animate={openField ?? "closed"}
        variants={variants}
        transition={{ type: "linear", duration: 0.5 }}
      >
        <InputField onFocus={onFocus} isOpen={openField == "filter"} />
        <AnimatePresence>
          {openField == "filter" && (
            <>
              <TagMenu />
              <CloseButton onClick={onClose}>&#8594;</CloseButton>
            </>
          )}
        </AnimatePresence>
      </FilterWrapper>
  );
};

export default observer(Filter);
