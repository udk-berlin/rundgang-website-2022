import React, { useEffect } from "react";
import styled from "styled-components";
import JumpToTop from "../JumpToTop";

const MainLayout = styled.main`
  width: calc(100% - 32px);
  margin: auto;
  height: 100%;
`;

const Layout = ({ children, showToTop = true }) => {
  return (
    <MainLayout>
      {children}
      {showToTop && <JumpToTop />}
    </MainLayout>
  );
};

export default Layout;
