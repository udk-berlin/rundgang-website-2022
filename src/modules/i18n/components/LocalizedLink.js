import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { DefaultLink } from "@/theme/reusedStyles";

const LocalizedLink = ({ children, to, ...props }) => {
  const { locale } = useIntl();

  useEffect(() => {}, []);

  return (
    <DefaultLink href={`/${locale}${to}`} {...props}>
      {children}
    </DefaultLink>
  );
};

export default observer(LocalizedLink);
