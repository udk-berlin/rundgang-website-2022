import React, { useEffect, useState } from "react";
import _ from "lodash";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useStores } from "@/stores/index";
import Layout from "@/components/simple/Layout";
import { makeUrlFromId } from "@/utils/idUtils";
import LocalizedLink from "modules/i18n/components/LocalizedLink";

const ItemViewWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  flex-grow: 1;
`;

const renderContent = item => {
  if (item.type == "heading") {
    return <h3>{item.content}</h3>;
  } else if (item.type == "text") {
    return <div>{item.content}</div>;
  } else if (item.type == "image") {
    return <img src={item.content} />;
  }
};

const ItemView = () => {
  const { query, locale } = useRouter();
  const { dataStore, uiStore } = useStores();
  const item = dataStore.api.currentRoot;
  const loc = item.description[locale.toUpperCase()]?.length
    ? locale.toUpperCase()
    : "default";
  return item ? (
    <Layout growing={1} direction="right">
      <ItemViewWrapper>
        <div>Name: {item.name}</div>
        <div>short description: {item.description[loc]}</div>
        <div>
          thumbnail/title image:
          <img src={item.thumbnail} />
        </div>
        <div>
          {item.rendered.languages?.default &&
            _.entries(item.rendered.languages[loc].content).map(([k, c]) => (
              <div>{renderContent(c)}</div>
            ))}
        </div>
      </ItemViewWrapper>
    </Layout>
  ) : null;
};

export default observer(ItemView);
