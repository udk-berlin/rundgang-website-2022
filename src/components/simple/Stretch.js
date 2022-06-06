import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useWindowSize from "@/utils/useWindowSize";

const StretchWrapper = styled.div`
  position: relative;
  line-height: ${({ lineh }) => lineh};
  letter-spacing: 0.1px;
  font-size: ${({ fontSize }) => `${fontSize}vh`};
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

const Stretch = ({ children, title, preferredSize, lineh = 0.9 }) => {
  const stretchRef = useRef();
  const size = useWindowSize();
  const [fontSize, setFontSize] = useState(null);
  const [factor, setFactor] = useState(1);

  useEffect(() => {
    if (fontSize && stretchRef?.current?.clientWidth) {
      let factor = (size.width - 20) / stretchRef?.current?.clientWidth;
      setFactor(factor);
    }
  }, [title, size]);

  useEffect(() => {
    // TODO: multiple conditions to perfect sizing
    if (preferredSize) {
      setFontSize(preferredSize);
    } else if (title.length > 15) {
      console.log(title);
      setFontSize(9);
    } else {
      setFontSize(11);
    }
  }, [title]);
  return (
    <StretchWrapper fontSize={fontSize} lineh={lineh}>
      <Shadow ref={stretchRef}>{children}</Shadow>
      <StretchLayout factor={factor}>{children}</StretchLayout>
    </StretchWrapper>
  );
};

export default Stretch;
