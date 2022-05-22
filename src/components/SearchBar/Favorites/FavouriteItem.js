import React from "react";
import styled from "styled-components";
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
  return (
    <FavouriteItemWrapper>
      <FavouriteStarSvg saved={true} size={30} />
      {element.template == "studentproject" ? (
        <Image src={element.image} />
      ) : (
        <Time>{element.time}</Time>
      )}
      <Info>
        <Title>{element.title}</Title>
        <Authors>{element.authors}</Authors>
        <Tags>
          {element.tags.map(t => (
            <Tag
              selected={false}
              key={t.id}
              levelSelected={false}
              tagtitle={t.title}
            />
          ))}
        </Tags>
      </Info>
    </FavouriteItemWrapper>
  );
};

export default FavouriteItem;
