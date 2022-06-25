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

const Stretch = ({
  children,
  titleId,
  preferredSize,
  arrowDir,
  lineh = 0.9,
}) => {
  const stretchRef = useRef();
  const size = useWindowSize();
  const isMobile = useMemo(() => size.width < 786, [size]);

  const [fontSize, setFontSize] = useState(null);
  const [factor, setFactor] = useState(1);

  const Arrow = () => {
    switch (arrowDir) {
      case "left":
        return <ArrowStyled>&#8592;</ArrowStyled>;
      case "right":
        return <ArrowStyled right={!isMobile}>&#8594;</ArrowStyled>;
      case "top":
        return <ArrowStyled>&#8593;</ArrowStyled>;
      case "bottom":
        return <ArrowStyled right={!isMobile}>&#8595;</ArrowStyled>;
      default:
        return "";
    }
  };

  const StretchWithArrowDesktop = () => (
    <StretchWrapper fontSize={fontSize} lineh={lineh}>
      {arrowDir && (arrowDir == "left" || arrowDir == "top") ? <Arrow /> : null}
      <Shadow ref={stretchRef}>{children}</Shadow>
      <StretchLayout factor={factor}>{children}</StretchLayout>
      {arrowDir && (arrowDir == "right" || arrowDir == "bottom") ? (
        <Arrow />
      ) : null}
    </StretchWrapper>
  );

  const StretchWithArrowMobile = () => (
    <StretchWrapper fontSize={fontSize} lineh={lineh}>
      <Shadow ref={stretchRef}>
        {arrowDir && (arrowDir == "left" || arrowDir == "top") ? (
          <Arrow />
        ) : null}
        {children}
        {arrowDir && (arrowDir == "right" || arrowDir == "bottom") ? (
          <Arrow />
        ) : null}
      </Shadow>
      <StretchLayout factor={factor}>
        {arrowDir && (arrowDir == "left" || arrowDir == "top") ? (
          <Arrow />
        ) : null}
        {children}
        {arrowDir && (arrowDir == "right" || arrowDir == "bottom") ? (
          <Arrow />
        ) : null}
      </StretchLayout>
    </StretchWrapper>
  );

  useEffect(() => {
    if (fontSize && stretchRef?.current?.clientWidth) {
      console.log(stretchRef?.current?.clientWidth, size.width);
      let arrWidth = arrowDir ? 1 : 0;
      arrWidth = isMobile ? arrWidth : arrWidth * 5.7;
      const padding = isMobile ? 0 : 50;
      let f =
        (size.width - padding - arrWidth * preferredSize) /
        stretchRef?.current?.clientWidth;
      setFactor(f);
    }
  }, [titleId, size, isMobile]);

  useEffect(() => {
    if (preferredSize) {
      setFontSize(preferredSize);
    } else {
      setFontSize(11);
    }
  }, [titleId, size]);

  return isMobile ? <StretchWithArrowMobile /> : <StretchWithArrowDesktop />;
};

export default Stretch;
