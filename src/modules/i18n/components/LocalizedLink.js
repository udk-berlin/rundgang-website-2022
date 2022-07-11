import { observer } from "mobx-react";
import React from "react";
import { useIntl } from "react-intl";
import { DefaultLink } from "@/theme/reusedStyles";

const LocalizedLink = ({ children, to, ...props }) => {
  const { locale } = useIntl();
  const loc = locale == "de" || locale == "default" ? "" : "/en";

  return (
    <DefaultLink href={`${loc}${to}`} {...props}>
      {children}
    </DefaultLink>
  );
};

export default observer(LocalizedLink);
