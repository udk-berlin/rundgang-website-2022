import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ClickAwayListener from "../simple/ClickAwayListener";

const DetailView = styled.img`
  height: 90%;
  width: auto;
  display: block;
  margin: auto;
  margin-top: 2.5%;
`;

const DetailWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: block;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.highlight};
`;

const CloseButton = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing.xs};
  top: ${({ theme }) => theme.spacing.xs};
  font-family: "Diatype";
  border: none;
  width: fit-content;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  cursor: pointer;
`;

const ImageDetailView = ({ src, handleClose, open }) => {
  return open ? (
    <DetailWrapper>
      <ClickAwayListener onClickAway={() => handleClose()}>
        <DetailView src={src} />
      </ClickAwayListener>
      <CloseButton onClick={() => handleClose()}>&#57344;</CloseButton>
    </DetailWrapper>
  ) : null;
};

export default ImageDetailView;
