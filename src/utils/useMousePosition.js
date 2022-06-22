import { useState, useEffect, useCallback, useRef } from "react";

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [intervalPosition, setIntervalPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const setFromEvent = e => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", setFromEvent);

    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, []);
  useInterval(() => {
    // Your custom logic here
    setIntervalPosition(position);
  }, 40);

  return intervalPosition;
};

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export function useInactive() {
  const [inactiveTime, setInactiveTime] = useState(0);

  const increaseInactiveTime = useCallback(() => {
    const newTime = inactiveTime + 500;
    setInactiveTime(newTime);
  }, [inactiveTime, setInactiveTime]);

  const resetInactiveTime = useCallback(() => {
    setInactiveTime(0);
  }, [setInactiveTime]);

  useEffect(() => {
    window.addEventListener("mousemove", resetInactiveTime);
    window.addEventListener("click", resetInactiveTime);
    window.addEventListener("touchstart", resetInactiveTime);
    const intervalId = setInterval(increaseInactiveTime, 500);
    return () => {
      window.removeEventListener("mousemove", resetInactiveTime);
      window.removeEventListener("click", resetInactiveTime);
      window.removeEventListener("touchstart", resetInactiveTime);

      clearInterval(intervalId);
    };
  }, [increaseInactiveTime, resetInactiveTime]);

  const inactive = inactiveTime >= 5000;

  return { inactive };
}

export default useMousePosition;
