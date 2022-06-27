import React, { useEffect } from "react";
import styled from "styled-components";
import JumpToTop from "../JumpToTop";

const MainLayout = styled.main`
  width: 100%;
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
