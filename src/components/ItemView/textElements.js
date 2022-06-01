import React, { useEffect, useState } from "react";
import _ from "lodash";
import styled from "styled-components";
import LocalizedLink from "modules/i18n/components/LocalizedLink";

export const Heading = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lm};
  font-family: "DiatypeBold";
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

export const Paragraph = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  place-self: start;
`;

export const Image = styled.img`
  width: 100%;
  margin: ${({ theme }) => theme.spacing.sm};
  place-self: start;
`;

export const Audio = styled.audio`
  place-self: start;
`;

export const Code = styled.pre`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  display: block;
  font-family: monospace;
  white-space: pre;
  margin: 1em 0;
  background: #ddd;
  width: fit-content;
  padding: 10px;
  place-self: start;
`;

export const Quote = styled.blockquote`
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const OrderedList = styled.ol`
  background: #fbb;
  padding: 10px;
  width: fit-content;
  white-space: pre;
  place-self: start;
`;

export const UnorderedList = styled.ul`
  background: #bfb;
  padding: 10px;
  width: fit-content;
  white-space: pre;
  place-self: start;
`;
