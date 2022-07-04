import React from "react";
import dynamic from "next/dynamic";

const FavouritesList = dynamic(() => import("./FavouritesList"), {
  loading: () => <header />,
});

const FavouritePrintout = () => {
  return (
    <div style={{ width: "1000px" }}>
      <FavouritesList />
    </div>
  );
};

export default FavouritePrintout;
