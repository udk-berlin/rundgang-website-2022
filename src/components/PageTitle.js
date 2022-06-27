import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import { useStores } from "@/stores/index";
import LocalizedText from "modules/i18n/components/LocalizedText";
import Stretch from "@/components/simple/Stretch";
import useWindowSize from "@/utils/useWindowSize";
import { SEARCHBAR_HEIGHT, TITLE_HEIGHT } from "@/utils/constants";

const PageTitleWrapper = styled.div`
  width: 100%;
  height: ${TITLE_HEIGHT}px;
  font-family: "Diatype";
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
`;

const BackRouting = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
  }
`;

const splitLongTitles = (title, titleId) => {
  if (titleId == "rundgang") {
    return [title];
  }
  var words = title.split(/[\s]+/);
  var newtext = [words[0]];
  for (let i = 1; i < words.length; i++) {
    if (newtext[newtext.length - 1].length <= 45) {
      newtext[newtext.length - 1] += " " + words[i];
    } else {
      newtext.push(words[i]);
    }
  }
  if (newtext.length > 2) {
    newtext[1] += "...";
    newtext = newtext.slice(0, 2);
  }
  return newtext;
};

const PageTitle = () => {
  const { uiStore, dataStore } = useStores();
  const intl = useIntl();
  const router = useRouter();

  const size = useWindowSize();
  const isMobile = useMemo(() => size.width < 786, [size]);

  const titleStrings = useMemo(() => {
    if (uiStore.title) {
      return isMobile
        ? splitLongTitles(
            intl.formatMessage({ id: uiStore.title }),
            uiStore.title,
          )
        : intl.formatMessage({ id: uiStore.title });
    }
    return [];
  }, [isMobile, uiStore.title, router.locale]);

  const handleBack = () => {
    let link = router.pathname;
    if (router.pathname.includes("[pid]")) {
      if (
        uiStore.selectedRoom &&
        uiStore.currentContext.template == "location-building"
      ) {
        uiStore.setSelectedRoom(null);
        uiStore.setTitle(`Etage ${uiStore.floorLevel}`);
      } else if (
        uiStore.floorLevel &&
        uiStore.currentContext.template == "location-building"
      ) {
        uiStore.setSelectedRoom(null);
        uiStore.setFloorLevel(null);
        uiStore.setTitle(uiStore.currentContext?.name);
        link = link.replace("[pid]", "");
      } else {
        uiStore.setSelectedRoom(null);
        uiStore.setFloorLevel(null);
        link = link.replace("[pid]", "");
        router.replace(link);
      }
    } else {
      router.replace("/");
      uiStore.setTitle(dataStore.api.root.name, dataStore.api.root.id);
    }
  };

  return (
    <PageTitleWrapper>
      {uiStore.title && (
        <BackRouting onClick={() => handleBack()}>
          {isMobile && titleStrings?.length > 1 ? (
            titleStrings.map((line, i) => (
              <Stretch
                titleId={`${uiStore.title}-${i}-${router.locale}`}
                key={`${uiStore.title}-line-${i}`}
                lineh={1}
                preferredSize={4.9}
                isMobile={true}
                arrowDir={
                  uiStore.title !== "rundgang" && i == 0 ? "left" : null
                }
              >
                {line}
              </Stretch>
            ))
          ) : (
            <Stretch
              titleId={`${uiStore.title}-${router.locale}`}
              key={`${uiStore.title}_title`}
              lineh={0.9}
              preferredSize={10}
              isMobile={isMobile}
              arrowDir={uiStore.title !== "rundgang" ? "left" : null}
            >
              <LocalizedText id={uiStore.title} />
            </Stretch>
          )}
        </BackRouting>
      )}
    </PageTitleWrapper>
  );
};

export default observer(PageTitle);
