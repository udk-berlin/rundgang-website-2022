import React, { useMemo } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import { useStores } from "@/stores/index";
import Stretch from "@/components/simple/Stretch/index";
import useMediaQuery from "@/utils/useMediaQuery";
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
  return [s1, s2];
};

const PageTitle = () => {
  const { uiStore, dataStore } = useStores();
  const intl = useIntl();
  const router = useRouter();

  const isMobile = useMediaQuery(
    "only screen and (max-width:768px) and (orientation:portrait)",
  );

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
      uiStore.setSelectedRoom(null);
      uiStore.setFloorLevel(null);
      link = link.replace("[pid]", "");
      router.replace(link);
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
              preferredSize={"40px"}
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
            preferredSize={"80px"}
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
