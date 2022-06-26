import React from "react";
import styled from "styled-components";
import { FOOTER_HEIGHT } from "./Footer";
import useIsScrolled from "@/utils/useIsScrolled";

const JumpToTopWrapper = styled.div`
  position: fixed;
  bottom: ${FOOTER_HEIGHT}px;
  right: 0;
  width: fit-content;
  margin: auto;
  z-index: 500;
  font-size: ${({ theme }) => theme.spacing.xl};
  font-family: "Inter";
  font-weight: bold;
  cursor: pointer;
  -webkit-text-stroke: 2px white;
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
