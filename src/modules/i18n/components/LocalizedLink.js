import { observer } from "mobx-react";
import React from "react";
import { useIntl } from "react-intl";
import { DefaultLink } from "@/theme/reusedStyles";

const LocalizedLink = ({ children, to, style = {}, ...props }) => {
  const { locale } = useIntl();

  return (
    <DefaultLink href={`/${locale}${to}`} {...props}>
      {children}
    </DefaultLink>
  );
};

export default observer(LocalizedLink);
