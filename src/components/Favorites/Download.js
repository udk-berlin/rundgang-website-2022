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
    let width = source.innerWidth;
    doc.html(source, {
      callback: function (doc) {
        doc.save("rundgangudk2022.pdf");
      },
      x: 10,
      y: 10,
      width: 100,
      windowWidth: 600,
    });
    return null;
    if (uiStore.numberSavedItems > 0) {
      //const dataURL = ref.current.toDataURL({ pixelRatio: 2 });
      if (numPages == 1) {
        const pdf = new jsPDF("p", "px", [
          ref.current.width(),
          ref.current.height(),
        ]);
        pdf.addImage(
          ref.current.toDataURL({ pixelRatio: 2 }),
          "png",
          0,
          0,
          ref.current.width(),
          ref.current.height(),
        );

        pdf.save("rundgangudk2022.pdf");
      } else {
        const doc = new jsPDF("p", "mm", [2480 / 4, 3508 / 4]);
        const imgData = ref.current.toDataURL({ pixelRatio: 3 });

        var imgWidth = 2480 / 4;
        var pageHeight = 3508 / 4;
        var imgHeight = numPages * (3508 / 4);
        var heightLeft = imgHeight;

        var position = 0;

        doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 10) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        doc.save("rundgangudk2022.pdf");
      }
    }
  };

  return (
    uiStore.numberSavedItems > 0 && (
      <DownloadButton onClick={() => downloadImage()}>
        <LocalizedText id="download" />
        {numPages > 1 ? (
          <DownloadPng>
            <FavouritePrintout
              savedItems={uiStore.savedItems}
              width={2480 / 4}
              pageHeight={3508 / 4}
              height={(numPages ?? 1) * (3508 / 4)}
              numPages={numPages}
              reference={ref}
            />
          </DownloadPng>
        ) : (
          <DownloadPng>
            <FavouritePrintout
              savedItems={uiStore.savedItems}
              width={2480 / 4}
              height={3508 / 4}
              reference={ref}
            />
          </DownloadPng>
        )}
      </DownloadButton>
    )
  );
};

export default observer(Download);
