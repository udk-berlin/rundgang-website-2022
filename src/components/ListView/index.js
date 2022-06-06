import React from "react";
import styled from "styled-components";
import { useStores } from "@/stores/index";
import { testListData } from "./testListData";
import ListItem from "./ListItem";

const ListViewWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  justify-content: space-evenly;
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
`;

const ListView = ({ numCol }) => {
  const { uiStore } = useStores();
  return (
    <ListViewWrapper numCol={numCol}>
      {uiStore.items && uiStore.items.length > 1
        ? uiStore.items.map(item => <ListItem key={item.id} element={item} />)
        : testListData.map(item => <ListItem key={item.id} element={item} />)}
    </ListViewWrapper>
  );
};

export default ListView;
