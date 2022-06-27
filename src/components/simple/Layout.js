import React, { useEffect } from "react";
import styled from "styled-components";

const MainLayout = styled.main`
  width: 100%;
  height: 100%;
`;

const Layout = ({ children, direction = "left" }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default Layout;
