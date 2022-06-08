import React from "react";
import styled from "styled-components";

const JumpToTopWrapper = styled.div`
  position: absolute;
  margin: auto;
  bottom: 0;
  font-size: ${({ theme }) => theme.spacing.xl};
  font-family: "Inter";
  cursor: pointer;
`;

const JumpToTop = () => {
  const handleClick = () => {
    console.log("scroll");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <JumpToTopWrapper onClick={() => handleClick()}>&#8593;</JumpToTopWrapper>
  );
};

export default JumpToTop;
