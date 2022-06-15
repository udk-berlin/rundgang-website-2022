import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { makeUrlFromId } from "@/utils/idUtils";
import { FormattedDateTimeRange } from "react-intl";
import LocalizedLink from "modules/i18n/components/LocalizedLink";
import LocalizedText from "modules/i18n/components/LocalizedText";

const PopupWrapper = styled.div`
  width: ${({ size }) => `${size * 1.2}px`};
  min-height: ${({ size }) => `${size}px`};
  font-size: ${({ theme }) => theme.fontSizes.mm};
  z-index: 40;
  padding: ${({ theme }) => theme.spacing.xs};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const PopupTitle = styled.div``;
const Times = styled.div``;
const TimeRange = styled.div`
  width: 100%;
`;

const RoomLink = styled(LocalizedLink)`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  flex-grow: 0;
  background: ${({ theme }) => theme.colors.highlight};
  border-radius: 60px;
  height: fit-content;
  width: fit-content;
  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.black};
  }
`;

const GrundrissPopup = ({ el, size }) => {
  return (
    <PopupWrapper id={`popup-${el.id}`} size={size}>
      <PopupTitle>{el.name}</PopupTitle>
      {el.isFound}
      <Times>
        {el.times.map(time => (
          <TimeRange key={time.start}>
            <FormattedDateTimeRange
              from={time.start}
              weekday="short"
              hour="numeric"
              minute="numeric"
              to={time.end}
            />
          </TimeRange>
        ))}
      </Times>
      <RoomLink to={`/orte/${makeUrlFromId(el.id)}`}>
        <LocalizedText id="rooms" />
      </RoomLink>
    </PopupWrapper>
  );
};

export default observer(GrundrissPopup);
