import React from "react";
import styled from "styled-components";

const StretchWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  line-height: ${({ lineh }) => lineh};
  letter-spacing: 0.1px;
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
  position: ${({ right }) => (right ? "absolute" : "relative")};
  right: ${({ right }) => (right ? "0px" : "auto")};
  font-size: inherit;
  width: fit-content;
  font-family: "Inter";
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
  }
  @media only screen and (min-width: 821px) and (orientation: landscape) {
    font-size: 90%;
    line-height: 0.9;
    margin-bottom: auto;
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
    <ChildrenWrapper>{children}</ChildrenWrapper>
    {dir && dir == "right" && (
      <ArrowStyled right={!isMobile}>&#8594;</ArrowStyled>
    )}
    {dir && dir == "bottom" && (
      <ArrowStyled right={!isMobile}>&#8594;</ArrowStyled>
    )}
  </>
);

export const StretchWithArrowDesktop = ({
  fs,
  lh,
  pr,
  sr,
  fa,
  dir,
  children,
  handleClick,
}) => (
  <StretchWrapper
    fontSize={fs}
    lineh={lh}
    ref={pr}
    onClick={() => handleClick()}
  >
    <ArrowWrap dir={dir} isMobile={false}>
      <Shadow ref={sr}>{children}</Shadow>
      <StretchLayout factor={fa}>{children}</StretchLayout>
    </ArrowWrap>
  </StretchWrapper>
);

export const StretchWithArrowMobile = ({
  fs,
  lh,
  pr,
  sr,
  fa,
  dir,
  children,
  handleClick,
}) => (
  <StretchWrapper
    fontSize={fs}
    lineh={lh}
    ref={pr}
    onClick={() => handleClick()}
  >
    <Shadow ref={sr}>
      <ArrowWrap dir={dir} isMobile={true}>
        {children}
      </ArrowWrap>
    </Shadow>
    <StretchLayout ref={pr} factor={fa}>
      <ArrowWrap dir={dir} isMobile={true}>
        {children}
      </ArrowWrap>
    </StretchLayout>
  </StretchWrapper>
);

export const StretchComponent = ({
  fs,
  lh,
  pr,
  sr,
  fa,
  dir,
  children,
  handleClick,
  isMobile,
}) => {
  return isMobile ? (
    <StretchWithArrowMobile
      fs={fs}
      lh={lh}
      pr={pr}
      sr={sr}
      fa={fa}
      dir={dir}
      handleClick={() => handleClick()}
    >
      {children}
    </StretchWithArrowMobile>
  ) : (
    <StretchWithArrowDesktop
      fs={fs}
      lh={lh}
      pr={pr}
      sr={sr}
      fa={fa}
      dir={dir}
      handleClick={() => handleClick()}
    >
      {children}
    </StretchWithArrowDesktop>
  );
};
