import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ClickAwayListener from "react-click-away-listener";
import { CloseIcon } from "../simple/CloseButton";

const ImageWrapper = styled.div`
  display: block;
`;

const Image = styled.picture`
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

const CloseButton = styled(CloseIcon)`
  position: absolute;
  right: 16px;
  top: 16px;
`;

const ImageDetailView = ({ src }) => {
  const [imageDetailOpen, setImageDetailOpen] = useState(false);
  return (
    <ImageWrapper>
      <Image onClick={() => setImageDetailOpen(true)}>
        <source srcSet={src} />
        <img
          src="/assets/img/missing.png"
          alt="missing image"
          style={{ width: "100%" }}
        />
      </Image>
      {imageDetailOpen ? (
        <DetailWrapper>
          <ClickAwayListener onClickAway={() => setImageDetailOpen(false)}>
            <DetailView src={src} />
          </ClickAwayListener>
          <CloseButton
            onClose={e => {
              e.preventDefault();
              e.stopPropagation();
              setImageDetailOpen(false);
            }}
          >
            &#x2715;
          </CloseButton>
        </DetailWrapper>
      ) : null}
    </ImageWrapper>
  );
};

export default ImageDetailView;
