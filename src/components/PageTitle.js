import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import { useStores } from "@/stores/index";
import LocalizedText from "modules/i18n/components/LocalizedText";
import Stretch from "@/components/simple/Stretch";
import useWindowSize from "@/utils/useWindowSize";

const PageTitleWrapper = styled.div`
  width: 100%;
  font-family: "Diatype";
  height: fit-content;
  background-color: ${({ theme }) => theme.colors.white};
`;

const BackRouting = styled.span`
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
    if (newtext[newtext.length - 1].length <= 50) {
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
  const { uiStore } = useStores();
  const intl = useIntl();
  const router = useRouter();

  const size = useWindowSize();
  const isMobile = useMemo(() => size.width < 786, [size]);

  const titleStrings = useMemo(
    () =>
      isMobile
        ? splitLongTitles(
            intl.formatMessage({ id: uiStore.title }),
            uiStore.title,
          )
        : intl.formatMessage({ id: uiStore.title }),
    [isMobile, uiStore.title, router.locale],
  );

  const handleBack = () => {
    let link = router.pathname;
    if (router.pathname.includes("[pid]")) {
      if (uiStore.selectedRoom) {
        uiStore.setSelectedRoom(null);
      } else if (uiStore.floorLevel) {
        uiStore.setFloorLevel(null);
      } else {
        link = link.replace("[pid]", "");
      }
      router.replace(link);
    } else {
      router.replace("/");
    }
  };

  return (
    <PageTitleWrapper>
      <AnimatePresence initial={true}>
        {isMobile && titleStrings?.length > 1 ? (
          titleStrings.map((line, i) => (
            <BackRouting onClick={() => handleBack()}>
              <Stretch
                titleId={`${uiStore.title}-${i}-${router.locale}`}
                key={`${uiStore.title}-line-${i}`}
                lineh={1.2}
                preferredSize={5}
                arrowDir={
                  uiStore.title !== "rundgang" && i == 0 ? "left" : null
                }
              >
                {line}
              </Stretch>
            </BackRouting>
          ))
        ) : (
          <BackRouting onClick={() => handleBack()}>
            <Stretch
              titleId={`${uiStore.title}-${router.locale}`}
              key={`${uiStore.title}_title`}
              lineh={1.2}
              preferredSize={11}
              arrowDir={uiStore.title !== "rundgang" ? "left" : null}
            >
              <LocalizedText id={uiStore.title} />
            </Stretch>
          </BackRouting>
        )}
      </AnimatePresence>
    </PageTitleWrapper>
  );
};

export default observer(PageTitle);
