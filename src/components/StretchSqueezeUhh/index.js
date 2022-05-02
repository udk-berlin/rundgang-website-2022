import react, { useCallback, useEffect, useRef, useState } from "react";
import Scaler, { TestScaler, STRETCH_ANIMATIONS } from "./scaleAnimationStyles";
import useWindowSize from "@/hooks/useWindowSize";
import useInitialSize from "@/hooks/useInitialSize";
import { useDebounce } from "@/hooks/useDebounce";

const StretchSqueeze = ({
  position = "left",
  fontSize = 3,
  visible = true,
  width = null,
  height = null,
  stretchOut = true,
  wrappingText = false,
  children,
}) => {
  const [originalSize, setRef] = useInitialSize();
  const [scaling, setScaling] = useState();
  const [scaledSize, setScaledSize] = useState();
  const size = useWindowSize();
  const debouncedSize = useDebounce(size, 800);

  useEffect(() => {
    if (debouncedSize.width && scaledRef?.current && stretchOut) {
      let scaledWidth = width ?? debouncedSize.width;
      let scaledHeight = height ?? (fontSize * debouncedSize.width) / 100;
      setScaledSize([scaledWidth, scaledHeight]);
    } else if (!stretchOut) {
      let scaledWidth = width ?? debouncedSize.width;
      let scaledHeight = height ?? (fontSize * debouncedSize.width) / 100;
      setScaledSize([scaledWidth, scaledHeight]);
    }
  }, [debouncedSize]);

  useEffect(() => {
    if (scaledSize && originalSize && stretchOut) {
      if (position == "left" || position == "right") {
        setScaling([
          scaledSize[0] / originalSize.width,
          scaledSize[1] / originalSize.height,
          scaledSize[0] - originalSize.width,
        ]);
      } else {
        setScaling([
          scaledSize[0] / originalSize.width,
          scaledSize[1] / originalSize.height,
          scaledSize[1] - originalSize.height,
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
        wrappingText={wrappingText}
        ref={setRef}
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
          wrappingText={wrappingText}
        >
          {children}
        </Scaler>
      ) : null}
    </>
  );
};

export default StretchSqueeze;
