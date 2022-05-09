import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useStores } from "@/stores/index";
import LocalizedLink from "modules/i18n/components/LocalizedLink";

const ProjectListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: ${({ theme }) => theme.spacing.xl};
  width: 100%;
`;

const LinkWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const makeLinkId = node => {
  if (!node) return "";
  let [id] = node.id.split(":");
  return encodeURI(id.replace("!", ""));
};

const ProjectList = () => {
  const { dataStore, uiStore } = useStores();
  return (
    <ProjectListContainer>
      <LocalizedLink to={`/katalog/${makeLinkId(dataStore.api.root)}`}>
        PROJEKT LINK
      </LocalizedLink>
    </ProjectListContainer>
  );
};

export default observer(ProjectList);
