import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useStores } from "@/stores/index";
import ListItem from "./ListItem";
import LocalizedText from "modules/i18n/components/LocalizedText";

const ListViewWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 160px);
  position: relative;
  display: grid;
  justify-content: space-evenly;
  padding-bottom: ${({ theme }) => theme.space(40)};
  margin: auto;
  gap: 16px 16px;
  ${({ numCol }) => {
    if (numCol == 2) {
      return {
        gridTemplateColumns: "1fr 1fr",
      };
    }
    return {
      gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    };
  }}
  @media ${({ theme }) => theme.breakpoints.tablet} {
    grid-template-columns: 1fr 1fr;
  }
  margin-bottom: ${({ theme }) => theme.space(48)};
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
`;

const NoItems = styled.div`
  margin: auto;
  width: fit-content;
  height: calc(100vh - 130px);
  line-height: 100px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.md};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const ListView = ({ numCol }) => {
  const { uiStore } = useStores();
  return uiStore.items && uiStore.items.length > 0 ? (
    <ListViewWrapper numCol={numCol}>
      {uiStore.items.map(item => (
        <ListItem numCol={numCol} key={item.id} element={item} />
      ))}
    </ListViewWrapper>
  ) : (
    <NoItems>
      <LocalizedText id="noitems" />
    </NoItems>
  );
};

export default observer(ListView);
