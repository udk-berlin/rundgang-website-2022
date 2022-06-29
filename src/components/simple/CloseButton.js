import styled from "styled-components";
import React from "react";

const CloseButtonWrapper = styled.div`
  cursor: pointer;
  width: 100%;
  position: relative;
  text-align: center;
  display: flex;
  justify-content: center;
  padding-top: 8px;
`;

const CloseIcon = styled.div`
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.highlight};
  border-radius: 50%;
  opacity: 0.8;
  width: 80px;
  height: 80px;
  font-size: 60px;
  font-family: "Inter";
  line-height: 1.35;
  margin: auto;
  @media ${({ theme }) => theme.breakpoints.mobileM} {
    width: 60px;
    height: 60px;
    font-size: 50px;
  }
  &:hover {
    opacity: 1;
  }
`;

const CloseButton = ({ onClose }) => {
  return (
    <CloseButtonWrapper onClick={() => onClose()}>
      <CloseIcon>&#x2715;</CloseIcon>
    </CloseButtonWrapper>
  );
};

export default CloseButton;
