import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import LocalizedLink from "modules/i18n/components/LocalizedLink";

const EventBarWrapper = styled.div`
  position: relative;
  left: ${({ start }) => `${start + 2}px`};
  width: ${({ start, end }) => `${end - start - 3}px`};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  background: ${({ theme }) => theme.background.secondary};
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px 6px;
  top: ${({ top }) => top}px;
  &:hover {
    background: ${({ theme }) => theme.colors.lightgrey};
  }
`;

const RestyledLink = styled(LocalizedLink)`
  height: 100%;
  width: 0;
  padding: 2px 0px;
  background-color: white;
  &:hover {
    color: black;
  }
`;
const EventBar = ({ ev, start, end, link, top }) => {
  const [topMargin, setTopMargin] = useState(0);

  useEffect(() => {
    let previous =
      top > 0 ? document.getElementById(`${start}-${top - 1}`) : null;
    if (previous) {
      console.log(previous.clientHeight);
      setTopMargin(previous.clientHeight + 4);
    }
  }, [top]);
  return (
    <RestyledLink to={link}>
      <EventBarWrapper
        id={`${start}-${top}`}
        title={ev.name}
        start={start}
        end={end}
        top={topMargin}
      >
        {ev.name}
      </EventBarWrapper>
    </RestyledLink>
  );
};

export default observer(EventBar);
