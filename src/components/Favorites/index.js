import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStores } from "@/stores/index";
import FavouriteIcon from "@/components/simple/FavouriteIcon";
import FavouritesList from "./FavouritesList";
import { SEARCHBAR_HEIGHT } from "@/utils/constants";

const variants = {
  favourites: {
    height: "fit-content",
    width: "100%",
    opacity: 1,
    margin: "2px 8px",
    borderWidth: "4px",
    minHeight: SEARCHBAR_HEIGHT,
    overflowY: "auto",
  },
  filter: {
    height: SEARCHBAR_HEIGHT,
    width: "0%",
    opacity: 0,
    margin: "2px 0px",
    borderWidth: 0,
  },
  closed: {
    height: SEARCHBAR_HEIGHT,
    overflow: "hidden",
    width: "80px",
    opacity: 1,
    margin: "2px 8px",
  },
};

const FavouritesWrapper = styled(motion.div)`
  position: relative;
  width: 80px;
  background: white;
  height: ${SEARCHBAR_HEIGHT}px;
  border: ${({ theme }) => `2px inset ${theme.colors.primary}`};
  margin: ${({ theme }) => `2px ${theme.space(8)}`};
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  overflow-x: hidden;
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

const Favourites = ({ onClick, onClose }) => {
  const { uiStore } = useStores();
  return (
    <FavouritesWrapper
      animate={uiStore.isOpen ?? "closed"}
      variants={variants}
      transition={{ type: "linear", duration: 0.5 }}
    >
      <AnimatePresence>
        {uiStore.isOpen == "favourites" ? (
          <FavouritesList onClose={onClose} />
        ) : (
          !uiStore.isOpen && (
            <FavouritesHeader onClick={onClick} isOpen={uiStore.isOpen}>
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
};

export default observer(Favourites);
