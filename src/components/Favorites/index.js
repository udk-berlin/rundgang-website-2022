import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStores } from "@/stores/index";
import FavouriteIcon from "@/components/simple/FavouriteIcon";
import FavouritesWindow from "./FavouritesWindow";
import { SEARCHBAR_HEIGHT } from "@/utils/constants";

const variants = {
  favourites: {
    height: "60vh",
    width: "100%",
    margin: "0px",
    opacity: 1,
    borderWidth: "4px",
    overflowY: "auto",
  },
  filter: {
    height: SEARCHBAR_HEIGHT + 3,
    width: "0%",
    margin: "0px",
    opacity: 0,
    borderWidth: 0,
    overflowY: "auto",
  },
  closed: {
    height: SEARCHBAR_HEIGHT + 3,
    margin: "0px 0px 0px 16px",
    overflow: "hidden",
    width: "80px",
    opacity: 1,
  },
};

const FavouritesWrapper = styled(motion.div)`
  position: relative;
  width: 80px;
  background: white;
  height: ${SEARCHBAR_HEIGHT + 3}px;
  border: ${({ theme }) => `2px solid ${theme.colors.primary}`};
  margin: 0px 0px 0px 16px;
  max-height: 70vh;
  overflow-y: hidden;
  overflow-x: hidden;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    max-height: 60vh;
  }

  @media ${({ theme }) => theme.breakpoints.laptop} {
    max-width: 50%;
  }
`;

const FavouritesHeader = styled.div`
  width: fit-content;
  height: 100%;
  text-align: center;
  align-items: middle;
  cursor: pointer;
  display: flex;
  margin: auto;
`;

const FavouritesSavedItems = styled.span`
  width: 100%;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.ll};
  margin: auto;
  text-align: center;
  line-height: 0.9;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.lm};
  }
`;
const IconWrapper = styled.span`
  margin: auto;
`;

const Favourites = React.forwardRef(({ onOpen }, ref) => {
  const { uiStore } = useStores();
  return (
    <FavouritesWrapper
      animate={uiStore.isOpen ?? "closed"}
      variants={variants}
      transition={{ type: "linear", duration: 0.5 }}
      ref={ref}
    >
      <AnimatePresence>
        {uiStore.isOpen == "favourites" ? (
          <FavouritesWindow />
        ) : (
          !uiStore.isOpen && (
            <FavouritesHeader onClick={onOpen}>
              <IconWrapper>
                <FavouriteIcon saved={true} size={1.5} />
              </IconWrapper>
              <FavouritesSavedItems>
                {uiStore.numberSavedItems}
              </FavouritesSavedItems>
            </FavouritesHeader>
          )
        )}
      </AnimatePresence>
    </FavouritesWrapper>
  );
});

export default observer(Favourites);
