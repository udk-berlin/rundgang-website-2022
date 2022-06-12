import React, { useRef } from "react";
import styled from "styled-components";
import LocalizedText from "modules/i18n/components/LocalizedText";
import { observer } from "mobx-react";
import { useStores } from "@/stores/index";
import FavouriteItem from "./FavouriteItem";
import dynamic from "next/dynamic";
const FavouritePrintout = dynamic(() => import("./FavouritePrintout"), {
  ssr: false,
});

const FavouritesListWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const DownloadButton = styled.button`
  position: sticky;
  top: ${({ theme }) => theme.spacing.sm};
  left: 90%;
  cursor: pointer;
  border: none;
  background: ${({ theme }) => theme.colors.highlight};
  font-size: ${({ theme }) => theme.fontSizes.mm};
  padding: ${({ theme }) => theme.spacing.sm};
  &:hover {
    background: ${({ theme }) => theme.colors.lightgrey};
  }
`;
const Favourites = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding: ${({ theme }) => `0 ${theme.spacing.xs}`};
  }
`;
const FavouritesTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const DownloadPng = styled.div`
  display: none;
`;

const FavouritesList = () => {
  const { uiStore } = useStores();
  const ref = useRef();

  function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
  }

  const downloadImage = () => {
    const dataURL = ref.current.toDataURL({ pixelRatio: 2 });
    console.log("download");
    downloadURI(dataURL, "rundgangudk2022.png");
  };
  return (
    <>
      {uiStore.savedItems.length > 0 ? (
        <FavouritesListWrapper>
          <DownloadButton onClick={() => downloadImage()}>
            <LocalizedText id="download" />
          </DownloadButton>
          <DownloadPng>
            <FavouritePrintout
              savedItems={uiStore.savedItems}
              savedEvents={uiStore.savedEvents}
              width={1800}
              height={1000}
              reference={ref}
            />
          </DownloadPng>
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
        </FavouritesListWrapper>
      ) : (
        "no events or projects saved yet"
      )}
    </>
  );
};

export default observer(FavouritesList);
