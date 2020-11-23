import React from "react";
import { Input } from "@material-ui/core";

const InputText = (props) => {
  const {
    defaultValue,
    color,
    className,
  } = props;
  return (
    <Input
      defaultValue={defaultValue}
      className={className}
      color={color}
      {...props}
    />
  );
};
export default InputText;
