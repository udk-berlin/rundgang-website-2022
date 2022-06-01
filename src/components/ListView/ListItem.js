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
  z-index: 100;
`;
const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: "DiatypeBold";
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
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
  border-radius: ${({ theme }) => theme.spacing.md};
  background-color: white;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    min-width: 50px;
    height: 50px;
  }
`;

const ListItem = ({ element }) => {
  const { uiStore, dataStore } = useStores();
  const router = useRouter();
  const linklocation = router.pathname.includes("[pid]")
    ? router.pathname.replace("[pid]", makeUrlFromId(element.id))
    : `${router.pathname}/${makeUrlFromId(element.id)}`;

  const handleAddSaved = (e, id) => {
    uiStore.addToSaved(e,id);
  };

  return (
    <ListItemWrapper>
      <LocalizedLink to={linklocation}>
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
            onClick={e => handleAddSaved(e, element.id)}
          />
        </SaveIcon>
        {element.template == "event" && element.allocation?.temporal?.length
          ? element.allocation?.temporal?.map((t, i) => (
              <Time>
                <FormattedDateTimeRange
                  key={`time-range-${i}-${element.id}`}
                  from={t.start}
                  weekday="long"
                  hour="numeric"
                  minute="numeric"
                  to={t.end}
                />
              </Time>
            ))
          : null}
        <Title>{element.name}</Title>
        <Authors>{element.origin.authors.map(a => a.name).join(",")}</Authors>
      </LocalizedLink>
    </ListItemWrapper>
  );
};

export default observer(ListItem);
