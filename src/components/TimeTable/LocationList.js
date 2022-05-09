import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { test_events, locations, TIME_WIDTH } from "./testdata";

const LocationWrapper = styled.div`
  position: sticky;
  display: flex;
  top: 0px;
  left: 0px;
`;
const Location = styled.div`
  position: absolute;
  width: ${TIME_WIDTH}px;
  top: ${({ y0 }) => `${y0}px`};
  height: ${({ y0, y1 }) => `${y1 - y0 - 3}px`};
  border-bottom: 1px solid black;
  left: 0px;
`;
const LocationTitle = styled.div`
  background: ${({ theme }) => theme.background.primary};
  white-space: nowrap;
  width: fit-content;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  z-index: 1000;
`;
const LocationList = ({ scaleY }) => {
  return (
    <LocationWrapper>
      {test_events.map(ev => (
        <Location y0={scaleY(ev.location_id)} y1={scaleY(ev.location_id + 1)}>
          <LocationTitle>{locations[ev.location_id]}</LocationTitle>
        </Location>
      ))}
    </LocationWrapper>
  );
};

export default observer(LocationList);
