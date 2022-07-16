import React from "react";
import styled from "styled-components";

const Grundriss = styled.img`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  z-index: 40;
  cursor: pointer;
  pointer-events: fill;

  -webkit-filter: drop-shadow(0px 0px 8px rgb(226, 255, 93));
  filter: drop-shadow(0px 0px 8px rgb(226, 255, 93));
`;
const GrundrissMarker = ({ el, size, onlyPoints = true }) => {
  return el.isFound ? (
    <Grundriss
      id={`${el.id}-marker`}
      pitchAlignment="map"
      rotationAlignment="map"
      size={size}
      src={
        onlyPoints
          ? "/assets/img/location-external.svg"
          : `/assets/img/${el.image}.svg`
      }
    ></Grundriss>
  ) : null;
};

export default GrundrissMarker;
