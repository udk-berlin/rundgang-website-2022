import React, { useRef } from "react";
import styled from "styled-components";
import LocalizedText from "modules/i18n/components/LocalizedText";
import { observer } from "mobx-react";
import { useStores } from "@/stores/index";
import FavouriteItem from "./FavouriteItem";
import FavouriteIcon from "@/components/simple/FavouriteIcon";
import dynamic from "next/dynamic";
const FavouritePrintout = dynamic(() => import("./FavouritePrintout"), {
  ssr: false,
});

const FavouritesListWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const DownloadButton = styled.button`
  cursor: pointer;
  border: none;
  border-left: 3px solid black;
  background: ${({ theme }) => theme.colors.highlight};
  font-size: ${({ theme }) => theme.fontSizes.lm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  &:hover {
    background: ${({ theme }) => theme.colors.lightgrey};
  }
`;
const Favourites = styled.div`
  border-top: 3px inset black;
`;
const FavouritesTitle = styled.div`
  border-bottom: 3px solid black;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  padding: ${({ theme }) => `0 ${theme.spacing.xs}`};
`;

const DownloadPng = styled.div`
  display: none;
`;

const FavouritesHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  cursor: pointer;
`;

const FavouritesSavedItems = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  margin: auto;
  flex-grow: 1;
  padding: ${({ theme }) => `0 ${theme.spacing.xs}`};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const CloseButton = styled.div`
  position: sticky;
  left: 100%;
  bottom: 0px;
  font-family: "Diatype";
  border: none;
  width: fit-content;
  padding: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  cursor: pointer;
  text-shadow: 8px 8px 10px white, -8px 8px 10px white, 3px -3px 10px white,
    -3px -3px 10px white;
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
    <>
      <FavouritesListWrapper>
        <FavouritesHeader>
          <FavouritesSavedItems>
            <FavouriteIcon saved={true} size={8} />
            {uiStore.numberSavedItems}
          </FavouritesSavedItems>
        </FavouritesHeader>
        {uiStore.savedItems.length > 0 ? (
          <>
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
          </>
        ) : (
          "no events or projects saved yet"
        )}
        <CloseButton onClick={onClose}>&#57344;</CloseButton>
      </FavouritesListWrapper>
    </>
  );
};

export default observer(FavouritesList);
