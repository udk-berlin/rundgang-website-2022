import React, { useRef } from "react";
import styled from "styled-components";
import LocalizedText from "modules/i18n/components/LocalizedText";
import { observer } from "mobx-react";
import { useStores } from "@/stores/index";
import FavouriteItem from "./FavouriteItem";
import Download from "./Download";
import FavouriteIcon from "@/components/simple/FavouriteIcon";
import { SEARCHBAR_HEIGHT } from "@/utils/constants";

const FavouritesListWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
const Favourites = styled.div`
  padding-bottom: ${({ theme }) => theme.space(8)};
  border-top: 3px inset black;
`;
const FavouritesTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  padding: ${({ theme }) => theme.space(8)};
`;

const FavouritesHeader = styled.div`
  display: flex;
  width: 100%;
  height: ${SEARCHBAR_HEIGHT * 2}px;
  justify-content: space-between;
  cursor: pointer;
`;

const FavouritesSavedItems = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  flex-grow: 1;
  margin: auto;
  padding: ${({ theme }) => `0 ${theme.space(8)}`};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const CloseButton = styled.div`
  position: sticky;
  left: 100%;
  bottom: 0px;
  font-family: "Diatype";
  border: none;
  width: fit-content;
  padding: ${({ theme }) => theme.space(8)};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  cursor: pointer;
  font-weight: bold;
  -webkit-text-stroke: 2px white;
  -webkit-text-fill-color: black;
`;

const FavouritesList = ({ onClose }) => {
  const { uiStore } = useStores();
  return (
    <FavouritesListWrapper>
      <FavouritesHeader>
        <FavouritesSavedItems>
          {uiStore.numberSavedItems}
          <FavouriteIcon saved={true} size={0.8} />
        </FavouritesSavedItems>
        <Download />
      </FavouritesHeader>
      {uiStore.savedItems.length > 0 ? (
        <>
          <Favourites>
            <FavouritesTitle>
              <LocalizedText id="projects" />
            </FavouritesTitle>
            {uiStore.savedItems
              .filter(item => item.template == "studentproject")
              .map(item => (
                <FavouriteItem key={item.id} element={item} />
              ))}
          </Favourites>
          <Favourites>
            <FavouritesTitle>
              <LocalizedText id="events" />
            </FavouritesTitle>
            {uiStore.savedItems
              .filter(item => item.template == "event")
              .map(item => (
                <FavouriteItem key={item.id} element={item} />
              ))}
          </Favourites>
        </>
      ) : (
        <FavouritesTitle>
          <LocalizedText id="nosaved" />
        </FavouritesTitle>
      )}
      <CloseButton onClick={onClose}>&#57344;</CloseButton>
    </FavouritesListWrapper>
  );
};

export default observer(FavouritesList);
