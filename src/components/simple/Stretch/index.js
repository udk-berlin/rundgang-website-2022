import React, { useEffect, useMemo, useRef, useState } from "react";
import useMediaQuery from "@/utils/useMediaQuery";
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
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [factor, setFactor] = useState(0);

  useEffect(() => {
    if (
      titleId &&
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
        setFactor(0);
        clearTimeout(timer);
      };
    }
  }, [
    titleId,
    preferredSize,
    parentRef?.current?.clientWidth,
    isMobile,
    stretchRef?.current?.clientWidth,
  ]);

  return (
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
  );
};

export default observer(Stretch);
