import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ClickAwayListener from "../simple/ClickAwayListener";

const DetailView = styled.img`
  height: 90%;
  width: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: 0;
  right: 0;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    height: auto;
    width: 90%;
  }
`;

const DetailWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.highlight};
`;

const CloseButton = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.spacing.md};
  line-height: 0.9;
  top: ${({ theme }) => theme.spacing.md};
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
