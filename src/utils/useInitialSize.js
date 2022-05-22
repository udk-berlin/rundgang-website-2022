import { useState, useCallback } from "react";
export const getSize = node => {
  if (node) {
    return {
      height: node?.clientHeight,
      width: node?.clientWidth,
    };
  }
  return {
    height: 0,
    width: 0,
  };
};

export const useStateRef = processNode => {
  const [node, setNode] = useState(null);
  const setRef = useCallback(newNode => {
    setNode(processNode(newNode));
  }, []);
  return [node, setRef];
};
