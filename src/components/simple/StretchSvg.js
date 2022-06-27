import React from "react";

const StretchSvg = ({ }) => {
  return (
    <svg
      viewBox="0 0 120 54"
      style={{ height: "100%" }}
      preserveAspectRatio="none"
    >
      <text textAnchor="start" x="0%" y="15">
        &#8593;
      </text>
      <text textAnchor="start" x="7" y="15" transform="scale(1.8 1)">
        <LocalizedText id="katalog" />
      </text>
      <text textAnchor="start" x="0" y="31" transform="scale(2.05 1)">
        <LocalizedText id="orte" />
      </text>
      <text textAnchor="start" x="105" y="31">
        {"->"}
      </text>
      <text textAnchor="start" x="0%" y="46">
        {"<-"}
      </text>
      <text textAnchor="start" x="8" y="46" transform="scale(1.6 1)">
        <LocalizedText id="zeiten" />
      </text>
      <g height="10" x="0%" y="70px">
        <text textAnchor="start" x="0%" y="54" fontSize="50%">
          <LocalizedText id="beratungsangebote_index" />
        </text>
        <text textAnchor="start" x="113" y="54" fontSize="50%">
          &#8595;
        </text>
      </g>
    </svg>
  );
};
export default StretchSvg;
