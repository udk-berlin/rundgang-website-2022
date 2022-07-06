import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useStores } from "@/stores/index";
import LocalizedText from "modules/i18n/components/LocalizedText";
import { jsPDF } from "jspdf";
import FavouritePrintout from "./FavouritePrintout";

const DownloadPdf = styled.div`
  z-index: -1;
  position: absolute;
  display: none;
`;

const DownloadButton = styled.button`
  cursor: pointer;
  color: black;
  height: fit-content;
  border: 2px solid black;
  font-family: "Diatype", sans-serif;
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

const Download = () => {
  const { uiStore } = useStores();

  const downloadImage = () => {
    var doc = new jsPDF();
    var source = window.document.getElementById("favouriteprintout");
    console.log(source);
    doc.html(source, {
      callback: function (doc) {
        doc.save("rundgangudk2022.pdf");
      },
      x: 10,
      y: 10,
      width: 100,
      windowWidth: 500,
    });
  };

  return (
    uiStore.numberSavedItems > 0 && (
      <>
        <DownloadPdf>
          <FavouritePrintout
            savedItems={uiStore.savedItems}
            filteredEvents={uiStore.savedEvents}
            houseInfo={uiStore.houseInfo}
          />
        </DownloadPdf>
        <DownloadButton onClick={() => downloadImage()}>
          <LocalizedText id="download" />
        </DownloadButton>
      </>
    )
  );
};

export default observer(Download);
