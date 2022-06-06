import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { FormattedDateTimeRange } from "react-intl";
import { useRouter } from "next/router";
import { useStores } from "@/stores/index";
import FavouriteStar from "@/components/simple/FavouriteStar";
import LocalizedLink from "modules/i18n/components/LocalizedLink";
import { makeUrlFromId } from "@/utils/idUtils";

const ListItemWrapper = styled.div`
  cursor: pointer;
  position: relative;
  top: 0;
  left: 0;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: ${({ theme }) => theme.spacing.md};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const Image = styled.img`
  width: 100%;
  position: relative;
  opacity: 85%;
  &:hover {
    opacity: 100%;
  }
`;

const SaveIcon = styled.div`
  position: absolute;
  top: 5%;
  right: 5%;
  z-index: 100;
`;

// 
const RestyledLink = styled(LocalizedLink)`
  &:hover {
    color: black;
  }
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: "DiatypeBold";
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
  &:hover {
    color: ${({ theme }) => theme.colors.darkgrey};
  }
  overflow-wrap: break-word;
  word-wrap: break-word;
`;
const Authors = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  flex-grow: 0;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

const Time = styled.div`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  margin: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.spacing.md};
  border: 1px solid black;
  background-color: white;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    padding: ${({ theme }) => `${theme.spacing.xxs} ${theme.spacing.xs}`};
    margin: ${({ theme }) => theme.spacing.xs};
  }
`;

const TimeWrapper = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.md};
  left: ${({ theme }) => theme.spacing.sm};
  z-index: 100;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: fit-content;
  position: relative;
`;

const ListItem = ({ element }) => {
  const { uiStore } = useStores();
  const router = useRouter();
  const linklocation = router.pathname.includes("[pid]")
    ? router.pathname.replace("[pid]", makeUrlFromId(element.id))
    : `${router.pathname}/${makeUrlFromId(element.id)}`;

  const handleAddSaved = (e, id) => {
    uiStore.addToSaved(e, id);
  };

  return (
    <ListItemWrapper>
      <RestyledLink to={linklocation}>
        <ImageWrapper>
          <Image
            src={
              element.thumbnail.length > 0
                ? element.thumbnail
                : "/assets/img/missing.svg"
            }
          />
          <SaveIcon>
            <FavouriteStar
              saved={uiStore.savedItemIds.includes(element.id)}
              size={25}
              onClick={(e) => handleAddSaved(e, element.id)}
            />
          </SaveIcon>
          <TimeWrapper>
            {element.template == "event" && element.allocation?.temporal?.length
              ? element.allocation?.temporal?.slice(0,3).map((t, i) => (
                  <Time>
                    <FormattedDateTimeRange
                      key={`time-range-${t.start}-${i}-${t.end}`}
                      from={t.start}
                      weekday="long"
                      hour="numeric"
                      minute="numeric"
                      to={t.end}
                    />
                  </Time>
                ))
              : null}
          </TimeWrapper>
        </ImageWrapper>
        <Title>{element.name}</Title>
        <Authors>{element.origin.authors.map((a) => a.name).join(",")}</Authors>
      </RestyledLink>
    </ListItemWrapper>
  );
};

export default observer(ListItem);
