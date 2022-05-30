import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import LocalizedLink from "modules/i18n/components/LocalizedLink";
import { useStores } from "@/stores/index";
import { makeUrlFromId } from "@/utils/idUtils";
import ListView from "@/components/ListView";
import ItemView from "@/components/ItemView";

const PlaceWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  flex-grow: 1;
`;

const ChildName = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

const Place = () => {
  const router = useRouter();
  const { dataStore, uiStore } = useStores();

  return dataStore.api.currentRoot ? (
    <PlaceWrapper>
      <div>Name: {dataStore.api.currentRoot.name}</div>
      <div>
        {dataStore.api.currentRoot.context.map(child => (
          <LocalizedLink key={child.id} to={`/orte/${makeUrlFromId(child.id)}`}>
            <ChildName>{child.name}</ChildName>
          </LocalizedLink>
        ))}
      </div>
        {dataStore.api.currentRoot.type == "item" && <ItemView />}
        {uiStore.items?.length && <ListView />}
    </PlaceWrapper>
  ) : null;
};

export default observer(Place);
