import React from "react";
import styled from "styled-components";
import { useStores } from "@/stores/index";
import { observer } from "mobx-react";
import FavouriteStarSvg from "./FavouriteStar";

const FavouritesWrapper = styled.div`
  width: 5vw;
  min-width: 40px;
  height: 2vw;
  background: ${({ theme }) => theme.background.secondary};
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  margin-right: 16px;
  padding: 8px;
`;
const FavouritesSavedItems = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  font-size: 24px;
  transform: scaleY(2);
  transform-origin: 12px 10px;
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
