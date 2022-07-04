import styled from "styled-components";
import React from "react";

const CloseButtonWrapper = styled.div`
  cursor: pointer;
  position: relative;
  text-align: center;
  margin-left: auto;
  right: 0px;
  top: 0px;
  @media ${({ theme }) => theme.breakpoints.laptop} {
    width: ${({ stretching }) => stretching}%;
    top: -40px;
  }
`;

const CloseIcon = styled.div`
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.highlight};
  border-radius: 50%;
  opacity: 1;
  width: 60px;
  height: 60px;
  font-size: 44px;
  font-family: "Inter";
  line-height: 1.35;
  margin: auto;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    width: 60px;
    height: 60px;
    line-height: 1.4;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const CloseButton = ({ stretching }) => {
  return (
    <CloseButtonWrapper stretching={stretching}>
      <CloseIcon>&#x2715;</CloseIcon>
    </CloseButtonWrapper>
  );
};

export default CloseButton;