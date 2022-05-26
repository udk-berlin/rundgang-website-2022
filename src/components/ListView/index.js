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
  grid-gap: ${({ theme }) => theme.spacing.md};
  ${({ numCol }) => {
    if (numCol == 2) {
      return {
        gridTemplateColumns: "49% 49%",
      };
    }
    return {
      gridTemplateColumns: "19% 19% 19% 19% 19%",
    };
  }}
  @media ${({ theme }) => theme.breakpoints.tablet} {
    grid-template-columns: 49% 49%;
  }
`;

const ListView = ({ numCol }) => {
  const { uiStore } = useStores();
  return (
    <ListViewWrapper numCol={numCol}>
      {uiStore.items && uiStore.items.length
        ? testListData.map(item => <ListItem element={item} />)
        : null}
    </ListViewWrapper>
  );
};

export default ListView;
