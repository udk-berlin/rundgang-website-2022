import React from "react";
import styled from "styled-components";
import { useStores } from "@/stores/index";
import { observer } from "mobx-react";
import FavouriteStarSvg from "./FavouriteStar";

const FavouritesWrapper = styled.div`
  width: 5vw;
  min-width: 40px;
  height: 5vh;
  border: ${({ theme }) => `4px solid ${theme.colors.primary}`};
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  margin: ${({ theme }) => `0 ${theme.spacing.md}`};
  @media ${({ theme }) => theme.breakpoints.md} {
    margin: ${({ theme }) => `0 ${theme.spacing.xs}`};
  }
`;
const FavouritesSavedItems = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  font-size: 30px;
`;

const Favourites = () => {
  const { uiStore } = useStores();

  return (
    <FavouritesWrapper>
      <FavouritesSavedItems>{uiStore.numberSavedItems}</FavouritesSavedItems>
      <FavouriteStarSvg />
    </FavouritesWrapper>
  );
};

export default observer(Favourites);
