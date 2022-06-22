import React from "react";

export const formatValues = {
  strong: chunks => <b>{chunks}</b>,
  em: chunks => <i>{chunks}</i>,
  s: chunks => <s>{chunks}</s>,
  br: <br />,
  p: chunks => (
    <span>
      {chunks}
      <br />
      <br />
    </span>
  ),
  ul: chunks => <ul>{chunks}</ul>,
  ol: chunks => <ol>{chunks}</ol>,
  li: chunks => <li>{chunks}</li>,
  h1: chunks => <h1>{chunks}</h1>,
  h2: chunks => <h2>{chunks}</h2>,
  h3: chunks => <h3>{chunks}</h3>,
  h4: chunks => <h4>{chunks}</h4>,
  ExternalLink: chunks => {
    const [href, content] = (chunks[0] || "").split("|");
    return (
      <a target="_blank" href={href} rel="noreferrer">
        {content}
      </a>
    );
  },
};
