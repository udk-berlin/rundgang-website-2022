import React, { useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useStores } from "@/stores/index";
import LocalizedText from "modules/i18n/components/LocalizedText";
import { jsPDF } from "jspdf";
import dynamic from "next/dynamic";
const FavouritePrintout = dynamic(() => import("./FavouritePrintout"), {
  loading: () => <div></div>,
});
const FavouritePrintoutTime = dynamic(() => import("./FavouritePrintoutTime"), {
  loading: () => <div></div>,
});

const DownloadPdf = styled.div`
  z-index: -1;
  position: fixed;
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
  const [processDownload, setProcessDownload] = useState(false);

  const downloadImage = () => {
    var doc = new jsPDF();
    var source = window.document.getElementById("favouriteprintoutlist");
    if (source) {
      doc.html(source, {
        callback: function (doc) {
          doc.save("rundgangudk2022.pdf");
          setProcessDownload(false);
        },
        x: 10,
        y: 10,
        width: 100,
        windowWidth: 500,
        autoPaging: "text",
        fontFace: [new FontFace("Diatype", "/fonts/EduDiatype-Regular.woff2")],
      });
      if (
        uiStore.savedItems.filter(item => item.template == "event").length >
          1 &&
        window.document.getElementById("favouriteprintouttimetable") !==
          undefined
      ) {
        var table = new jsPDF();
        var source = window.document.getElementById(
          "favouriteprintouttimetable",
        );

        table.html(source, {
          callback: function (doc) {
            doc.save("rundgangudk2022_timetable.pdf");
            setProcessDownload(false);
          },
          x: 10,
          y: 10,
          width: 100,
          windowWidth: 500,
          autoPaging: "text",
          fontFace: [
            new FontFace("Diatype", "/fonts/EduDiatype-Regular.woff2"),
          ],
        });
      }
    } else {
      setProcessDownload(false)
    }
  };

  const handleDownload = () => {
    setProcessDownload(true);
    const timer = setTimeout(() => {
      downloadImage();
    }, 1000);
    return timer;
  };

  return (
    uiStore.numberSavedItems > 0 && (
      <>
        {processDownload ? (
          <DownloadPdf>
            <div id="favouriteprintout">
              <FavouritePrintout
                savedItems={uiStore.savedItems}
                filteredEvents={uiStore.savedEvents}
                houseInfo={uiStore.houseInfo}
              />
              <FavouritePrintoutTime filteredEvents={uiStore.savedEvents} />
            </div>
          </DownloadPdf>
        ) : null}
        <DownloadButton onClick={() => handleDownload()}>
          {processDownload ? (
            <LocalizedText id="downloading" />
          ) : (
            <LocalizedText id="download" />
          )}
        </DownloadButton>
      </>
    )
  );
};

export default observer(Download);
