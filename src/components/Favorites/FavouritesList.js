import React, { useRef } from "react";
import styled from "styled-components";
import LocalizedText from "modules/i18n/components/LocalizedText";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { makeUrlFromId } from "@/utils/idUtils";
import { useStores } from "@/stores/index";
import FavouriteItem from "./FavouriteItem";
import Download from "./Download";
import FavouriteIcon from "@/components/simple/FavouriteIcon";
import { SEARCHBAR_HEIGHT } from "@/utils/constants";

const FavouritesListWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
const Favourites = styled.div`
  padding-bottom: ${({ theme }) => theme.space(8)};
  border-top: 3px solid black;
`;
const FavouritesTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  padding: ${({ theme }) => theme.space(8)};
`;

const FavouritesHeader = styled.div`
  display: flex;
  width: 100%;
  height: ${SEARCHBAR_HEIGHT * 2}px;
  justify-content: space-between;
  cursor: pointer;
`;

const FavouritesSavedItems = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  flex-grow: 1;
  margin: auto;
  padding: ${({ theme }) => `0 ${theme.space(8)}`};
  font-size: ${({ theme }) => theme.fontSizes.lg};

  @media ${({ theme }) => theme.breakpoints.mobileM} {
    font-size: ${({ theme }) => theme.fontSizes.lm};
  }
`;

const CloseButton = styled.div`
  position: relative;
  right: 0;
  top: 0;
  font-family: "Diatype";
  border: none;
  width: fit-content;
  padding: ${({ theme }) => theme.space(8)};
  cursor: pointer;
  font-size: 70px;
  text-align: right;
  font-family: "Inter";
  line-height: 1;
  transform: scaleY(0.7);
  @media ${({ theme }) => theme.breakpoints.mobileM} {
    font-size: 60px;
  }
`;

const FavouritesList = ({ onClose }) => {
  const { uiStore } = useStores();
  const router = useRouter();

  const handleClick = id => {
    let link = router.pathname;
    let pid = makeUrlFromId(id);
    if (router.pathname == "/") {
      link = `katalog/${pid}`;
    } else if (router.pathname.includes("[pid]")) {
      link = link.replace("[pid]", pid);
    } else {
      link = `${router.pathname}/${pid}`;
    }
    router.replace(link);
  };
  return (
    <FavouritesListWrapper>
      <FavouritesHeader>
        <FavouritesSavedItems>
          {uiStore.numberSavedItems}
          <FavouriteIcon saved={true} size={0.8} />
        </FavouritesSavedItems>
        <Download />
        <CloseButton onClick={onClose}>&#x2715;</CloseButton>
      </FavouritesHeader>
      {uiStore.savedItems.length > 0 ? (
        <>
          <Favourites>
            <FavouritesTitle>
              <LocalizedText id="projects" />
            </FavouritesTitle>
            {uiStore.savedItems
              .filter(
                item =>
                  item.template == "studentproject" ||
                  item.template == "project",
              )
              .map(item => (
                <FavouriteItem
                  key={item.id}
                  element={item}
                  handleClick={handleClick}
                />
              ))}
          </Favourites>
          <Favourites>
            <FavouritesTitle>
              <LocalizedText id="events" />
            </FavouritesTitle>
            {uiStore.savedItems
              .filter(item => item.template == "event")
              .map(item => (
                <FavouriteItem
                  key={item.id}
                  element={item}
                  handleClick={handleClick}
                />
              ))}
          </Favourites>
        </>
      ) : (
        <FavouritesTitle>
          <LocalizedText id="nosaved" />
        </FavouritesTitle>
      )}
    </FavouritesListWrapper>
  );
};

export default observer(FavouritesList);
