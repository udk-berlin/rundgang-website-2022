import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStores } from "@/stores/index";
import FavouriteIcon from "@/components/simple/FavouriteIcon";
import FavouritesList from "./FavouritesList";

const variants = {
  favourites: {
    height: "fit-content",
    width: "100%",
    opacity: 1,
    margin: "0px 8px",
    borderWidth: "4px",
    minHeight: "5vh",
  },
  filter: {
    height: "5vh",
    width: "0%",
    opacity: 0,
    margin: "0px 0px",
    borderWidth: 0,
  },
  closed: { height: "5vh", opacity: 1, margin: "0px 8px" },
};

const FavouritesWrapper = styled(motion.div)`
  position: relative;
  width: 25%;
  min-height: 5vh;
  border: ${({ theme }) => `2px solid ${theme.colors.primary}`};
  margin: ${({ theme }) => `0 ${theme.spacing.md}`};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin: ${({ theme }) => `0 ${theme.spacing.xs}`};
  }
`;

const FavouritesHeader = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  align-items: middle;
  cursor: pointer;
`;
const FavouritesSavedItems = styled.span`
  width: 100%;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.ll};
  margin: auto;
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
                <FavouriteIcon saved={true} size={16} />
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
