import React from "react";
import styled from "styled-components";
import LocalizedText from "modules/i18n/components/LocalizedText";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { makeUrlFromId } from "@/utils/idUtils";
import { useStores } from "@/stores/index";
import FavouriteItem from "./FavouriteItem";

const Favourites = styled.div`
  padding-bottom: ${({ theme }) => theme.space(8)};
  border-top: 3px solid black;
`;
const FavouritesTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  padding: ${({ theme }) => theme.space(8)};
`;

const FavouritesList = () => {
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

  const handleUnsave = (e, id) => uiStore.addToSaved(e, id);

  return uiStore.savedItems.length > 0 ? (
    <>
      <Favourites>
        <FavouritesTitle>
          <LocalizedText id="projects" />
        </FavouritesTitle>
        {uiStore.savedItems
          .filter(
            item =>
              item.template == "studentproject" || item.template == "project",
          )
          .map(item => (
            <FavouriteItem
              key={item.id}
              element={item}
              handleUnsave={handleUnsave}
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
              handleUnsave={handleUnsave}
              handleClick={handleClick}
            />
          ))}
      </Favourites>
    </>
  ) : (
    <FavouritesTitle>
      <LocalizedText id="nosaved" />
    </FavouritesTitle>
  );
};

export default observer(FavouritesList);
