import React, { useEffect } from "react";
import styled from "styled-components";

const MainLayout = styled.main`
  width: 100%;
  height: 100%;
  position: relative;
  min-height: 100%;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    min-height: calc(100vh - 30px);
  }
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
    height: "100%",
    x: "0%",
    y: "0%",
  },
  enterright: {
    scaleX: 1,
    originX: "0%",
    height: "100%",
    x: "0%",
    y: "0%",
  },
  exitleft: { scaleX: 0, originX: "0%", x: "0%", y: "0%" },
  exitright: { scaleX: 0, originX: "0%", x: "0%", y: "0%" },
};

const Layout = ({ children, direction = "left" }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default Layout;
