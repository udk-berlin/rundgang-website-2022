import react, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export const Scaler = styled.div`
  width: fit-content;
  height: fit-content;
  line-height: 1;
  font-family: "Diatype";
  position: relative;
  font-size: ${({ fontSize }) => `${fontSize}vw`};
  left: ${({ position }) => (position == "left" ? 0 : "auto")};
  right: ${({ position }) => (position == "right" ? 0 : "auto")};
  top: ${({ position }) => (position == "top" ? 0 : "auto")};
  bottom: ${({ position }) => (position == "bottom" ? 0 : "auto")};
  text-align: ${({ position }) => (position == "right" ? "right" : "left")};
  justify-content: ${({ position }) =>
    position == "right" ? "flex-end" : "flex-start"};
  transform-origin: ${({ position }) => STRETCH_ANIMATIONS[position][2]};
  animation-name: ${({ animationName }) => animationName};
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  margin-left: ${({ position, scaling }) =>
    position == "right" ? `${scaling[2]}px` : 0};
  margin-top: ${({ position, scaling }) =>
    position == "bottom" ? `${scaling[2]}px` : 0};
  white-space: nowrap;

  @keyframes stretchInW {
    0% {
      transform: scaleX(0);
      width: 0px;
    }
    30% {
      width: ${({ originialSize }) => `${originialSize[0] * 0.5}px`};
      transform: scaleX(0.5);
    }
    60% {
      width: ${({ originialSize }) => `${originialSize[0]}px`};
      transform: scaleX(1);
    }
    100% {
      transform: ${({ scaling }) => `scaleX(${scaling[0]})`};
    }
  }

  @keyframes stretchOutW {
    0% {
      transform: ${({ scaling }) => `scaleX(${scaling[0]})`};
    }
    30% {
      width: ${({ originialSize }) => `${originialSize[0]}px`};
      transform: scaleX(1);
    }
    60% {
      width: ${({ originialSize }) => `${0.5 * originialSize[0]}px`};
      transform: scaleX(0.5);
    }
    100% {
      transform: scaleX(0);
      width: 0px;
    }
  }

  @keyframes stretchInH {
    0% {
      height: 0px;
      transform: ${({ scaling }) => `scaleX(${scaling[0]}) scaleY(0)`};
    }
    30% {
      transform: ${({ scaling }) => `scaleX(${scaling[0]}) scaleY(0.5)`};
      height: ${({ originialSize }) => `${0.5 * originialSize[1]}px`};
    }
    60% {
      transform: ${({ scaling }) => `scaleX(${scaling[0]}) scaleY(1)`};
      height: ${({ originialSize }) => `${originialSize[1]}px`};
    }
    100% {
      transform: ${({ scaling }) =>
        `scaleX(${scaling[0]}) scaleY(${scaling[1]})`};
    }
  }

  @keyframes stretchOutH {
    0% {
      transform: ${({ scaling }) =>
        `scaleX(${scaling[0]}) scaleY(${scaling[1]})`};
    }
    30% {
      height: ${({ originialSize }) => `${originialSize[1]}px`};
      transform: ${({ scaling }) => `scaleX(${scaling[0]}) scaleY(1)`};
    }
    60% {
      height: ${({ originialSize }) => `${0.5 * originialSize[1]}px`};
      transform: ${({ scaling }) => `scaleX(${scaling[0]}) scaleY(0.5)`};
    }
    100% {
      height: 0px;
      transform: ${({ scaling }) => `scaleX(${scaling[0]}) scaleY(0)`};
    }
  }
`;

const STRETCH_ANIMATIONS = {
  left: ["stretchInW", "stretchOutW", "top left", "red"],
  right: ["stretchInW", "stretchOutW", "top right", "blue"],
  top: ["stretchInH", "stretchOutH", "top left", "red"],
  bottom: ["stretchInH", "stretchOutH", "bottom left", "blue"],
};

const StretchSqueeze = ({
  position = "left",
  fontSize = 3,
  visible = true,
  width,
  height,
  text,
}) => {
  const scaledRef = useRef();
  const [scaling, setScaling] = useState(0);
  const [originialSize, setOriginalSize] = useState([0, 0]);
  useEffect(() => {
    const textWidth = scaledRef.current.offsetWidth;
    const textHeight = (fontSize * window.innerWidth) / 100;
    console.log(textWidth, textHeight);
    setOriginalSize([textWidth, textHeight]);
  }, [position, text, width, height]);

  useEffect(() => {
    if (position == "left" || position == "right") {
      setScaling([
        width / originialSize[0],
        height / originialSize[1],
        width - originialSize[0],
      ]);
    } else {
      setScaling([
        width / originialSize[0],
        height / originialSize[1],
        height - originialSize[1],
      ]);
    }
  }, [originialSize]);

  return (
    <Scaler
      ref={scaledRef}
      originialSize={originialSize}
      width={width}
      height={height}
      animationName={STRETCH_ANIMATIONS[position][visible ? 0 : 1]}
      scaling={scaling}
      position={position}
      fontSize={fontSize}
    >
      {text}
    </Scaler>
  );
};

export default StretchSqueeze;
