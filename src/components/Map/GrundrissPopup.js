import React from "react";
import styled from "styled-components";
import { makeUrlFromId } from "@/utils/idUtils";

const PopupWrapper = styled.div`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  z-index: 40;
  cursor: pointer;
  background: rgb(226, 255, 93);
`;
const GrundrissPopup = ({ el, locale }) => {
  return (
    <PopupWrapper id={el.id}>
      <h3>{el.name}</h3>
      <a href={`/${locale}/orte/${makeUrlFromId(el.id)}`} >LINK</a>
    </PopupWrapper>
  );
};

export default GrundrissPopup;
