import react, { useEffect, useRef, useState } from "react";
import Scaler, { TestScaler, STRETCH_ANIMATIONS } from "./scaleAnimationStyles";
import useWindowSize from "@/hooks/useWindowSize";
import { useDebounce } from "@/hooks/useDebounce";

const StretchSqueeze = ({
  position = "left",
  fontSize = 3,
  visible = true,
  width = null,
  height = null,
  stretchOut = true,
  children,
}) => {
  const scaledRef = useRef();
  const [scaling, setScaling] = useState();
  const [originalSize, setOriginalSize] = useState();
  const [scaledSize, setScaledSize] = useState();
  const size = useWindowSize();
  const debouncedSize = useDebounce(size, 800);

  useEffect(() => {
    if (debouncedSize.width && scaledRef?.current && stretchOut) {
      let textWidth = scaledRef.current.clientWidth;
      let textHeight = scaledRef.current.clientHeight;
      let scaledWidth = width ?? debouncedSize.width;
      let scaledHeight = height ?? (fontSize * debouncedSize.width) / 100;
      setScaledSize([scaledWidth, scaledHeight]);
      setOriginalSize([textWidth, textHeight]);
    } else if (!stretchOut) {
      let scaledWidth = width ?? debouncedSize.width;
      let scaledHeight = height ?? (fontSize * debouncedSize.width) / 100;
      setScaledSize([scaledWidth, scaledHeight]);
      setOriginalSize([scaledWidth, scaledHeight]);
    }
  }, [debouncedSize]);

  useEffect(() => {
    if (scaledSize && originalSize && stretchOut) {
      if (position == "left" || position == "right") {
        setScaling([
          scaledSize[0] / originalSize[0],
          scaledSize[1] / originalSize[1],
          scaledSize[0] - originalSize[0],
        ]);
      } else {
        setScaling([
          scaledSize[0] / originalSize[0],
          scaledSize[1] / originalSize[1],
          scaledSize[1] - originalSize[1],
        ]);
      }
    } else if (scaledSize && originalSize && !stretchOut) {
      setScaling([1, 1, 0]);
    }
  }, [originalSize]);

  return (
    <>
      <TestScaler
        position={position}
        fontSize={fontSize}
        stretchOut={stretchOut}
        width={width}
        height={height}
        ref={scaledRef}
      >
        {children}
      </TestScaler>
      {originalSize && scaling ? (
        <Scaler
          originalSize={originalSize}
          animationName={STRETCH_ANIMATIONS[position][visible ? 0 : 1]}
          scaling={scaling}
          position={position}
          fontSize={fontSize}
          stretchOut={stretchOut}
        >
          {children}
        </Scaler>
      ) : null}
    </>
  );
};

export default StretchSqueeze;
