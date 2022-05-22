import React from "react";
import styled from "styled-components";
import PageTitle from "./PageTitle";
import SearchBar from "../SearchBar";

const HeaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
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
