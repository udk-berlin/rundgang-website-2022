import React from "react";
import styled from "styled-components";

const StretchWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  display: inline-block;
  flex-wrap: nowrap;
  white-space: nowrap;
  vertical-align: top;
  line-height: ${({ lh }) => lh};
  letter-spacing: 0.01px;
  font-size: ${({ fontSize }) => fontSize}vh;
  width: 100%;
`;

const StretchLayout = styled.div`
  transform-origin: 0% 0%;
  text-align: left;
  z-index: 1;
  width: fit-content;
  height: fit-content;
  text-align: left;
  transform: ${({ factor }) => `scaleX(${factor})`};
  transition: transform, 500ms;
`;

const Shadow = styled.div`
  opacity: 0;
  z-index: 0;
  transform-origin: 0% 0%;
  width: fit-content;
  height: fit-content;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  text-align: left;
`;

export const ArrowStyled = styled.span`
  width: fit-content;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
  }
`;

export const ChildrenWrapper = styled.span`
  width: fit-content;
  cursor: pointer;
  &:hover {
    color: #333;
  }
`;

export const ArrowWrap = ({ dir, isMobile, children }) => (
  <>
    {dir && dir == "left" && <ArrowStyled>&#8592;</ArrowStyled>}
    {dir && dir == "top" && <ArrowStyled>&#8593;</ArrowStyled>}
    {children}
    {dir && dir == "right" && <ArrowStyled right={true}>&#8594;</ArrowStyled>}
    {dir && dir == "bottom" && <ArrowStyled>&#8595;</ArrowStyled>}
  </>
);

export const StretchComponent = ({
  fs,
  pr,
  sr,
  fa,
  dir,
  children,
  handleClick,
  lh,
}) => {
  return (
    <StretchWrapper
      fontSize={fs}
      ref={pr}
      onClick={() => handleClick()}
      lh={lh}
    >
      <Shadow ref={sr}>
        <ArrowWrap dir={dir}>{children}</ArrowWrap>
      </Shadow>
      <StretchLayout ref={pr} factor={fa}>
        <ArrowWrap dir={dir}>{children}</ArrowWrap>
      </StretchLayout>
    </StretchWrapper>
  );
};
