import React from "react";
import Head from "next/head";

const HeadOG = ({ description, title, imgurl, ogurl }) => {
  return (
    <Head>
      {/* default deets */}
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <>
        <meta property="og:url" content={ogurl} key="ogurl" />
        <meta property="og:image" content={imgurl} key="ogimage" />
        <meta
          property="og:site_name"
          content="UdK Rundgang 2022"
          key="ogsitename"
        />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
      </>
      <>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Gr8087" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />x
        <meta property="og:url" content={ogurl} />
        <meta name="twitter:image" content={imgurl} />
      </>
      {/* regular title */}
      <title>{title}</title>
    </Head>
  );
};

export default HeadOG;
