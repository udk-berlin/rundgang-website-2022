import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import useWindowSize from "@/utils/useWindowSize";

const StretchWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  line-height: ${({ lineh }) => lineh};
  letter-spacing: 0.1px;
  font-size: ${({ fontSize }) => fontSize}vh;
  margin-right: 20px;
  margin-left: 8px;
  width: 100%;
`;

const StretchLayout = styled.div`
  transform-origin: 0% 0%;
  text-align: left;
  z-index: 1;
  width: fit-content;
  height: fit-content;
  transform: ${({ factor }) => `scaleX(${factor})`};
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

const ArrowStyled = styled.span`
  position: ${({ right }) => (right ? "absolute" : "relative")};
  right: ${({ right }) => (right ? "0px" : "auto")};
  font-size: inherit;
  font-family: "Inter";
`;

const ChildrenWrapper = styled.span`
  &:hover {
    color: #333;
  }
`;

const ArrowWrap = ({ dir, isMobile, children }) => (
  <>
    {dir && (dir == "left" || dir == "top") ? (
      dir == "left" ? (
        <ArrowStyled>&#8592;</ArrowStyled>
      ) : (
        <ArrowStyled>&#8593;</ArrowStyled>
      )
    ) : null}
    <ChildrenWrapper>{children}</ChildrenWrapper>
    {dir && (dir == "right" || dir == "bottom") ? (
      dir == "right" ? (
        <ArrowStyled right={!isMobile}>&#8594;</ArrowStyled>
      ) : (
        <ArrowStyled right={!isMobile}>&#8595;</ArrowStyled>
      )
    ) : null}
  </>
);

const StretchWithArrowDesktop = ({ fs, lh, pr, sr, fa, dir, children }) => (
  <StretchWrapper fontSize={fs} lineh={lh} ref={pr}>
    <ArrowWrap dir={dir} isMobile={false}>
      <Shadow ref={sr}>{children}</Shadow>
      <StretchLayout factor={fa}>{children}</StretchLayout>
    </ArrowWrap>
  </StretchWrapper>
);

const StretchWithArrowMobile = ({ fs, lh, pr, sr, fa, dir, children }) => (
  <StretchWrapper fontSize={fs} lineh={lh} ref={pr}>
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

const Stretch = ({
  children,
  titleId,
  preferredSize,
  arrowDir,
  lineh = 0.9,
}) => {
  const stretchRef = useRef();
  const parentRef = useRef();
  const size = useWindowSize();
  const isMobile = useMemo(() => size.width < 786, [size]);

  const [fontSize, setFontSize] = useState(null);
  const [factor, setFactor] = useState(1);

  useEffect(() => {
    if (
      fontSize &&
      stretchRef?.current?.clientWidth &&
      parentRef?.current?.clientWidth
    ) {
      let arrWidth = arrowDir ? 1 : 0;
      arrWidth = isMobile ? 0 : arrWidth * 5.7 * preferredSize;
      const padding = isMobile ? 20 : 50 + arrWidth;
      /* console.log(
        parentRef?.current?.clientWidth,
        stretchRef?.current?.clientWidth,
        titleId,
        -padding - arrWidth * preferredSize,
      ); */
      let f =
        (parentRef?.current?.clientWidth - padding) /
        stretchRef?.current?.clientWidth;
      setFactor(f);
    }
  }, [
    titleId,
    parentRef?.current?.clientWidth,
    isMobile,
    stretchRef?.current?.clientWidth,
  ]);

  useEffect(() => {
    if (preferredSize) {
      setFontSize(preferredSize);
    } else {
      setFontSize(11);
    }
  }, [titleId, parentRef?.current?.clientWidth]);

  return isMobile ? (
    <StretchWithArrowMobile
      fs={fontSize}
      lh={lineh}
      pr={parentRef}
      sr={stretchRef}
      fa={factor}
      dir={arrowDir}
    >
      {children}
    </StretchWithArrowMobile>
  ) : (
    <StretchWithArrowDesktop
      fs={fontSize}
      lh={lineh}
      pr={parentRef}
      sr={stretchRef}
      fa={factor}
      dir={arrowDir}
    >
      {children}
    </StretchWithArrowDesktop>
  );
};

export default Stretch;
