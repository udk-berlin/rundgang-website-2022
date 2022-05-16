import React from "react";
import styled from "styled-components";

const Grundriss = styled.img`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  zindex: 40;
  cursor: pointer;

  -webkit-filter: drop-shadow(0px 0px 4px rgb(226, 255, 93));
  filter: drop-shadow(0px 0px 4px rgb(226, 255, 93));
`;
const GrundrissMarker = ({ el, size }) => {
  return (
    <Grundriss
      id={el.id}
      pitchAlignment="map"
      rotationAlignment="map"
      size={size}
      src={`/assets/img/${el.image}.svg`}
    ></Grundriss>
  );
};

export default GrundrissMarker;
