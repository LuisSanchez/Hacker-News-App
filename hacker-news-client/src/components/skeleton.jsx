import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

export default function Animations() {
  return (
    <React.Fragment>
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
    </React.Fragment>
  );
}
