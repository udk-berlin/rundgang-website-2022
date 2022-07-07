import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useStores } from "@/stores/index";
import ListItem from "./ListItem";
import LocalizedText from "modules/i18n/components/LocalizedText";
import { useRouter } from "next/router";

const ListViewWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 160px);
  position: relative;
  display: grid;
  justify-content: space-evenly;
  padding-bottom: ${({ theme }) => theme.space(40)};
  gap: 16px 16px;
  ${({ numCol }) => {
    if (numCol == 2) {
      return {
        gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
      };
    }
    return {
      gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    };
  }}
  @media ${({ theme }) => theme.breakpoints.tablet} {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    row-gap: 16px;
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
  width: inherit;
  height: calc(100vh - 130px);
  line-height: 100px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.md};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const DescriptionText = styled.div`
  grid-column: span 2;
  padding-top: 16px;
  font-size: 24px;
`;

const getDescription = (d, loc) => {
  let desc = d?.default ?? null;
  if (loc.toUpperCase() in d) {
    desc = d[loc.toUpperCase()];
  }
  return desc;
};

const ListView = ({ numCol }) => {
  const { uiStore } = useStores();
  const { locale } = useRouter();
  const description = getDescription(
    uiStore.currentContext?.description,
    locale,
  );
  return uiStore.items && uiStore.items.length > 0 ? (
    <ListViewWrapper numCol={numCol}>
      { description ? (
        <DescriptionText>
          {description}
        </DescriptionText>
      ) : null}
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
