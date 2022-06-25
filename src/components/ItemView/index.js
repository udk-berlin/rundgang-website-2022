import React, { useState } from "react";
import _ from "lodash";
import styled from "styled-components";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { useRouter } from "next/router";
import { useStores } from "@/stores/index";
import { FormattedDateTimeRange, useIntl } from "react-intl";
import ContentElement from "./ContentElement";
import Tag from "@/components/simple/Tag";
import ImageDetailView from "./ImageDetailView";

const ItemViewWrapper = styled.div`
  height: 100%;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ItemHeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 55% 45%;
  width: 100%;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    display: block;
  }
`;
const TitleImageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const TitleImage = styled.img`
  cursor: pointer;
  width: 100%;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    height: auto;
    width: 100%;
  }
`;

const AuthorTag = styled.div`
  margin: ${({ theme }) => theme.spacing.md} 0px;
  padding: ${({ theme }) => `${theme.spacing.xxs} ${theme.spacing.sm}`};
  font-size: ${({ theme }) => theme.fontSizes.lm};
  border: 1px solid black;
  border-radius: ${({ theme }) => theme.spacing.lg};
  width: fit-content;
  word-wrap: break-word;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.mm};
  }
`;

const Time = styled.div`
  padding: ${({ theme }) => `${theme.spacing.xxs} ${theme.spacing.sm}`};
  font-size: ${({ theme }) => theme.fontSizes.lm};
  margin: ${({ theme }) => theme.spacing.md} 0px;
  border-radius: ${({ theme }) => theme.spacing.lg};
  border: 2px solid ${({ theme }) => theme.colors.highlight};
  background-color: ${({ theme }) => theme.colors.maingrey};
  color: ${({ theme }) => theme.colors.highlight};
  white-space: nowrap;
  text-align: center;
  width: fit-content;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.mm};
  }
`;

const SaveTag = styled.span`
  background: ${({ theme, saved }) =>
    saved ? theme.colors.black : theme.colors.white};
  color: ${({ theme, saved }) =>
    saved ? theme.colors.white : theme.colors.black};
  border: 1px solid
    ${({ theme, saved }) => (saved ? theme.colors.white : theme.colors.black)};
  align-items: center;
  text-align: center;
  cursor: pointer;
  line-height: 1;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  margin: ${({ theme }) => theme.spacing.xs};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

const DescriptionWrapper = styled.div`
  align-self: start;
  width: 100%;
  margin: ${({ theme }) => theme.spacing.sm};
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
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.sm}`};
`;

const ItemView = () => {
  const { locale } = useRouter();
  const { uiStore } = useStores();
  const intl = useIntl();
  const item = uiStore.currentContext;
  const loc = item.description[locale.toUpperCase()]?.length
    ? locale.toUpperCase()
    : "DE";
  const [imageDetailOpen, setImageDetailOpen] = useState(false);

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
        <TitleImageWrapper>
          <TitleImage
            src={item.thumbnail}
            onClick={() => setImageDetailOpen(true)}
          />
          <ImageDetailView
            src={item.thumbnail}
            open={imageDetailOpen}
            handleClose={() => setImageDetailOpen(false)}
          />
        </TitleImageWrapper>
        <DescriptionWrapper mobile>
          {item?.origin?.authors?.map(a => (
            <AuthorTag key={`author-${a.id}`}>{a.name ?? a.id}</AuthorTag>
          ))}
          {item.template == "event" && item.allocation?.temporal?.length
            ? item.allocation?.temporal?.slice(0, 3).map((t, i) => (
                <Time key={`time-item-${t.start}-${i}-${t.end}`}>
                  <FormattedDateTimeRange
                    from={t.start * 1000}
                    to={t.end * 1000}
                    weekday="short"
                    year="numeric"
                    month="numeric"
                    day="numeric"
                    hour="numeric"
                    minute="numeric"
                  />
                </Time>
              ))
            : null}
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
