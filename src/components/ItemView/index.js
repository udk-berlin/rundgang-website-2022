import React, { useEffect, useState } from "react";
import _ from "lodash";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useStores } from "@/stores/index";
import { useIntl } from "react-intl";
import Layout from "@/components/simple/Layout";
import ContentElement from "./ContentElement";
import Tag from "@/components/simple/Tag";
import FavouriteStarSvg from "@/components/simple/FavouriteStar";

const ItemViewWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ItemHeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 55% 45%;
  width: 100%;
  margin: auto;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    display: block;
  }
`;

const TitleImage = styled.img`
  height: min(100%, 50vw);
  margin: auto;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    height: auto;
    width: 100%;
  }
`;

const AuthorTag = styled.div`
  padding: ${({ theme }) => `${theme.spacing.xxs} ${theme.spacing.sm}`};
  font-size: ${({ theme }) => theme.fontSizes.lm};
  border: 1px solid black;
  border-radius: ${({ theme }) => theme.spacing.md};
  width: fit-content;
  word-wrap: break-word;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const SaveTag = styled.span`
  background: ${({ theme, saved }) =>
    saved ? theme.colors.black : theme.colors.highlight};
  color: ${({ theme, saved }) =>
    saved ? theme.colors.highlight : theme.colors.black};
  border-radius: ${({ theme }) => theme.spacing.md};
  align-items: baseline;
  text-align: center;
  cursor: pointer;
  justify-content: space-between;
  white-space: nowrap;
  line-height: 1;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  margin: ${({ theme }) => theme.spacing.xs};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    margin: ${({ theme }) => theme.spacing.xxs};
  }
`;

const SaveStar = styled.span`
  font-size: ${({ size }) => size};
  padding-left: ${({ theme }) => theme.spacing.xs};
`;

const DescriptionWrapper = styled.div`
  align-self: start;
`;

const TitleText = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  padding-top: ${({ theme }) => theme.spacing.md};
`;

const ContentWrapper = styled.div`
  padding-top: ${({ theme }) => theme.spacing.xl};
  display: grid;
  grid-template-columns: 55% 45%;
  width: 100%;
  margin: auto;
  word-wrap: break-word;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    display: block;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.md} 0`};
`;

const ItemView = () => {
  const { locale } = useRouter();
  const { uiStore } = useStores();
  const intl = useIntl();
  const item = uiStore.currentContext;
  const loc = item.description[locale.toUpperCase()]?.length
    ? locale.toUpperCase()
    : "DE";

  return item && item?.id ? (
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
              size={8}
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
            <AuthorTag key={`author-${a.id}`}>{a.name ?? a.id}</AuthorTag>
          ))}
          <TitleText>{item.description[loc]}</TitleText>
        </DescriptionWrapper>
      </ItemHeaderWrapper>
      <ContentWrapper>
        <div>
          {item.rendered.languages[loc] &&
            _.entries(item.rendered.languages[loc].content).map(([k, c]) => (
              <ContentElement key={k} item={c} />
            ))}
        </div>
        <div></div>
      </ContentWrapper>
    </ItemViewWrapper>
  ) : null;
};

export default observer(ItemView);
