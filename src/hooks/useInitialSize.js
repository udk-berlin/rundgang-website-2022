import { useState, useCallback } from "react";

// Hook
const useInitialSize = () => {
  const getSize = node => {
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

  const useStateRef = processNode => {
    const [node, setNode] = useState(null);
    const setRef = useCallback(
      newNode => {
        setNode(processNode(newNode));
      },
      [processNode],
    );
    return [node, setRef];
  };
  return useStateRef(getSize);
};

export default useInitialSize;
