import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStores } from "@/stores/index";
import FavouriteStarSvg from "@/components/simple/FavouriteStar";
import FavouritesList from "./FavouritesList";

const variants = {
  favourites: { height: "fit-content", width: "99vw" },
  filter: { height: "5vh", width: "0px" },
  closed: { height: "5vh", width: "70px" },
};

const FavouritesWrapper = styled(motion.div)`
  position: relative;
  width: 70px;
  height: 5vh;
  border: ${({ theme }) => `4px solid ${theme.colors.primary}`};
  margin: ${({ theme }) => `0 ${theme.spacing.md}`};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin: ${({ theme }) => `0 ${theme.spacing.xs}`};
  }
`;

const FavouritesHeader = styled.div`
  display: flex;
  width: 60px;
  justify-content: space-around;
  text-align: center;
  align-items: center;
  cursor: pointer;
  padding: ${({ isOpen }) => (isOpen == "favourites" ? "20px" : "0px")};
`;
const FavouritesSavedItems = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  font-size: 30px;
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
          <FavouritesHeader onClick={onClick} isOpen={uiStore.isOpen}>
            <FavouritesSavedItems>
              {uiStore.numberSavedItems}
            </FavouritesSavedItems>
            <FavouriteStarSvg saved={true} size={16} />
          </FavouritesHeader>
        )}
      </AnimatePresence>
    </FavouritesWrapper>
  );
};

export default observer(Favourites);
