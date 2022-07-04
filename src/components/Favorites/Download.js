import React, { useMemo, useRef } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useStores } from "@/stores/index";
import LocalizedText from "modules/i18n/components/LocalizedText";
import { jsPDF } from "jspdf";
import FavouritePrintout from "./FavouritePrintout";

const DownloadPng = styled.div`
  display: none;
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

const Download = () => {
  const { uiStore } = useStores();
  const ref = useRef();
  const numPages = useMemo(
    () => Math.ceil(uiStore.numberSavedItems / 7),
    [uiStore.numberSavedItems],
  );

  const downloadImage = () => {
    var doc = new jsPDF();
    var source = window.document.getElementById("favouriteprintout");
    doc.html(source, {
      callback: function (doc) {
        doc.save("rundgangudk2022.pdf");
      },
      x: 10,
      y: 10,
      width: 100,
      windowWidth: 1000,
    });
  };

  return (
    uiStore.numberSavedItems > 0 && (
      <DownloadButton onClick={() => downloadImage()}>
        <LocalizedText id="download" />
        <DownloadPng>
          <FavouritePrintout
            savedItems={uiStore.savedItems}
            width={2480 / 4}
            height={3508 / 4}
            reference={ref}
          />
        </DownloadPng>
      </DownloadButton>
    )
  );
};

export default observer(Download);
