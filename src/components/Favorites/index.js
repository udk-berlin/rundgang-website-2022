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
    margin: "2px 8px",
    borderWidth: "4px",
    minHeight: "5vh",
  },
  filter: {
    height: "5vh",
    width: "0%",
    opacity: 0,
    margin: "0px 0px",
    borderWidth: 0,
    padding: "0px",
  },
  closed: { height: "5vh", opacity: 1, margin: "2px 8px", padding: "0px 8px" },
};

const FavouritesWrapper = styled(motion.div)`
  position: relative;
  width: fit-content;
  min-height: 5vh;
  border: ${({ theme }) => `2px solid ${theme.colors.primary}`};
  margin: ${({ theme }) => `2px ${theme.spacing.sm}`};
  padding: ${({ theme }) => `0px ${theme.spacing.sm}`};
`;

const FavouritesHeader = styled.div`
  width: fit-content;
  height: 100%;
  text-align: center;
  align-items: middle;
  cursor: pointer;
  display: flex;
  margin: 0px 4px;
`;
const FavouritesSavedItems = styled.span`
  width: 100%;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.ll};
  margin: auto;
  text-align: center;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.lm};
    line-height: 0.9;
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
