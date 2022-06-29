import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import LocalizedLink from "modules/i18n/components/LocalizedLink";

const EventBarWrapper = styled.div`
  position: relative;
  left: ${({ start }) => `${start + 2}px`};
  width: ${({ start, end }) => `${end - start - 3}px`};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  background: ${({ theme, color }) => theme.colors[color]};
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
  max-height: 30px;
  text-overflow: ellipsis;
  padding: 0px 6px;
  top: ${({ top }) => top}px;
  &:hover {
    background: ${({ theme }) => theme.colors.lightgrey};
  }
`;

const RestyledLink = styled(LocalizedLink)`
  height: fit-content;
  width: 0;
  &:hover {
    color: black;
  }
`;
const EventBar = ({ ev, start, end, link, top, children = null }) => {
  const [topMargin, setTopMargin] = useState(0);

  useEffect(() => {
    let previous =
      top > 0 ? document.getElementById(`${start}-${top - 1}`) : null;
    if (previous) {
      setTopMargin(previous.clientHeight + 4);
    }
  }, [top]);
  return (
    <RestyledLink to={link}>
      <EventBarWrapper
        id={`${start}-${top}`}
        start={start}
        end={end}
        top={topMargin}
        title={ev?.name}
        color={children ? "lightgrey" : "highlight"}
      >
        {children ?? ev?.name}
      </EventBarWrapper>
    </RestyledLink>
  );
};

export default observer(EventBar);
