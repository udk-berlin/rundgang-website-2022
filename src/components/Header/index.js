import React from "react";
import styled from "styled-components";
import PageTitle from "../PageTitle";
import SearchBar from "../SearchBar";

const HeaderWrapper = styled.div`
  z-index: 10;
  position: relative;
  top: 0;
  left: 0;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <PageTitle />
      <SearchBar />
    </HeaderWrapper>
  );
};

export default Header;
