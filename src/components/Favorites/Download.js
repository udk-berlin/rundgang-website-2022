import React, { useRef } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useStores } from "@/stores/index";
import LocalizedText from "modules/i18n/components/LocalizedText";
import { jsPDF } from "jspdf";
import dynamic from "next/dynamic";
const FavouritePrintout = dynamic(() => import("./FavouritePrintout"), {
  ssr: false,
});

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

  function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
  }

  const downloadImage = () => {
    if (uiStore.numberSavedItems > 0) {
      //const dataURL = ref.current.toDataURL({ pixelRatio: 2 });
      const pdf = new jsPDF("l", "px", [
        ref.current.width(),
        ref.current.height(),
      ]);
      pdf.addImage(
        ref.current.toDataURL({ pixelRatio: 1 }),
        0,
        0,
        ref.current.width(),
        ref.current.height(),
      );

      pdf.save("rundgangudk2022.pdf");
    }
  };
  return (
    uiStore.numberSavedItems > 0 && (
      <DownloadButton onClick={() => downloadImage()}>
        <LocalizedText id="download" />
        <DownloadPng>
          <FavouritePrintout
            savedItems={uiStore.savedItems}
            savedEvents={uiStore.savedEvents}
            width={2480}
            height={3508}
            reference={ref}
          />
        </DownloadPng>
      </DownloadButton>
    )
  );
};

export default observer(Download);
