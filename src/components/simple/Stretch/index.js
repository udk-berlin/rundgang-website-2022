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
}) => {
  const stretchRef = useRef();
  const parentRef = useRef();
  const size = useWindowSize();
  const [factor, setFactor] = useState(0);
  const [fontSize, setFontSize] = useState(0);
  const [lineHeight, setLineHeight] = useState(0.9);

  useEffect(() => {
    if (isNaN(preferredSize) && preferredSize.includes("px") && size.height) {
      let pval = parseFloat(preferredSize.replace("px", ""));
      setFontSize((pval / size.height) * 100);
      setLineHeight(1)
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
    if (titleId && fontSize && size.width && stretchRef?.current?.clientWidth) {
      const timer = setTimeout(() => {
        let f = size.width / stretchRef?.current?.clientWidth;
        setFactor(f);
      }, 300);
      return () => {
        setFactor(0);
        clearTimeout(timer);
      };
    }
  }, [titleId, fontSize, size.width, stretchRef?.current?.clientWidth]);

  return (
    <StretchComponent
      fs={fontSize}
      pr={parentRef}
      sr={stretchRef}
      lh={lineHeight}
      fa={factor}
      dir={arrowDir}
      handleClick={() => handleClick()}
    >
      {children}
    </StretchComponent>
  );
};

export default observer(Stretch);
