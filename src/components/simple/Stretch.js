import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import useWindowSize from "@/utils/useWindowSize";

const StretchWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  line-height: ${({ lineh }) => lineh};
  letter-spacing: 0.1px;
  font-size: ${({ fontSize }) => fontSize}vh;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    line-height: ${({ lineh }) => 0.8 * lineh};
  }
`;

const StretchLayout = styled.div`
  transform-origin: 0% 0%;
  text-align: left;
  width: max-content;
  height: fit-content;
  transform: ${({ factor }) => `scaleX(${factor})`};
`;

const Shadow = styled.div`
  opacity: 0;
  width: max-content;
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
      const arrWidth = arrowDir && !isMobile ? 5.7 : 0;
      const padding = isMobile ? 20 : 50;
      let f =
        (size.width - padding - arrWidth * preferredSize) /
        stretchRef?.current?.clientWidth;

      setFactor(f);
    }
  }, [titleId, size]);

  useEffect(() => {
    // TODO: multiple conditions to perfect sizing
    if (preferredSize) {
      setFontSize(preferredSize);
    } else {
      setFontSize(11);
    }
  }, [titleId]);

  return isMobile ? <StretchWithArrowMobile /> : <StretchWithArrowDesktop />;
};

export default Stretch;
