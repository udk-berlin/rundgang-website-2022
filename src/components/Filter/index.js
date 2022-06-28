import PropTypes from "prop-types";
import styled from "styled-components";
import React, { useMemo, useCallback, useEffect } from "react";
import { observer } from "mobx-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStores } from "@/stores/index";
import InputField from "./InputField";
import TagMenu from "./TagMenu";
import { useRouter } from "next/router";
import { makeUrlFromId } from "@/utils/idUtils";
import { SEARCHBAR_HEIGHT, MIN_PADDING } from "@/utils/constants";
import useMediaQuery from "@/utils/useMediaQuery";

const variants = {
  favourites: {
    height: SEARCHBAR_HEIGHT,
    width: "50%",
  },
  favouritesMobile: {
    height: SEARCHBAR_HEIGHT,
    width: "0%",
    opacity: 0,
    margin: "0px 0px",
    borderWidth: 0,
  },
  filter: {
    height: "fit-content",
    width: "100%",
    opacity: 1,
    margin: "0px 8px",
    borderWidth: "4px",
  },
  filterMobile: {
    height: "fit-content",
    width: "100%",
    opacity: 1,
    margin: "0px 8px",
    borderWidth: "4px",
  },
  closed: {
    height: SEARCHBAR_HEIGHT,
    width: "100%",
    opacity: 1,
    margin: "0px 0px 0px 8px",
  },
};

const FilterWrapper = styled(motion.div)`
  width: 100%;
  height: fit-content;
  max-height: calc(100vh - ${MIN_PADDING}px);
  position: relative;
  background: white;
  margin: ${({ theme }) => ` 0 0 0 ${theme.space(16)}`};
  border: ${({ theme }) => `4px solid ${theme.colors.highlight}`};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin: ${({ theme }) => ` 0 0 0 ${theme.space(4)}`};
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
  const isMobile = useMediaQuery("(max-width: 768px)");

  const variant =
    uiStore.isOpen && uiStore.isOpen !== null
      ? `${uiStore.isOpen}${isMobile ? "Mobile" : ""}`
      : "closed";

  const handleSubmit = useCallback(
    (close = false) => {
      if (close) {
        onClose();
      }
      if (uiStore.filterStore.selectedId) {
        let link = router.pathname;
        let pid = makeUrlFromId(uiStore.filterStore.selectedId);
        if (router.pathname == "/") {
          link = `katalog/${pid}`;
        } else if (router.pathname.includes("[pid]")) {
          link = link.replace("[pid]", pid);
        } else {
          link = `${router.pathname}/${pid}`;
        }
        router.replace(link);
      } else {
        if (router.pathname == "/") {
          router.replace("/");
        } else if (router.pathname.includes("[pid]")) {
          router.replace(router.pathname.replace("[pid]", ""));
        } else {
          router.replace(router.pathname.replace("[pid]", ""));
        }
      }
    },
    [uiStore.filterStore.selectedId],
  );

  return (
    <FilterWrapper
      animate={variant}
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
