import React, { useEffect, useState } from "react";
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
  z-index: 500;
`;
const EventBar = styled.div`
  position: absolute;
  top: ${({ y0 }) => `${y0 + 8}px`};
  left: ${({ start }) => `${start + 1}px`};
  width: ${({ start, end }) => `${end - start - 2}px`};
  height: ${({ y0, y1 }) => `${y1 - y0 - 16}px`};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  background: ${({ theme }) => theme.background.secondary};
  box-sizing: border-box;
  padding: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const EventList = ({ scaleX, scaleY }) => {
  return (
    <AbsoluteDiv>
      {test_events.map(ev => (
        <EventBar
          title={ev.name}
          start={scaleX(toNumber(ev.start))}
          end={scaleX(toNumber(ev.end))}
          y0={scaleY(ev.location_index)}
          y1={scaleY(ev.location_index + 1)}
        >
          {ev.name}
        </EventBar>
      ))}
    </AbsoluteDiv>
  );
};

export default observer(EventList);
