import PropTypes from "prop-types";
import styled from "styled-components";
import React, { useMemo, useCallback } from "react";
import { observer } from "mobx-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStores } from "@/stores/index";
import InputField from "./InputField";
import TagMenu from "./TagMenu";
import { useRouter } from "next/router";
import { makeUrlFromId } from "@/utils/idUtils";

const variants = {
  favourites: {
    height: "5vh",
    width: "0px",
    opacity: 0,
    margin: "0px 0px",
    borderWidth: 0,
  },
  filter: {
    height: "80vh",
    width: "100%",
    opacity: 1,
    margin: "0px 8px",
    borderWidth: "4px",
  },
  closed: { height: "5vh", width: "100%", opacity: 1, margin: "0px 8px" },
};

const FilterWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  margin: ${({ theme }) => `0 ${theme.spacing.md}`};
  border: ${({ theme }) => `4px solid ${theme.colors.highlight}`};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin: ${({ theme }) => `0 ${theme.spacing.xs}`};
  }
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
`;

const Filter = ({ onClick, onClose }) => {
  const { uiStore } = useStores();
  const router = useRouter();

  const handleSubmit = useCallback(() => {
    onClose();
    if (uiStore.filterStore.isTagSelected) {
      let link = router.pathname;
      let pid = makeUrlFromId(uiStore.filterStore.selectedId);
      if (router.pathname == "/") {
        link = `katalog/${pid}`;
      } else if (router.pathname.includes("[pid]")) {
        link = link.replace("[pid]", pid);
      } else {
        link = `${router.pathname}/${pid}`;
      }
      router.push(link);
    }
  }, [uiStore.filterStore.isTagSelected]);

  return (
    <FilterWrapper
      animate={
        uiStore.isOpen && uiStore.isOpen !== null ? uiStore.isOpen : "closed"
      }
      variants={variants}
      transition={{ type: "linear", duration: 0.5 }}
    >
      <InputField handleFocus={onClick} handleSubmit={handleSubmit} />
      <AnimatePresence>
        {uiStore.isOpen && uiStore.isOpen == "filter" && (
          <TagMenu handleSubmit={handleSubmit} />
        )}
      </AnimatePresence>
    </FilterWrapper>
  );
};

export default observer(Filter);
