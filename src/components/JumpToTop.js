import React from "react";
import styled from "styled-components";
import { FOOTER_HEIGHT } from "./Footer";
import useIsScrolled from "@/utils/useIsScrolled";

const JumpToTopWrapper = styled.div`
  position: fixed;
  bottom: ${FOOTER_HEIGHT}px;
  left: 0;
  width: fit-content;
  margin: auto;
  font-size: ${({ theme }) => theme.spacing.xl};
  font-family: "Inter";
  cursor: pointer;
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
