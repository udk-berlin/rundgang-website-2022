import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import { useStores } from "@/stores/index";
import LocalizedText from "modules/i18n/components/LocalizedText";
import Stretch from "@/components/simple/Stretch/index";
import useWindowSize from "@/utils/useWindowSize";
import { SEARCHBAR_HEIGHT, TITLE_HEIGHT } from "@/utils/constants";

const PageTitleWrapper = styled.div`
  width: 100%;
  height: ${TITLE_HEIGHT}px;
  font-family: "Diatype";
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
`;

const splitLongTitles = (s, titleId) => {
  if (!s.includes(" ") || s.length < 20) {
    return [s];
  }
  if (titleId == "rundgang") {
    return [s];
  }
  var middle = Math.floor(s.length / 2);
  var before = s.lastIndexOf(" ", middle);
  var after = s.indexOf(" ", middle + 1);

  if (middle - before < after - middle) {
    middle = before;
  } else {
    middle = after;
  }

  var s1 = s.substr(0, middle);
  var s2 = s.substr(middle + 1);
  console.log([s1, s2]);
  return [s1, s2];
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
    console.log("handlebacj");
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
    uiStore.title && (
      <PageTitleWrapper>
        {isMobile && titleStrings?.length > 1 ? (
          titleStrings.map((line, i) => (
            <Stretch
              handleClick={handleBack}
              titleId={`${uiStore.title}-${i}-${router.locale}`}
              key={`${uiStore.title}-line-${i}`}
              lineh={1}
              preferredSize={4.9}
              arrowDir={uiStore.title !== "rundgang" && i == 0 ? "left" : null}
            >
              {line}
            </Stretch>
          ))
        ) : (
          <Stretch
            handleClick={handleBack}
            titleId={`${uiStore.title}-${router.locale}`}
            key={`${uiStore.title}_title`}
            lineh={0.9}
            preferredSize={10}
            arrowDir={uiStore.title !== "rundgang" ? "left" : null}
          >
            {titleStrings}
          </Stretch>
        )}
      </PageTitleWrapper>
    )
  );
};

export default observer(PageTitle);
