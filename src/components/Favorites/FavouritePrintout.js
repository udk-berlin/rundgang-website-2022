import React from "react";
import { useIntl } from "react-intl";


const FavouritePrintout = ({ savedItems }) => {
  const intl = useIntl();

  return (
    <div>
      {savedItems.map(item => (
        <div>{item.name}</div>
      ))}
    </div>
  );
};

export default FavouritePrintout;
