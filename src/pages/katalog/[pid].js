import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useStores } from "@/stores/index";
import Layout from "@/components/simple/Layout";
import { makeUrlFromId } from "@/utils/idUtils";
import LocalizedLink from "modules/i18n/components/LocalizedLink";
import ListView from "@/components/ListView";
import ItemView from "@/components/ItemView";

const KatalogViewWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  flex-grow: 1;
`;

const ChildName = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

const KatalogView = () => {
  const router = useRouter();
  const { dataStore, uiStore } = useStores();
  const { pid } = router.query;

  return dataStore.api.currentRoot ? (
    <Layout growing={1} direction="right">
      <KatalogViewWrapper>
        <div>
          {uiStore.items?.map(child => (
            <ChildName key={child.id}>
              <LocalizedLink to={`/katalog/${makeUrlFromId(child.id)}`}>
                {child.name}
              </LocalizedLink>
            </ChildName>
          ))}
        </div>
        {dataStore.api.currentRoot.type == "item" && <ItemView />}
        {uiStore.items?.length && <ListView />}
      </KatalogViewWrapper>
    </Layout>
  ) : null;
};

export default observer(KatalogView);
