import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import LocalizedLink from "modules/i18n/components/LocalizedLink";

const EventBarWrapper = styled.div`
  position: relative;
  left: ${({ start }) => `${start + 2}px`};
  width: ${({ start, end }) => `${end - start - 2}px`};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  background: ${({ theme }) => theme.background.secondary};
  box-sizing: border-box;
  overflow: hidden;
  padding: 6px;
  &:hover {
    background: ${({ theme }) => theme.colors.lightgrey};
  }
`;

const RestyledLink = styled(LocalizedLink)`
  &:hover {
    color: black;
  }
`;
const EventBar = ({ ev, start, end, link }) => {
  return (
    <RestyledLink to={link}>
      <EventBarWrapper title={ev.name} start={start} end={end}>
        {ev.name}
      </EventBarWrapper>
    </RestyledLink>
  );
};

export default observer(EventBar);
