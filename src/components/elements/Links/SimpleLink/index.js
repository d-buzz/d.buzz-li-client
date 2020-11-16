import React from "react";
import { Link } from "@material-ui/core";

const SimpleLink = (props) => {
  const { color, label, url } = props;
  return (
    <Link href={url} color={color} rel="noopener" target="_blank">
        {label}
    </Link>
  );
};
export default SimpleLink;
