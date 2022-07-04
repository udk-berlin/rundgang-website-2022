import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ClickAwayListener from "react-click-away-listener";

const ImageWrapper = styled.div`
  display: block;
`;

const Image = styled.img`
  cursor: pointer;
  width: 100%;
  height: auto;
`;

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
  width: 100vw;
  height: 100%;
  background: ${({ theme }) => theme.colors.highlight};
`;

const CloseButton = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.space(16)};
  line-height: 0.9;
  top: ${({ theme }) => theme.space(16)};
  font-family: "Diatype";
  border: none;
  width: fit-content;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  cursor: pointer;
`;

const ImageDetailView = ({ src }) => {
  const [imageDetailOpen, setImageDetailOpen] = useState(false);
  return (
    <ImageWrapper>
      <Image src={src} onClick={() => setImageDetailOpen(true)} />
      {imageDetailOpen ? (
        <DetailWrapper>
          <ClickAwayListener onClickAway={() => setImageDetailOpen(false)}>
            <DetailView src={src} />
          </ClickAwayListener>
          <CloseButton onClick={() => handleClose()}>&#57344;</CloseButton>
        </DetailWrapper>
      ) : null}
    </ImageWrapper>
  );
};

export default ImageDetailView;
