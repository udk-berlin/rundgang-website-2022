import PropTypes from "prop-types";
import styled from "styled-components";
import React, { useMemo, useCallback, useEffect } from "react";
import { observer } from "mobx-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStores } from "@/stores/index";
import InputField from "./InputField";
import { useRouter } from "next/router";
import { makeUrlFromId } from "@/utils/idUtils";
import { SEARCHBAR_HEIGHT, MIN_PADDING } from "@/utils/constants";
import useMediaQuery from "@/utils/useMediaQuery";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const TagMenu = dynamic(() => import("./TagMenu"), {
  suspense: true,
});

const variants = {
  favourites: {
    height: SEARCHBAR_HEIGHT,
    width: "50%",
  },
  favouritesMobile: {
    height: SEARCHBAR_HEIGHT,
    width: "0%",
    opacity: 0,
    borderWidth: 0,
  },
  filter: {
    height: "fit-content",
    width: "100%",
    opacity: 1,
    borderWidth: "4px",
  },
  filterMobile: {
    height: "fit-content",
    width: "100%",
    opacity: 1,
    borderWidth: "4px",
  },
  closed: {
    height: SEARCHBAR_HEIGHT,
    width: "100%",
    opacity: 1,
  },
};

const FilterWrapper = styled(motion.div)`
  width: 100%;
  height: fit-content;
  max-height: calc(100vh - ${MIN_PADDING}px);
  position: relative;
  background: white;
  border: ${({ theme }) => `4px solid ${theme.colors.highlight}`};
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    max-height: 80vh;
  }
`;

const Filter = React.forwardRef(({ onOpen }, ref) => {
  const { uiStore } = useStores();
  const router = useRouter();
  const isMobile = useMediaQuery(
    "only screen and (max-width:768px) and (orientation:portrait)",
  );

  const variant =
    uiStore.isOpen && uiStore.isOpen !== null
      ? `${uiStore.isOpen}${isMobile ? "Mobile" : ""}`
      : "closed";

  const handleSubmit = useCallback(() => {
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
  }, [uiStore.filterStore.selectedId]);

  return (
    <FilterWrapper
      animate={variant}
      variants={variants}
      ref={ref}
      onClick={onOpen}
      transition={{ type: "linear", duration: 0.5 }}
    >
      <InputField handleSubmit={handleSubmit} />
      <AnimatePresence>
        <Suspense fallback={`Loading...`}>
          {uiStore.isOpen && uiStore.isOpen == "filter" && (
            <TagMenu handleSubmit={handleSubmit} />
          )}
        </Suspense>
      </AnimatePresence>
    </FilterWrapper>
  );
});

export default observer(Filter);
