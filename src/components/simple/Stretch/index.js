import React, { useEffect, useMemo, useRef, useState } from "react";
import useWindowSize from "@/utils/useWindowSize";
import { StretchComponent } from "./components";

const Stretch = ({
  children,
  titleId,
  preferredSize,
  arrowDir,
  handleClick = () => {},
  lineh = 0.9,
}) => {
  const stretchRef = useRef();
  const parentRef = useRef();
  const size = useWindowSize();
  const isMobile = useMemo(() => size.width < 786, [size]);
  const [factor, setFactor] = useState(1);

  useEffect(() => {
    if (
      preferredSize &&
      stretchRef?.current?.clientWidth &&
      parentRef?.current?.clientWidth
    ) {
      let arrWidth = isMobile ? 0 : preferredSize;
      const padding = isMobile ? 20 : 50 + arrWidth;
      console.log(
        parentRef?.current?.clientWidth,
        stretchRef?.current?.clientWidth,
        titleId,
        padding,
        size.width,
      );
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
    size.width,
  ]);

  return size.width ? (
    <StretchComponent
      fs={preferredSize}
      lh={lineh}
      pr={parentRef}
      sr={stretchRef}
      fa={factor}
      dir={arrowDir}
      handleClick={() => handleClick()}
      isMobile={isMobile}
    >
      {children}
    </StretchComponent>
  ) : null;
};

export default Stretch;
