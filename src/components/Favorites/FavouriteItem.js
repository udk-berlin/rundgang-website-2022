import React from "react";
import styled from "styled-components";
import { FormattedDateTimeRange } from "react-intl";
import FavouriteIcon from "@/components/simple/FavouriteIcon";
import Tag from "@/components/simple/Tag";

const FavouriteItemWrapper = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  display: flex;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding: ${({ theme }) => `0 ${theme.spacing.sm}`};
  }
`;

const Image = styled.img`
  width: 160px;
  padding: ${({ theme }) => `0 ${theme.spacing.sm}`};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    height: 50px;
    width: 50px;
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
  padding-top: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;
const Info = styled.div`
  width: 100%;
`;
const Time = styled.div`
  min-width: 160px;
  height: 160px;
  padding: ${({ theme }) => `0 ${theme.spacing.sm}`};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    min-width: 50px;
    height: 50px;
  }
`;

const TimeRange = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

const FavouriteItem = ({ element }) => {
  return (
    <FavouriteItemWrapper>
      <FavouriteIcon saved={true} size={20} />
      {element.template == "studentproject" ? (
        <Image
          src={
            element.thumbnail.length > 0
              ? element.thumbnail
              : "/assets/img/missing.svg"
          }
        />
      ) : (
        <Time>
          {element?.allocation?.temporal?.map((t, i) => (
            <TimeRange key={`time-range-${t.start}-${i}-${t.end}`}>
              <FormattedDateTimeRange
                from={t.start * 1000}
                weekday="short"
                hour="numeric"
                minute="numeric"
                to={t.end * 1000}
              />
            </TimeRange>
          ))}
        </Time>
      )}
      <Info>
        <Title>{element.name}</Title>
        <Authors>{element.origin.authors.map(a => a.name).join(",")}</Authors>
        <Tags>
          {element.tags
            .filter(t =>
              ["location-room", "location-building"].includes(t.template),
            )
            .map(t => (
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
      </Info>
    </FavouriteItemWrapper>
  );
};

export default FavouriteItem;
