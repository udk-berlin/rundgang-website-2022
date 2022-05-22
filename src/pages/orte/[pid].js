import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useStores } from "@/stores/index";

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
  const { pid } = router.query;
  const [currentNode, setCurrentNode] = useState();

  useEffect(() => {
    dataStore.api.getIdFromLink(pid);
  }, [pid]);

  useEffect(() => {
    if (pid) {
      setCurrentNode(dataStore.api.currentRoot);
    }
  }, [dataStore.api.currentRoot]);

  return currentNode ? (
    <PlaceWrapper>
      <div>ID: {pid}</div>
      <div>Name: {currentNode.name}</div>
      <div>
        Children:{" "}
        {currentNode.context.map(child => (
          <ChildName key={child.id}>{child.name}</ChildName>
        ))}
      </div>
    </PlaceWrapper>
  ) : null;
};

export default observer(Place);
