import React from "react";
import _ from "lodash";
import styled from "styled-components";
import AudioPlayer from "./AudioPlayer";
import LocalizedText from "modules/i18n/components/LocalizedText";

const Heading = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lm};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

const Paragraph = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: ${({ theme }) => theme.spacing.sm};
`;

const Image = styled.img`
  width: 100%;
  margin: ${({ theme }) => theme.spacing.sm};
`;

const Code = styled.pre`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  display: block;
  font-family: monospace;
  white-space: pre-wrap;
  background: black;
  color: ${({ theme }) => theme.colors.highlight};
  width: fit-content;
  margin: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
`;

const Quote = styled.blockquote`
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ListWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
  ul {
    
  }
`;

const ContentElement = ({ item }) => {
  if (item.type == "heading") {
    return <Heading>{item.content}</Heading>;
  } else if (item.type == "text") {
    return (
      <Paragraph>
        <LocalizedText id="none" defaultMessage={item.content} />
      </Paragraph>
    );
  } else if (item.type == "image") {
    return <Image src={item.content} />;
  } else if (item.type == "audio") {
    return <AudioPlayer item={item} />;
  } else if (item.type == "ul") {
    return (
      <ListWrapper>
        <LocalizedText id="none" defaultMessage={item.content} />
      </ListWrapper>
    );
  } else if (item.type == "ol") {
    return (
      <ListWrapper>
        <LocalizedText id="none" defaultMessage={item.content} />
      </ListWrapper>
    );
  } else if (item.type == "quote") {
    return <Quote>{item.content}</Quote>;
  } else if (item.type == "code") {
    return <Code>{item.content}</Code>;
  }
};

export default ContentElement;
