import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useStores } from "@/stores/index";
import Download from "./Download";
import FavouriteIcon from "@/components/simple/FavouriteIcon";
import { SEARCHBAR_HEIGHT } from "@/utils/constants";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const FavouritesList = dynamic(() => import("./FavouritesList"), {
  suspense: true,
});

const FavouritesWindowWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const FavouritesHeader = styled.div`
  display: flex;
  width: 100%;
  height: ${SEARCHBAR_HEIGHT +4}px;
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

const FavouritesWindow = () => {
  const { uiStore } = useStores();

  return (
    <FavouritesWindowWrapper>
      <FavouritesHeader>
        <FavouritesSavedItems>
          {uiStore.numberSavedItems}
          <FavouriteIcon saved={true} size={0.8} />
        </FavouritesSavedItems>
        <Download />
      </FavouritesHeader>

      <Suspense fallback={`Loading...`}>
        <FavouritesList />
      </Suspense>
    </FavouritesWindowWrapper>
  );
};

export default observer(FavouritesWindow);
