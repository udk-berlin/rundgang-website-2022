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
  overflow-x: hidden;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ItemHeaderWrapper = styled.div`
  display: grid;
  justify-content: space-evenly;
  margin: auto;
  grid-template-columns: 59% 39%;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    display: block;
    margin: ${({ theme }) => theme.space(8)};
  }
`;
const TitleImageWrapper = styled.div`
  display: block;
`;

const TitleImage = styled.img`
  cursor: pointer;
  width: 100%;
  height: auto;
`;

const AuthorTag = styled.div`
  padding: ${({ theme }) => `${theme.space(4)} ${theme.space(16)}`};
  font-size: ${({ theme }) => theme.fontSizes.lm};
  border: 1px solid black;
  border-radius: ${({ theme }) => theme.space(48)};
  width: fit-content;
  word-wrap: break-word;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin-top: ${({ theme }) => theme.space(16)};
    font-size: ${({ theme }) => theme.fontSizes.mm};
  }
`;

const Time = styled.div`
  padding: ${({ theme }) => `${theme.space(4)} ${theme.space(16)}`};
  font-size: ${({ theme }) => theme.fontSizes.lm};
  margin-top: ${({ theme }) => theme.space(16)};
  border-radius: ${({ theme }) => theme.space(48)};
  border: 2px solid ${({ theme }) => theme.colors.highlight};
  background-color: ${({ theme }) => theme.colors.maingrey};
  color: ${({ theme }) => theme.colors.highlight};
  text-align: center;
  word-wrap: break-word;
  word-break: break-all;
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
  line-height: 1.3;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: ${({ theme }) => `${theme.space(4)} ${theme.space(8)}`};
  margin: ${({ theme }) => theme.space(4)};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

const DescriptionWrapper = styled.div`
  padding: ${({ theme }) => `0px ${theme.space(4)}`};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin: ${({ theme }) => `${theme.space(4)} 0px`};
    padding: 0px;
  }
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
  display: grid;
  justify-content: space-evenly;
  margin: auto;
  margin-bottom: ${({ theme }) => theme.space(20)};
  grid-template-columns: 59% 39%;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    display: block;
    margin: ${({ theme }) => theme.space(8)};
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: ${({ theme }) => theme.space(8)};
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
                    month="numeric"
                    day="numeric"
                    hour="numeric"
                    minute="numeric"
                  />
                </Time>
              ))
            : null}
          <TitleText>
            {item.description[loc]}
            Until recently, the prevailing view assumed lorem ipsum was born as
            a nonsense text. “It's not Latin, though it looks like it, and it
            actually says nothing,” Before & After magazine answered a curious
            reader, “Its ‘words’ loosely approximate the frequency with which
            letters occur in English, which is why at a glance it looks pretty
            real.” As Cicero would put it, “Um, not so fast.” The placeholder
            text, beginning with the line “Lorem ipsum dolor sit amet,
            consectetur adipiscing elit”, looks like Latin because in its youth,
            centuries ago, it was Latin. Richard McClintock, a Latin scholar
            from Hampden-Sydney College, is credited with discovering the source
            behind the ubiquitous filler text. In seeing a sample of lorem
            ipsum, his interest was piqued by consectetur—a genuine, albeit
            rare, Latin word. Consulting a Latin dictionary led McClintock to a
            passage from De Finibus Bonorum et Malorum (“On the Extremes of Good
            and Evil”), a first-century B.C. text from the Roman philosopher
            Cicero. In particular, the garbled words of lorem ipsum bear an
            unmistakable resemblance to sections 1.10.32–33 of Cicero's work,
            with the most notable passage excerpted below:
          </TitleText>
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
