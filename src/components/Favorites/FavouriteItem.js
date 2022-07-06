import React from "react";
import styled from "styled-components";
import { FormattedDateTimeRange } from "react-intl";
import FavouriteIcon from "@/components/simple/FavouriteIcon";
import Tag from "@/components/simple/Tag";

const FavouriteItemWrapper = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  display: flex;
  width: 100%;
  padding: ${({ theme }) => theme.space(16)};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding: ${({ theme }) => theme.space(8)};
  }
`;

const Image = styled.picture`
  width: 160px;
  height: auto;
  cursor: pointer;
  padding: ${({ theme }) => `0 ${theme.space(8)}`};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    width: 80px;
    height: auto;
  }
`;
const Title = styled.div`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.md};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;
const Authors = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  flex-grow: 0;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;
const Tags = styled.div`
  display: flex;
  width: 100%;
  flex-grow: 1 1 50%;
  padding-top: ${({ theme }) => theme.space(8)};
  flex-wrap: wrap;
`;
const Info = styled.div`
  cursor: pointer;
  width: 100%;
  padding: ${({ theme }) => ` 0px ${theme.space(8)}`};
`;

const Time = styled.div`
  padding: ${({ theme }) => theme.space(6)};
  padding-left: ${({ theme }) => theme.space(8)};
  line-height: 1;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: ${({ theme }) => theme.space(16)} 0px;
  border-radius: ${({ theme }) => theme.space(48)};
  border: 2px solid ${({ theme }) => theme.colors.highlight};
  background-color: ${({ theme }) => theme.colors.maingrey};
  color: ${({ theme }) => theme.colors.highlight};
  text-align: center;
  word-wrap: break-word;
  word-break: break-all;
  width: fit-content;
  margin: ${({ theme }) => theme.space(4)};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    margin: ${({ theme }) => theme.space(4)};
  }
`;

const FavouriteItem = ({ element, handleClick, handleUnsave }) => {
  return (
    <FavouriteItemWrapper>
      <FavouriteIcon
        saved={true}
        size={2.35}
        onClick={e => handleUnsave(e, element.id)}
      />
      <Image onClick={() => handleClick(element.id)}>
        <source srcSet={element.thumbnail} />
        <img
          src="/assets/img/missing.png"
          alt="missing image"
          style={{ width: "100%", height: "auto" }}
        />
      </Image>
      <Info onClick={() => handleClick(element.id)}>
        <Title>{element.name}</Title>
        <Authors>
          {[
            ...new Set(
              element.origin?.authors.map(a => (a.name ? a.name.trim() : a.id)),
            ),
          ]
            .filter(a => a)
            .join(", ")}
        </Authors>
        <Tags>
          {element.template == "event" &&
            element?.allocation?.temporal?.map((t, i) => (
              <Time key={`time-range-${t.start}-${i}-${t.end}`}>
                <FormattedDateTimeRange
                  from={t.start * 1000}
                  weekday="short"
                  hour="numeric"
                  minute="numeric"
                  to={t.end * 1000}
                />
              </Time>
            ))}
          {element.tags
            .filter(t =>
              ["location-room", "location-building"].includes(t.template),
            )
            .map(t => (
              <Tag
                selected={false}
                key={`${t.id}-${t.template}`}
                levelSelected={false}
                showCross={false}
                template={t.template}
              >
                {t.name}
              </Tag>
            ))}
        </Tags>
      </Info>
    </FavouriteItemWrapper>
  );
};

export default FavouriteItem;
