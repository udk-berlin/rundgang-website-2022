import React, { useEffect, useState } from "react";
import _ from "lodash";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useStores } from "@/stores/index";
import { useIntl } from "react-intl";
import Layout from "@/components/simple/Layout";
import {
  Paragraph,
  Heading,
  Image,
  Audio,
  Code,
  Quote,
  OrderedList,
  UnorderedList,
} from "./textElements";
import Tag from "@/components/simple/Tag";
import LocalizedText from "modules/i18n/components/LocalizedText";
import FavouriteStarSvg from "@/components/simple/FavouriteStar";

const ItemViewWrapper = styled.div`
  overflow-x: hidden;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  flex-grow: 1;
`;

const ItemHeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
  width: 100%;
  margin: auto;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    display: block;
  }
`;

const TitleImage = styled.img`
  width: 100%;
  margin: auto;
`;

const AuthorTag = styled.div`
  margin: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  padding: ${({ theme }) => `${theme.spacing.xxs} ${theme.spacing.xs}`};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  border: 1px solid black;
  border-radius: ${({ theme }) => theme.spacing.md};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const SaveTag = styled.span`
  margin: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background: ${({ theme, saved }) =>
    saved ? theme.colors.black : theme.colors.highlight};
  color: ${({ theme, saved }) =>
    saved ? theme.colors.highlight : theme.colors.black};
  border-radius: ${({ theme }) => theme.spacing.md};
  align-items: baseline;
  text-align: center;
  cursor: pointer;
  justify-content: space-between;
`;

const SaveStar = styled.span`
  margin-left: 4px;
`;

const DescriptionWrapper = styled.div`
  align-self: start;
`;

const TitleText = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  padding: ${({ theme }) => theme.spacing.md};
`;

const ContentWrapper = styled.div`
  display: grid;
  padding-top: ${({ theme }) => theme.spacing.xl};
  grid-template-columns: 40% 40%;
  gap: ${({ theme }) => theme.spacing.xl};
  justify-content: space-evenly;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.md} 0`};
`;

const renderContent = item => {
  if (item.type == "heading") {
    return <Heading>{item.content}</Heading>;
  } else if (item.type == "text") {
    return <Paragraph>{item.content}</Paragraph>;
  } else if (item.type == "image") {
    return <Image src={item.content} />;
  } else if (item.type == "audio") {
    return <Audio src={item.content} />;
  } else if (item.type == "ul") {
    return <UnorderedList>{item.content}</UnorderedList>;
  } else if (item.type == "ol") {
    return <OrderedList>{item.content}</OrderedList>;
  } else if (item.type == "quote") {
    return <Quote>{item.content}</Quote>;
  } else if (item.type == "code") {
    return <Code>{item.content}</Code>;
  }
};

const ItemView = () => {
  const { query, locale } = useRouter();
  const { dataStore, uiStore } = useStores();
  const intl = useIntl();
  const item = dataStore.api.currentRoot;
  const loc = item.description[locale.toUpperCase()]?.length
    ? locale.toUpperCase()
    : "DE";

  console.log(item.rendered.languages[loc].content);

  return item && item?.id ? (
    <Layout direction="right">
      <ItemViewWrapper>
        <Tags>
          <SaveTag
            saved={uiStore.isSaved(item.id)}
            onClick={e => uiStore.addToSaved(e, item.id)}
          >
            {intl.formatMessage({
              id: uiStore.isSaved(item.id) ? "saved" : "save",
            })}
            <SaveStar>
              <FavouriteStarSvg
                size={10}
                saved={true}
                color={uiStore.isSaved(item.id) ? "#E2FF5D" : "null"}
              />
            </SaveStar>
          </SaveTag>
          {item.tags.map(t => (
            <Tag
              selected={false}
              key={t.id}
              levelSelected={false}
              showCross={false}
              template={t.template}
            >
              {t.name}
            </Tag>
          ))}
        </Tags>
        <ItemHeaderWrapper>
          <TitleImage src={item.thumbnail} />
          <DescriptionWrapper>
            {item?.origin?.authors?.map(a => (
              <AuthorTag>{a.name ?? a.id}</AuthorTag>
            ))}
            <TitleText>{item.description[loc]}</TitleText>
          </DescriptionWrapper>
        </ItemHeaderWrapper>
        <ContentWrapper>
          {item.rendered.languages[loc] &&
            _.entries(item.rendered.languages[loc].content).map(([k, c]) =>
              renderContent(c),
            )}
        </ContentWrapper>
      </ItemViewWrapper>
    </Layout>
  ) : null;
};

export default observer(ItemView);
