import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import LocalizedLink from "modules/i18n/components/LocalizedLink";
import { test_events } from "./testdata";

const toNumber = time => {
  const [hour, min] = time.split(":");
  const minInHours = min ? Number(min) / 60 : 0;
  return Number(hour) + minInHours;
};
const AbsoluteDiv = styled.div`
  position: relative;
  display: flex;
  top: 0px;
  left: 0px;
`;
const EventBar = styled.div`
  position: absolute;
  top: ${({ y0 }) => `${y0 + 8}px`};
  left: ${({ start }) => `${start + 1}px`};
  width: ${({ start, end }) => `${end - start - 2}px`};
  height: ${({ y0, y1 }) => `${y1 - y0 - 16}px`};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  background: ${({ theme }) => theme.background.secondary};
  box-sizing: border-box;
  padding: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 5;
`;
const EventList = ({ scaleX, scaleY }) => {
  return (
    <AbsoluteDiv>
      {test_events.map(ev => (
        <EventBar
          start={scaleX(toNumber(ev.start))}
          end={scaleX(toNumber(ev.end))}
          y0={scaleY(ev.location_id)}
          y1={scaleY(ev.location_id + 1)}
        >
          {ev.name}
        </EventBar>
      ))}
    </AbsoluteDiv>
  );
};

export default observer(EventList);
