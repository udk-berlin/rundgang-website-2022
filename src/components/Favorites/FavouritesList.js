import React, { useRef } from "react";
import styled from "styled-components";
import LocalizedText from "modules/i18n/components/LocalizedText";
import { observer } from "mobx-react";
import { useStores } from "@/stores/index";
import FavouriteItem from "./FavouriteItem";
import FavouriteIcon from "@/components/simple/FavouriteIcon";
import dynamic from "next/dynamic";
import { SEARCHBAR_HEIGHT } from "@/utils/constants";
const FavouritePrintout = dynamic(() => import("./FavouritePrintout"), {
  ssr: false,
});

const FavouritesListWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const DownloadButton = styled.button`
  cursor: pointer;
  height: fit-content;
  border: 2px solid black;
  margin: auto;
  margin-right: 8px;
  border-radius: ${({ theme }) => theme.space(32)};
  background: ${({ theme }) => theme.colors.highlight};
  font-size: ${({ theme }) => theme.fontSizes.lm};
  padding: ${({ theme }) => `${theme.space(4)} ${theme.space(16)}`};
  &:hover {
    background: ${({ theme }) => theme.colors.lightgrey};
  }
`;
const Favourites = styled.div`
  padding-bottom: ${({ theme }) => theme.space(8)};
  border-top: 3px inset black;
`;
const FavouritesTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  padding: ${({ theme }) => theme.space(8)};
`;

const DownloadPng = styled.div`
  display: none;
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
  font-weight: bold;
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
  const ref = useRef();

  function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
  }

  const downloadImage = () => {
    const dataURL = ref.current.toDataURL({ pixelRatio: 2 });
    downloadURI(dataURL, "rundgangudk2022.png");
  };
  return (
    <FavouritesListWrapper>
      <FavouritesHeader>
        <FavouritesSavedItems>
          {uiStore.numberSavedItems}
          <FavouriteIcon saved={true} size={0.8} />
        </FavouritesSavedItems>
        <DownloadButton onClick={() => downloadImage()}>
          <LocalizedText id="download" />
        </DownloadButton>
      </FavouritesHeader>
      {uiStore.savedItems.length > 0 ? (
        <>
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
        </>
      ) : (
        "no events or projects saved yet"
      )}
      <CloseButton onClick={onClose}>&#57344;</CloseButton>
    </FavouritesListWrapper>
  );
};

export default observer(FavouritesList);
