import React, { useCallback, useMemo } from "react";
import { entries } from "lodash";
import styled from "styled-components";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { makeUrlFromId } from "@/utils/idUtils";
import { useRouter } from "next/router";
import { useStores } from "@/stores/index";
import { FormattedDateTimeRange, useIntl } from "react-intl";
import ContentElement from "./ContentElement";
import Tag from "@/components/simple/Tag";
import ImageDetailView from "./ImageDetailView";
import LocalizedLink from "modules/i18n/components/LocalizedLink";

const ItemViewWrapper = styled.div`
  height: 100%;
  min-height: calc(100vh - 110px);
  width: 100%;
  overflow-x: hidden;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ItemHeaderWrapper = styled.div`
  display: grid;
  justify-content: space-evenly;
  grid-template-columns: 6fr 4fr;
  gap: 16px 16px;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    display: block;
    margin-top: ${({ theme }) => theme.space(16)};
  }
`;
const AuthorTag = styled.span`
  padding: ${({ theme }) => `${theme.space(4)} ${theme.space(16)}`};
  font-size: ${({ theme }) => theme.fontSizes.lm};
  border: 1px solid black;
  border-radius: ${({ theme }) => theme.space(48)};
  width: fit-content;
  word-wrap: break-word;
  height: fit-content;
  margin: 0px 8px 8px 0px;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin: 0px 4px 4px 0px;
    font-size: ${({ theme }) => theme.fontSizes.mm};
  }
`;

const LocationTag = styled(AuthorTag)`
  background: black;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.highlight};
  border-color: ${({ theme }) => theme.colors.highlight};
`;

const Time = styled(AuthorTag)`
  border: 2px solid ${({ theme }) => theme.colors.highlight};
  background-color: ${({ theme }) => theme.colors.maingrey};
  color: ${({ theme }) => theme.colors.highlight};
`;

const SaveTag = styled.span`
  background: ${({ theme, saved }) =>
    saved ? theme.colors.black : theme.colors.highlight};
  color: ${({ theme, saved }) =>
    saved ? theme.colors.highlight : theme.colors.black};
  border: 1px solid
    ${({ theme, saved }) => (saved ? theme.colors.white : theme.colors.black)};
  align-items: center;
  text-align: center;
  cursor: pointer;
  line-height: 1.3;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: ${({ theme }) => `${theme.space(4)} ${theme.space(8)}`};
  margin: 4px 4px 4px 0px;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

const DescriptionWrapper = styled.div`
  padding: ${({ theme }) => `0px ${theme.space(4)}`};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin: ${({ theme }) => `${theme.space(8)} 0px`};
    padding: 0px;
  }
`;

const LargeTags = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const TitleText = styled.div`
  padding-top: ${({ theme }) => theme.space(16)};
  font-size: ${({ theme }) => theme.fontSizes.mm};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

const ContentWrapper = styled.div`
  padding-top: ${({ theme }) => theme.space(8)};
  padding-bottom: ${({ theme }) => theme.space(40)};
  display: grid;
  justify-content: space-evenly;
  margin: auto;
  grid-template-columns: 6fr 4fr;
  gap: 16px 16px;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    display: block;
    margin-top: ${({ theme }) => theme.space(16)};
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: ${({ theme }) => theme.space(10)};
`;

const getLoc = (item, locale) => {
  let locBig = locale.toUpperCase();
  let locDesc = locBig;
  let locText = locBig;
  if (!item.description[locDesc]?.length) {
    locDesc = locDesc == "EN" ? "DE" : "EN";
  }
  if (!item.rendered.languages[locText]?.formattedContent?.length) {
    locText = locText == "EN" ? "DE" : "EN";
  }
  return [locDesc, locText];
};

const ItemView = () => {
  const router = useRouter();
  const { locale } = router;
  const { uiStore } = useStores();
  const intl = useIntl();
  const tagPrefix = useCallback(
    t => (t.startsWith("location") ? intl.formatMessage({ id: t }) : ""),
    [locale],
  );

  const item = uiStore.currentContext;
  console.log(item.rendered.languages);
  const [locDesc, locText] = useMemo(() => getLoc(item, locale), [locale]);

  console.log(toJS(item.rendered.languages[locText]));
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
        {item.tags
          .filter(t => !t.template.includes("location-"))
          .map(t => (
            <Tag
              selected={false}
              key={t.id}
              levelSelected={false}
              showCross={false}
              template={t.template}
            >
              <LocalizedLink to={`/katalog/${t.id}`}>{t.name}</LocalizedLink>
            </Tag>
          ))}
      </Tags>
      <ItemHeaderWrapper>
        <ImageDetailView src={item.thumbnail_full_size} />
        <DescriptionWrapper>
          <LargeTags>
            {item.tags
              .filter(t => t.template.includes("location-"))
              .map(t => (
                <LocationTag
                  key={t.name}
                  onClick={() => router.replace(`/orte/${makeUrlFromId(t.id)}`)}
                >
                  {tagPrefix(t.template)}
                  {t.name}
                </LocationTag>
              ))}
            {item.template == "event" && item.allocation?.temporal?.length
              ? item.allocation?.temporal?.slice(0, 3).map((t, i) => (
                  <Time key={`time-item-${t.start}-${i}-${t.end}`}>
                    <FormattedDateTimeRange
                      from={t.start * 1000}
                      to={t.end * 1000}
                      weekday="short"
                      hour="numeric"
                      minute="numeric"
                    />
                  </Time>
                ))
              : null}
            {item?.origin?.authors
              ?.filter(a => a.name || a.id)
              .map(a => (
                <AuthorTag key={`author-${a.name}-${a.id}`}>
                  {a.name ? a.name : a.id}
                </AuthorTag>
              ))}
          </LargeTags>
          <TitleText>{item.description[locDesc]}</TitleText>
        </DescriptionWrapper>
      </ItemHeaderWrapper>
      <ContentWrapper>
        <div>
          {item.rendered.languages[locText] &&
            entries(item.rendered.languages[locText].content).map(([k, c]) => (
              <ContentElement key={k} item={c} />
            ))}
        </div>
        <div></div>
      </ContentWrapper>
    </ItemViewWrapper>
  ) : null;
};

export default observer(ItemView);
