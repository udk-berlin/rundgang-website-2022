import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useStores } from "@/stores/index";
import ListItem from "./ListItem";

const ListViewWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  justify-content: space-evenly;
  margin: auto;
  ${({ numCol }) => {
    if (numCol == 2) {
      return {
        gridTemplateColumns: "50% 50%",
      };
    }
    return {
      gridTemplateColumns: "20% 20% 20% 20% 20%",
    };
  }}
  @media ${({ theme }) => theme.breakpoints.tablet} {
    grid-template-columns: 50% 50%;
  }
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
`;

const ListView = ({ numCol }) => {
  const { uiStore } = useStores();
  return (
    <ListViewWrapper numCol={numCol}>
      {uiStore.items && uiStore.items.length > 1
        ? uiStore.items.map(item => <ListItem key={item.id} element={item} />)
        : null}
    </ListViewWrapper>
  );
};

export default observer(ListView);
