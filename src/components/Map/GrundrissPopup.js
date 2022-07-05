import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { makeUrlFromId } from "@/utils/idUtils";
import { FormattedDateTimeRange } from "react-intl";
import LocalizedLink from "modules/i18n/components/LocalizedLink";
import LocalizedText from "modules/i18n/components/LocalizedText";

const PopupWrapper = styled.div`
  display: none;
  position: relative;
  width: ${({ size }) => `${size}px`};
  height: fit-content;
  font-size: ${({ theme }) => theme.fontSizes.md};
  z-index: 4000;
  padding: 16px;
  background: white;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: auto;
  pointer-events: auto;
`;

const PopupTitle = styled.div`
  margin-top: 8px;
`;
const Times = styled.div`
  margin-top: 16px;
`;
const TimeRange = styled.div`
  width: 100%;
`;

const RoomLink = styled.div`
  margin-top: 16px;
  padding: ${({ theme }) => `${theme.space(8)} ${theme.space(16)}`};
  flex-grow: 0;
  background: ${({ theme }) => theme.colors.highlight};
  border-radius: 60px;
  border: 1px solid black;
  height: fit-content;
  width: fit-content;
  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
    background: ${({ theme }) => theme.colors.black};
    border: 1px solid black;
  }
`;
const Arrow = styled.span`
  font-family: "Inter";
`;

const ClosingButton = styled.div`
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.highlight};
  border-radius: 50%;
  opacity: 1;
  position: absolute;
  right: 16px;
  width: 36px;
  height: 36px;
  font-size: 24px;
  font-family: "Inter";
  line-height: 1.6;
  text-align: center;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const GrundrissPopup = ({ el, size }) => {
  return (
    <PopupWrapper
      id={`popup-${el.id}`}
      size={size}
      short={el.template == "location-external" ? 0.6 : 1}
    >
      <ClosingButton
        onClick={() => {
          const elem = document.getElementById(`popup-${el.id}`);
          elem.style.display = "none";
        }}
      >
        &#x2715;
      </ClosingButton>
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

      <LocalizedLink to={`/orte/${makeUrlFromId(el.id)}`}>
        <RoomLink>
          <LocalizedText id="program" /> <Arrow>&#8594;</Arrow>
        </RoomLink>
      </LocalizedLink>
    </PopupWrapper>
  );
};

export default observer(GrundrissPopup);
