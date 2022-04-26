import { useState, useEffect } from "react";

const useTypewriterEffect = (text, durationInMilliseconds) => {
  const [char, setChar] = useState(0);
  const [durationArray, setDurationArray] = useState([]);

  useEffect(() => {
    setDurationArray([]);
    setChar(0);
  }, [text]);

  useEffect(() => {
    let leftover = durationInMilliseconds;

    const arr = [...Array(text.length).keys()].reduce((prev, idx) => {
      if (idx === text.length - 1) {
        return [...prev, leftover];
      }

      const base = leftover / (text.length - idx);
      const dur = base * 0.5 + Math.random() * base * 1.0;
      leftover = leftover - dur;

      return [...prev, dur];
    }, []);

    setDurationArray(arr);
  }, [text, durationInMilliseconds, setDurationArray]);

  useEffect(() => {
    if (char < text.length) {
      const time = setTimeout(() => {
        setChar(char + 1);
      }, durationArray[char] || 0);

      // Clear timeout if the component is unmounted
      return () => {
        clearTimeout(time);
      };
    }

    return;
  }, [char, text, durationArray, setChar]);

  return text.substr(0, char);
};
export default useTypewriterEffect;
