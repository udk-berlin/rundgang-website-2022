import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { FormattedDateTimeRange } from "react-intl";
import { useStores } from "@/stores/index";
import FavouriteStar from "@/components/simple/FavouriteStar";

const ListItemWrapper = styled.div`
  cursor: pointer;
  position: relative;
  top: 0;
  left: 0;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding-bottom: ${({ theme }) => `0 ${theme.spacing.sm}`};
  }
`;

const Image = styled.img`
  width: 100%;
  position: relative;
  padding: ${({ theme }) => `0 ${theme.spacing.sm}`};
`;

const SaveIcon = styled.div`
  position: absolute;
  top: 5%;
  right: 5%;
  z-index: 10;
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

const Time = styled.div`
  padding: ${({ theme }) => `0 ${theme.spacing.sm}`};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    min-width: 50px;
    height: 50px;
  }
`;

const ListItem = ({ element }) => {
  const { uiStore } = useStores();

  const handleSaved = id => {
    uiStore.addToSaved(id);
  };

  return (
    <ListItemWrapper>
      <Image src={element.thumbnail} />
      <SaveIcon>
        <FavouriteStar
          saved={uiStore.savedItems.includes(element.id)}
          size={25}
          onClick={() => handleSaved(element.id)}
        />
      </SaveIcon>
      <Title>{element.name}</Title>
      <Authors>{element.origin.authors.map(a => a.name).join(",")}</Authors>
      {element.template == "event" ? (
        <Time>
          {element.allocation.temporal.map(t => (
            <FormattedDateTimeRange
              from={t.start}
              weekday="long"
              hour="numeric"
              minute="numeric"
              to={t.end}
            />
          ))}
        </Time>
      ) : null}
    </ListItemWrapper>
  );
};

export default observer(ListItem);
