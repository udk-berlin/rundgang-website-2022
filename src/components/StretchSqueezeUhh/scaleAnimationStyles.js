import styled from "styled-components";

export const STRETCH_ANIMATIONS = {
  left: ["stretchInW", "stretchOutW", "top left", "red"],
  right: ["stretchInW", "stretchOutW", "top right", "blue"],
  top: ["stretchInH", "stretchOutH", "top left", "red"],
  bottom: ["stretchInH", "stretchOutH", "bottom left", "blue"],
};

export const TestScaler = styled.div`
  width: fit-content;
  height: fit-content;
  pointer-events: none;
  z-index: 0;
  opacity: 0;
  position: absolute;
  white-space: ${({ wrappingText }) => (wrappingText ? "pre" : "nowrap")};
  line-height: 1;
  font-family: "Diatype";
  font-size: ${({ fontSize }) => `${fontSize}vw`};
  text-align: ${({ position }) => (position == "right" ? "right" : "left")};
  justify-content: ${({ position }) =>
    position == "right" ? "flex-end" : "flex-start"};
  left: ${({ position }) => (position == "left" ? 0 : "auto")};
  right: ${({ position }) => (position == "right" ? 0 : "auto")};
  top: ${({ position }) => (position == "top" ? 0 : "auto")};
  bottom: ${({ position }) => (position == "bottom" ? 0 : "auto")};
`;

const Scaler = styled.div`
  width: fit-content;
  height: fit-content;
  position: relative;
  white-space: ${({ wrappingText }) => (wrappingText ? "pre" : "nowrap")};
  line-height: 1;
  font-family: "Diatype";
  font-size: ${({ fontSize }) => `${fontSize}vw`};
  text-align: ${({ position }) => (position == "right" ? "right" : "left")};
  justify-content: ${({ position }) =>
    position == "right" ? "flex-end" : "flex-start"};
  left: ${({ position }) => (position == "left" ? 0 : "auto")};
  right: ${({ position }) => (position == "right" ? 0 : "auto")};
  top: ${({ position }) => (position == "top" ? 0 : "auto")};
  bottom: ${({ position }) => (position == "bottom" ? 0 : "auto")};
  transform-origin: ${({ position }) => STRETCH_ANIMATIONS[position][2]};
  animation-name: ${({ animationName }) => animationName};
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  padding-left: ${({ position, scaling }) =>
    position == "right" ? `${scaling[2]}px` : 0};
  padding-top: ${({ position, scaling, stretchOut }) =>
    position == "bottom" && stretchOut ? `${scaling[2]}px` : 0};

  @keyframes stretchInW {
    0% {
      transform: scaleX(0);
      width: 0px;
    }
    30% {
      width: ${({ originalSize }) => `${originalSize[0] * 0.5}px`};
      transform: ${({ scaling }) => `scaleX(${scaling[0] * 0.4})`};
    }
    60% {
      width: ${({ originalSize }) => `${originalSize[0]}px`};
      transform: ${({ scaling }) => `scaleX(${scaling[0] * 0.7})`};
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
      width: ${({ originalSize }) => `${originalSize[0]}px`};
      transform: ${({ scaling }) => `scaleX(${scaling[0] * 0.7})`};
    }
    60% {
      width: ${({ originalSize }) => `${0.5 * originalSize[0]}px`};
      transform: ${({ scaling }) => `scaleX(${scaling[0] * 0.4})`};
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
      transform: ${({ scaling }) =>
        `scaleX(${scaling[0]}) scaleY(${scaling[1] * 0.3})`};
      height: ${({ originalSize }) => `${0.3 * originalSize[1]}px`};
    }
    60% {
      transform: ${({ scaling }) =>
        `scaleX(${scaling[0]}) scaleY(${scaling[1] * 0.6} )`};
      height: ${({ originalSize }) => `${0.6 * originalSize[1]}px`};
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
      height: ${({ originalSize }) => `${0.6 * originalSize[1]}px`};
      transform: ${({ scaling }) =>
        `scaleX(${scaling[0]}) scaleY(${scaling[1] * 0.6})`};
    }
    60% {
      height: ${({ originalSize }) => `${0.3 * originalSize[1]}px`};
      transform: ${({ scaling }) =>
        `scaleX(${scaling[0]}) scaleY(${scaling[1] * 0.3})`};
    }
    100% {
      height: 0px;
      transform: ${({ scaling }) => `scaleX(${scaling[0]}) scaleY(0)`};
    }
  }
`;
export default Scaler;
