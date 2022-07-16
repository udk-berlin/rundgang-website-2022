import React from "react";
import styled from "styled-components";
import { FOOTER_HEIGHT } from "./Footer";
import useIsScrolled from "@/utils/useIsScrolled";

const JumpToTopWrapper = styled.div`
  position: fixed;
  bottom: 30px;
  right: 16px;
  margin: auto;
  z-index: 5000;
  font-size: ${({ theme }) => theme.space(64)};
  font-weight: bold;
  cursor: pointer;
  -webkit-text-stroke: 1px white;
  -webkit-text-fill-color: black;
`;

const JumpToTop = () => {
  const isScrolled = useIsScrolled(0);
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return isScrolled ? (
    <JumpToTopWrapper onClick={() => handleClick()}>&#8593;</JumpToTopWrapper>
  ) : null;
};

export default JumpToTop;
