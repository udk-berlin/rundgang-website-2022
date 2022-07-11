import styled from "styled-components";
import React, { useCallback } from "react";
import { observer } from "mobx-react";
import { useStores } from "@/stores/index";
import InputField from "./InputField";
import { useRouter } from "next/router";
import { makeUrlFromId } from "@/utils/idUtils";
import { SEARCHBAR_HEIGHT, MIN_PADDING } from "@/utils/constants";
import useMediaQuery from "@/utils/useMediaQuery";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TagMenu = dynamic(() => import("./TagMenu"), {
  suspense: true,
});

const variants = {
  favourites: {
    height: SEARCHBAR_HEIGHT,
    width: "50%",
    marginRight: "16px",
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
  cursor: pointer;
`;
const FilterText = styled(motion.div)`
  align-items: center;
  padding: 0;
  padding-left: 8px;
  line-height: 1.1;
  margin: auto;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.lm};
    line-height: 1.4;
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
    let link = router.pathname;
    if (uiStore.filterStore.selectedId) {
      let pid = makeUrlFromId(uiStore.filterStore.selectedId);
      if (router.pathname == "/") {
        link = `/katalog/${pid}`;
      } else if (router.pathname.includes("[pid]")) {
        link = pid;
      } else {
        link = `${router.pathname}/${pid}`;
      }
      router.push(link);
    } else {
      router.replace(link.replace("[pid]", ""));
    }
  }, [uiStore.filterStore.selectedId, router.pathname]);

  return (
    <FilterWrapper
      animate={variant}
      variants={variants}
      ref={ref}
      onClick={onOpen}
      transition={{ type: "linear", duration: 0.5 }}
    >
      <AnimatePresence>
        {uiStore.isOpen !== "filter" && (
          <FilterText
            key="filtertext"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            FILTER
          </FilterText>
        )}
        {uiStore.isOpen && uiStore.isOpen == "filter" && (
          <motion.div
            key="filtergroups"
            initial={{ height: "0%" }}
            animate={{ height: "100%" }}
            exit={{ height: "0%" }}
          >
            <InputField handleSubmit={handleSubmit} />
            <Suspense fallback="...">
              <TagMenu handleSubmit={handleSubmit} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </FilterWrapper>
  );
});

export default observer(Filter);
