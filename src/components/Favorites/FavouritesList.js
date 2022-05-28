import React from "react";
import styled from "styled-components";
import LocalizedText from "modules/i18n/components/LocalizedText";
import { observer } from "mobx-react";
import { useStores } from "@/stores/index";
import FavouriteItem from "./FavouriteItem";
import { favData } from "./favData";

const FavouritesListWrapper = styled.div``;

const DownloadButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  overflow: auto;
  border: ${({ theme }) => `3px solid ${theme.colors.highlight}`};
  background: ${({ theme }) => theme.colors.highlight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: ${({ theme }) => theme.spacing.sm};
`;
const Favourites = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding: ${({ theme }) => `0 ${theme.spacing.xs}`};
  }
`;
const FavouritesTitle = styled.div`
  padding-top: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.mm};
`;

const FavouritesList = () => {
  const { uiStore } = useStores();
  console.log(uiStore.savedItems);
  return (
    <FavouritesListWrapper>
      {uiStore.savedItems.length > 0 ? (
        <>
          <DownloadButton>
            <LocalizedText id="download" />
          </DownloadButton>
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
        "no events or projects saved yet"
      )}
    </FavouritesListWrapper>
  );
};

export default observer(FavouritesList);
