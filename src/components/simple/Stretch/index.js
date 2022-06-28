import React, { useEffect, useMemo, useRef, useState } from "react";
import useMediaQuery from "@/utils/useMediaQuery";
import { StretchComponent } from "./components";
import { observer } from "mobx-react";
import useWindowSize from "@/utils/useWindowSize";

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
  const isMobile = useMediaQuery("only screen and (max-width:821px) and (orientation:portrait)");
  const size = useWindowSize();
  const [factor, setFactor] = useState(0);
  const [fontSize, setFontSize] = useState(0);
  useEffect(() => {
    if (isNaN(preferredSize) && preferredSize.includes("px") && size.height) {
      let pval = parseFloat(preferredSize.replace("px", ""));
      setFontSize((pval / size.height) * 100);
    } else if (
      isNaN(preferredSize) &&
      preferredSize.includes("%") &&
      size.height
    ) {
      let pval = parseFloat(preferredSize.replace("%", ""));
      let val = (pval * (size.height - 180)) / size.height;
      console.log(pval, val);
      setFontSize(val);
    } else {
      setFontSize(preferredSize);
    }
  }, [preferredSize, size.height]);

  useEffect(() => {
    if (
      titleId &&
      fontSize &&
      stretchRef?.current?.clientWidth &&
      parentRef?.current?.clientWidth
    ) {
      const timer = setTimeout(() => {
        let arrWidth = isMobile ? 0 : 7.5;
        const padding = fontSize * arrWidth + 8;
        let f =
          (parentRef?.current?.clientWidth - padding) /
          stretchRef?.current?.clientWidth;

        setFactor(f);
      }, 300);
      return () => {
        setFactor(0);
        clearTimeout(timer);
      };
    }
  }, [
    titleId,
    fontSize,
    parentRef?.current?.clientWidth,
    isMobile,
    stretchRef?.current?.clientWidth,
  ]);

  return (
    <StretchComponent
      fs={fontSize}
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
