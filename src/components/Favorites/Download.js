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
  font-size: ${({ theme }) => theme.fontSizes.mm};
  padding: ${({ theme }) => `${theme.space(2)} ${theme.space(8)}`};
  &:hover {
    background: ${({ theme }) => theme.colors.lightgrey};
  }
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const Download = () => {
  const { uiStore } = useStores();
  const [processDownload, setProcessDownload] = useState(false);

  const downloadImage = (id, name) => {
    var doc = new jsPDF();
    var source = window.document.getElementById(id);
    if (source) {
      doc.html(source, {
        callback: function (doc) {
          doc.save(name);
          setProcessDownload(false);
        },
        x: 10,
        y: 10,
        width: 100,
        windowWidth: 500,
        autoPaging: "text",
        fontFace: [new FontFace("Diatype", "/fonts/EduDiatype-Regular.woff2")],
      });
    } else {
      setProcessDownload(false);
    }
  };

  const handleDownload = (id, name) => {
    setProcessDownload(id);
    const timer = setTimeout(() => {
      downloadImage(id, name);
    }, 1000);
    return timer;
  };
  const events = uiStore.savedItems.filter(item => item.template == "event");

  return (
    uiStore.numberSavedItems > 0 && (
      <>
        {processDownload ? (
          <DownloadPdf>
            <FavouritePrintout
              savedItems={uiStore.savedItems}
              filteredEvents={uiStore.savedEvents}
              houseInfo={uiStore.houseInfo}
            />
            <FavouritePrintoutTime filteredEvents={uiStore.savedEvents} />
          </DownloadPdf>
        ) : null}
        <DownloadButton
          onClick={() =>
            handleDownload("favouriteprintoutlist", "rundgangudk2022.pdf")
          }
        >
          {processDownload == "favouriteprintoutlist" ? (
            <LocalizedText id="downloading" />
          ) : (
            <LocalizedText id="download" />
          )}
        </DownloadButton>
        {Boolean(Object.keys(uiStore.savedEvents).length ) ? (
          <DownloadButton
            onClick={() =>
              handleDownload(
                "favouriteprintouttimetable",
                "rundgangudk2022_timetable.pdf",
              )
            }
          >
            {processDownload == "favouriteprintouttimetable" ? (
              <LocalizedText id="downloading" />
            ) : (
              <LocalizedText id="downloadtimetable" />
            )}
          </DownloadButton>
        ) : null}
      </>
    )
  );
};

export default observer(Download);
