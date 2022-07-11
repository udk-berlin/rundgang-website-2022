import React from "react";
import { entries, values, groupBy } from "lodash";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { makeUrlFromId } from "@/utils/idUtils";
import EventBar from "./EventBar";
import LocalizedText from "modules/i18n/components/LocalizedText";
import { FormattedDateTimeRange } from "react-intl";

const LocationWrapper = styled.div`
  width: ${({ width }) => width}px;
  height: fit-content;
  position: relative;
  z-index: 0;
  margin-top: ${({ forSaved }) => (forSaved ? "10px" : "100px")};
  margin-bottom: 100px;
`;

const Room = styled.div`
  height: 100%;
  width: ${({ width }) => width}px;
  border-bottom: 1px solid black;
  position: relative;
  display: flex;
  align-items: flex-start;
  &::after {
    height: 100%;
  }
`;

const House = styled(Room)`
  min-height: 100px;
  border-bottom: 4px solid black;
  align-items: flex-end;
`;

const RoomTitle = styled.div`
  white-space: nowrap;
  width: fit-content;
  background-color: white;
  padding-top: 4px;
  font-size: ${({ theme }) => theme.fontSizes.mm};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

const HouseTitle = styled(RoomTitle)`
  transform: scaleX(0.7);
  transform-origin: top left;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.mm};
  }
`;

const RoomTitleWrapper = styled.div`
  width: ${({ width }) => width}px;
  position: sticky;
  z-index: 50;
  line-height: 1;
  left: 0;
  top: 0;
  height: 100%;
`;

const RelativeWrapper = styled.div`
  position: relative;
`;
const EventsWrapper = styled.div`
  position: relative;
  display: flex;
  padding: 4px 0px;
`;

const LocationList = ({
  scaleX,
  wwidth,
  houseInfo,
  timeTableEvents,
  forSaved = false,
}) => {
  const { pathname } = useRouter();
  const locWidth = scaleX(1658564000);
  return (
    <LocationWrapper width={wwidth} forSaved={forSaved}>
      {timeTableEvents
        ? entries(timeTableEvents).map(([house, rooms]) =>
            entries(rooms).length ? (
              <RelativeWrapper key={`house-${house}`}>
                <House width={wwidth}>
                  <RoomTitleWrapper width={locWidth}>
                    <HouseTitle>{house}</HouseTitle>
                  </RoomTitleWrapper>
                </House>
                {!forSaved ? (
                  <Room key={`openingtimes-${house}`} width={wwidth}>
                    <RoomTitleWrapper width={locWidth}>
                      <RoomTitle></RoomTitle>
                    </RoomTitleWrapper>
                    <EventsWrapper>
                      {houseInfo[house]
                        ? houseInfo[house]?.allocation?.temporal?.map(time =>
                            time.udk == "rundgang" ? (
                              <EventBar
                                key={`opening-${houseInfo[house]?.id}-${time.start}`}
                                start={scaleX(time.start) - locWidth}
                                end={scaleX(time.end) - locWidth}
                                link={`/orte/${makeUrlFromId(
                                  houseInfo[house]?.id,
                                )}`}
                                color="lightgrey"
                              >
                                <LocalizedText id="openingtimes" />
                                <FormattedDateTimeRange
                                  from={time.start * 1000}
                                  to={time.end * 1000}
                                  weekday="long"
                                  month="numeric"
                                  day="numeric"
                                  hour="numeric"
                                  minute="numeric"
                                />
                              </EventBar>
                            ) : null,
                          )
                        : null}
                    </EventsWrapper>
                  </Room>
                ) : null}
                {entries(rooms).map(([room, events]) => (
                  <Room key={`room-${room}-${house}`} width={wwidth}>
                    <RoomTitleWrapper width={locWidth}>
                      <RoomTitle>{room}</RoomTitle>
                    </RoomTitleWrapper>
                    <EventsWrapper>
                      {values(groupBy(events, "time.start")).map(starttime =>
                        starttime.map((ev, i) => (
                          <EventBar
                            key={`ev-${room}-${ev.id}-${i}`}
                            ev={ev}
                            top={i}
                            forSaved={forSaved}
                            start={scaleX(ev.time.start - 7200) - locWidth}
                            end={scaleX(ev.time.end - 7200) - locWidth}
                            link={`${pathname}/${makeUrlFromId(ev.id)}`}
                          />
                        )),
                      )}
                    </EventsWrapper>
                  </Room>
                ))}
              </RelativeWrapper>
            ) : null,
          )
        : null}
    </LocationWrapper>
  );
};

export default observer(LocationList);
