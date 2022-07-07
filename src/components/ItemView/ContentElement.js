import React from "react";
import styled from "styled-components";
import AudioPlayer from "./AudioPlayer";
import ImageDetailView from "./ImageDetailView";
import ReactMarkdown from "react-markdown";
import LocalizedText from "modules/i18n/components/LocalizedText";

const Heading = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lm};
`;

const Paragraph = styled.div`
  word-wrap: break-word;
  word-break: break-all;
  font-size: ${({ theme }) => theme.fontSizes.mm};
  padding-top: ${({ theme }) => theme.space(8)};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

const Code = styled.pre`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  display: block;
  font-family: monospace;
  white-space: pre-wrap;
  background: black;
  color: ${({ theme }) => theme.colors.highlight};
  width: fit-content;
  margin: ${({ theme }) => theme.space(8)};
  padding: ${({ theme }) => theme.space(8)};
`;

const Quote = styled.blockquote`
  font-size: ${({ theme }) => theme.fontSizes.mm};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

const ListWrapper = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.mm};
  margin-left: ${({ theme }) => theme.space(32)};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

const OLWrapper = styled(ListWrapper)`
  margin-left: ${({ theme }) => theme.space(48)};
`;

const Video = styled.div`
  iframe {
    height: 315px;
    width: 560px;
    @media ${({ theme }) => theme.breakpoints.tablet} {
      height: 200px;
      width: 358px;
    }
  }
`;

const ContentElement = ({ item }) => {
  if (item.type == "heading") {
    return <Heading>{item.content}</Heading>;
  } else if (item.type == "text") {
    let cont = String(item.content)
    return (
      <Paragraph>
        <ReactMarkdown>{cont}</ReactMarkdown> 
      </Paragraph>
    );
  } else if (item.type == "image") {
    return <ImageDetailView src={item.content} />;
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
      <OLWrapper>
        <LocalizedText id="none" defaultMessage={item.content} />
      </OLWrapper>
    );
  } else if (item.type == "quote") {
    return <Quote>{item.content}</Quote>;
  } else if (item.type == "code") {
    return <Code>{item.content}</Code>;
  } else if (item.type == "video") {
    return (
      <Video
        dangerouslySetInnerHTML={{ __html: item.formatted_content }}
      ></Video>
    );
  }
};

export default ContentElement;
