import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";

const AudioPlayerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
`;

const PlayButton = styled.button`
  cursor: pointer;
  border: none;
  color: black;
  background: inherit;
  font-size: 30px;
  margin: 18px 0 16px 16px;
`;

const CurrentTimeWrapper = styled.div`
  display: inline-block;
  text-align: center;
  font-size: 20px;
  margin: 28.5px 0 16px 16px;
`;

const TimeLine = styled.input`
  width: 100%;
  flex-grow: 1;
  position: relative;
  -webkit-appearance: none;
  margin: 0;
  padding: 0;
  height: 19px;
  margin: 30px 0 20px 16px;
  float: left;
  outline: none;
  background: inherit;
  &::-webkit-slider-runnable-track {
    background: #00000055;
  }
  &::-moz-range-track {
    background: #00000055;
  }
  &::-ms-fill-upper {
    background: #00000055;
  }
  &::before {
    width: 100%;
  }
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 3px;
    cursor: pointer;
    background: ${({ theme }) => theme.colors.highlight};
  }
  &::before {
    position: absolute;
    content: "";
    top: 6px;
    left: 0;
    width: 100%;
    height: 6px;
    background-color: ${({ theme }) => theme.colors.highlight};
    cursor: pointer;
  }
  &::-webkit-slider-thumb {
    position: relative;
    -webkit-appearance: none;
    box-sizing: content-box;
    border: 1px solid black;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: black;
    cursor: pointer;
    margin: -10px 0 0 0;
  }
  &:active::-webkit-slider-thumb {
    transform: scale(1.2);
    background: ${({ theme }) => theme.colors.highlight};
  }
  ::-moz-range-track {
    width: 100%;
    height: 3px;
    cursor: pointer;
    background: ${({ theme }) => theme.colors.highlight};
  }
  &::-moz-range-progress {
    background-color: ${({ theme }) => theme.colors.highlight};
  }
  &::-moz-focus-outer {
    border: 0;
  }
  &::-moz-range-thumb,
  &::-ms-thumb {
    box-sizing: content-box;
    border: 1px solid ${({ theme }) => theme.colors.highlight};
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: black;
    cursor: pointer;
  }
  &:active::-moz-range-thumb,
  &:active::-ms-thumb {
    transform: scale(1.2);
    background: ${({ theme }) => theme.colors.highlight};
  }
  &::-ms-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    background: transparent;
    border: solid transparent;
    color: transparent;
  }
  &::-ms-fill-lower {
    background-color: ${({ theme }) => theme.colors.highlight};
  }
  &::-ms-fill-upper {
    background: ${({ theme }) => theme.colors.highlight};
  }
`;

const padTime = i => (i < 10 ? `0${i}` : `${i}`);

export const minsToHHMMSS = secs => {
  const roundedSecs = Math.round(secs);

  const hours = Math.floor(roundedSecs / 3600);
  const minutes = Math.floor((roundedSecs - hours * 3600) / 60);
  const seconds = roundedSecs - hours * 3600 - minutes * 60;

  return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
};

const AudioPlayer = ({ item }) => {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleClickPay = useCallback(() => {
    if (audioRef?.current && duration == 0) {
      setDuration(audioRef.current.duration);
    }
    if (isPlaying && !audioRef.current.paused) {
      audioRef?.current?.pause();
      setIsPlaying(false);
    } else if (audioRef.current.paused) {
      audioRef?.current?.play();
      setIsPlaying(true);
    }
  }, [isPlaying, audioRef?.current?.paused]);

  const handleTimeUpdate = useCallback(
    e => {
      setCurrentTime(e.target.currentTime);
      if (duration > 0 && duration - e.target.currentTime < 0.05) {
        setIsPlaying(false);
      }
    },
    [currentTime],
  );

  const handleChangeTime = useCallback(
    e => {
      audioRef?.current?.pause();
      audioRef.current.currentTime = e.target.value;
      setCurrentTime(e.target.value);
      audioRef?.current?.play();
    },
    [currentTime],
  );

  return (
    <AudioPlayerWrapper>
      <audio id="player" ref={audioRef} onTimeUpdate={e => handleTimeUpdate(e)}>
        <source src={item.content} type="audio/mpeg" />
      </audio>
      <PlayButton onClick={() => handleClickPay()}>
        {isPlaying ? <span>&#9632;</span> : <span>&#9654;</span>}
      </PlayButton>
      <CurrentTimeWrapper>{minsToHHMMSS(currentTime)}</CurrentTimeWrapper>
      <TimeLine
        type="range"
        max={duration}
        min={0}
        value={currentTime}
        onChange={e => handleChangeTime(e)}
      />

      <CurrentTimeWrapper>{minsToHHMMSS(duration)}</CurrentTimeWrapper>
    </AudioPlayerWrapper>
  );
};

export default AudioPlayer;
