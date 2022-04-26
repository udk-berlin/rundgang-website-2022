import { observer } from "mobx-react";
import React from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

const LocalizedLink = observer(
  ({ children, to, style = {}, ...props }) => {
    const { locale } = useIntl();

    return (
      <Link to={`/${locale}${to}`} style={style} {...props}>
        {children}
      </Link>
    );
  },
);

export default LocalizedLink;
