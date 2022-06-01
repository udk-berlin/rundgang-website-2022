import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FormattedTime } from "react-intl";
import { useStores } from "@/stores/index";
import FavouriteStarSvg from "@/components/simple/FavouriteStar";
import Tag from "@/components/simple/Tag";

const FavouriteItemWrapper = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  display: flex;
  padding-bottom: ${({ theme }) => theme.spacing.md};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding-bottom: ${({ theme }) => `0 ${theme.spacing.sm}`};
  }
`;

const Image = styled.img`
  width: 100px;
  padding: ${({ theme }) => `0 ${theme.spacing.sm}`};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    height: 50px;
    width: 50px;
  }
`;
const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;
const Authors = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  flex-grow: 0;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;
const Tags = styled.div``;
const Info = styled.div`
  width: 100%;
`;
const Time = styled.div`
  min-width: 100px;
  height: 100px;
  text-align: center;
  padding: ${({ theme }) => `0 ${theme.spacing.sm}`};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    min-width: 50px;
    height: 50px;
  }
`;

const FavouriteItem = ({ element }) => {
  const { dataStore } = useStores();
  const [tags, setTags] = useState([]);
  useEffect(() => {
    dataStore.api
      .getPathToId(element.id)
      .then(res => setTags(res.slice(-3, -1)));
  }, []);

  return (
    <FavouriteItemWrapper>
      <FavouriteStarSvg saved={true} size={30} />
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
          {element?.allocation?.temporal?.map(t => (
            <span>
              <FormattedTime value={t.start} weekday="long" />-
              <FormattedTime value={t.end} />
            </span>
          ))}
        </Time>
      )}
      <Info>
        <Title>{element.name}</Title>
        <Authors>{element.origin.authors.map(a => a.name).join(",")}</Authors>
        <Tags>
          {tags.map(t => (
            <Tag
              selected={false}
              key={t.id}
              levelSelected={false}
              tagtitle={t.name}
              showCross={false}
            />
          ))}
        </Tags>
      </Info>
    </FavouriteItemWrapper>
  );
};

export default FavouriteItem;
