import React, { useEffect } from "react";
import styled from "styled-components";

const MainLayout = styled.main`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: ${({ isEvent, theme }) =>
    isEvent ? theme.colors.lightHighlight : theme.colors.white};
`;
const variants = {
  hidden: {
    scaleX: 0,
    originX: "0%",
    x: "0%",
    y: "0%",
  },
  enterleft: {
    scaleX: 1,
    originX: "100%",
    x: "0%",
    y: "0%",
  },
  enterright: {
    scaleX: 1,
    originX: "0%",
    x: "0%",
    y: "0%",
  },
  exitleft: { scaleX: 0, originX: "0%", x: "0%", y: "0%" },
  exitright: { scaleX: 0, originX: "0%", x: "0%", y: "0%" },
};

const Layout = ({ children, direction = "left", isEvent }) => {
  useEffect(() => {
    if (isEvent) {
      document.body.style = "background: #F1FFB3;";
    } else {
      document.body.style = "background: white;";
    }
  }, [isEvent]);
  return <MainLayout isEvent={isEvent}>{children}</MainLayout>;
};

export default Layout;
