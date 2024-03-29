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
  min-height: calc(100vh - 230px);
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
  height: calc(100vh - 230px);
  line-height: 100px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.md};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const DescriptionText = styled.div`
  grid-column: span 5;
  padding-top: 16px;
  font-size: 24px;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    grid-column: span 2;
  }
`;

const getDescription = (d, loc, template) => {
  if (d && template !== "location-room") {
    let desc = d?.default ?? null;
    if (loc.toUpperCase() in d) {
      desc = d[loc.toUpperCase()];
    }
    if (desc && !desc.startsWith("400") && desc !== "udk-berlin") {
      return desc;
    }
  }
  return null;
};

const ListView = ({ numCol }) => {
  const { uiStore } = useStores();
  const { locale } = useRouter();
  const description = getDescription(
    uiStore.currentContext?.description,
    locale,
    uiStore.currentContext?.template,
  );
  return uiStore.items && uiStore.items.length > 0 ? (
    <ListViewWrapper numCol={numCol}>
      {description ? <DescriptionText>{description}</DescriptionText> : null}
      {uiStore.items.map(item => (
        <ListItem numCol={numCol} key={item.id} element={item} />
      ))}
    </ListViewWrapper>
  ) : (
    <NoItems>
      {uiStore.items && uiStore.items.length == 0 ? (
        <LocalizedText id="noitems" />
      ) : (
        <LocalizedText id="loading" />
      )}
    </NoItems>
  );
};

export default observer(ListView);
