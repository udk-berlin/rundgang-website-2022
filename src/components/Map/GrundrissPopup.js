import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { makeUrlFromId } from "@/utils/idUtils";
import { FormattedDateTimeRange } from "react-intl";
import LocalizedLink from "modules/i18n/components/LocalizedLink";
import LocalizedText from "modules/i18n/components/LocalizedText";

const PopupWrapper = styled.div`
  width: ${({ size }) => `${size}px`};
  min-height: ${({ size, short }) => `${size * 0.7 * short}px`};
  font-size: ${({ theme }) => theme.fontSizes.md};
  z-index: 40;
  padding: ${({ theme }) => theme.space(4)};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    width: ${({ size }) => `${size}px`};
    min-height: ${({ size, short }) => `${size * 0.8 * short}px`};
  }
`;

const PopupTitle = styled.div``;
const Times = styled.div``;
const TimeRange = styled.div`
  width: 100%;
`;

const RoomLink = styled(LocalizedLink)`
  padding: ${({ theme }) => `${theme.space(8)} ${theme.space(16)}`};
  flex-grow: 0;
  background: ${({ theme }) => theme.colors.highlight};
  border-radius: 60px;
  border: 1px solid black;
  height: fit-content;
  width: fit-content;
  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.black};
  }
`;
const Arrow = styled.span`
  font-family: "Inter";
`;

const GrundrissPopup = ({ el, size }) => {
  return (
    <PopupWrapper
      id={`popup-${el.id}`}
      size={size}
      short={el.template == "location-external" ? 0.6 : 1}
    >
      <PopupTitle>{el.name}</PopupTitle>
      <Times>
        {el?.extra?.allocation?.temporal?.map(time =>
          time.udk == "rundgang" ? (
            <TimeRange key={time.start}>
              <FormattedDateTimeRange
                from={time.start * 1000}
                weekday="short"
                hour="numeric"
                to={time.end * 1000}
              />
            </TimeRange>
          ) : null,
        )}
      </Times>
      <RoomLink to={`/orte/${makeUrlFromId(el.id)}`}>
        <LocalizedText id="program" /> <Arrow>&#8594;</Arrow>
      </RoomLink>
    </PopupWrapper>
  );
};

export default observer(GrundrissPopup);
