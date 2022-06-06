import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useWindowSize from "@/utils/useWindowSize";

const StretchWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  line-height: ${({ lineh }) => lineh};
  letter-spacing: 0.1px;
  font-size: ${({ fontSize }) => fontSize}vh;
  @media ${({ theme }) => theme.breakpoints.md} {
    font-size: ${({ fontSize }) => `${fontSize - 3}vh`};
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
  position: absolute;
  right: 20px;
`;

const Stretch = ({ children, title, preferredSize, arrowDir, lineh = 0.9 }) => {
  const stretchRef = useRef();
  const size = useWindowSize();
  const [fontSize, setFontSize] = useState(null);
  const [factor, setFactor] = useState(1);

  const Arrow = () => {
    switch (arrowDir) {
      case "left":
        return <span>&#8592;</span>;
      case "right":
        return <ArrowStyled>&#8594;</ArrowStyled>;
      case "top":
        return <span>&#8593;</span>;
      case "bottom":
        return <ArrowStyled>&#8595;</ArrowStyled>;
      default:
        return "";
    }
  };

  useEffect(() => {
    if (fontSize && stretchRef?.current?.clientWidth) {
      const arrWidth = arrowDir ? 5.7 : 0;
      let f =
        (size.width - 20 - arrWidth * preferredSize) /
        stretchRef?.current?.clientWidth;

      setFactor(f);
    }
  }, [title, size]);

  useEffect(() => {
    // TODO: multiple conditions to perfect sizing
    if (preferredSize) {
      setFontSize(preferredSize);
    } else if (title.length > 15) {
      setFontSize(9);
    } else {
      setFontSize(11);
    }
  }, [title]);
  return (
    <StretchWrapper fontSize={fontSize} lineh={lineh}>
      {arrowDir && (arrowDir == "left" || arrowDir == "top") ? <Arrow /> : null}
      <Shadow ref={stretchRef}>{children}</Shadow>
      <StretchLayout factor={factor}>{children}</StretchLayout>
      {arrowDir && (arrowDir == "right" || arrowDir == "bottom") ? (
        <Arrow />
      ) : null}
    </StretchWrapper>
  );
};

export default Stretch;
