import { FormattedMessage } from "react-intl";
import React from "react";
import { formatValues } from "./formatValues";

const LocalizedText = ({ id, style, ...props }) => {
  return (
    <FormattedMessage id={id} style={style} values={formatValues} {...props} />
  );
};

export default LocalizedText;
