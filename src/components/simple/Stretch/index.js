import React, { useEffect, useRef, useState } from "react";
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
    let pval = preferredSize;
    if (isNaN(pval) && size.height) {
      if (pval.includes("px")) {
        pval = (parseFloat(pval.replace("px", "")) / size.height) * 100;
        setLineHeight(1);
      } else if (pval.includes("%")) {
        pval =
          (parseFloat(pval.replace("%", "")) * (size.height - 180)) /
          size.height;
      }
    }
    if (pval !== fontSize) {
      setFontSize(pval);
    }
  }, [preferredSize, size.height]);

  useEffect(() => {
    if (titleId && fontSize && size.width && stretchRef?.current?.clientWidth) {
      const timer = setTimeout(() => {
        let f = (size.width - 33) / stretchRef?.current?.clientWidth;
        setFactor(f);
      }, 300);
      return () => {
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
