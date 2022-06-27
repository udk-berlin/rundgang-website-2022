import React, { useEffect, useMemo, useRef, useState } from "react";
import useWindowSize from "@/utils/useWindowSize";
import { StretchComponent } from "./components";
import { observer } from "mobx-react";

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
      titleId &&
      size.width &&
      preferredSize &&
      stretchRef?.current?.clientWidth &&
      parentRef?.current?.clientWidth
    ) {
      const timer = setTimeout(() => {
        let arrWidth = isMobile ? 0 : 7.5;
        const padding = preferredSize * arrWidth + 8;
        let f =
          (parentRef?.current?.clientWidth - padding) /
          stretchRef?.current?.clientWidth;

        setFactor(f);
      }, 200);
      return () => {
        setFactor(1);
        clearTimeout(timer);
      };
    }
  }, [
    titleId,
    preferredSize,
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

export default observer(Stretch);
