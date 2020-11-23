import React from "react";
import { TextField, withStyles, makeStyles } from "@material-ui/core";

const CssTextField = withStyles({
  root: {
    "& .MuiIconButton-label": {
      color: "white",
    },
    "& .MuiInputLabel-outlined": {
      color: "white",
    },
    "& label.Mui-focused": {
      color: "red",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "red",
    },
    "& .MuiOutlinedInput-root": {
      color: "white",
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "red",
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const CustomTextField = (props) => {
  const classes = useStyles();
  const { defaultValue, color } = props;
  return (
    <CssTextField
      defaultValue={defaultValue}
      className={classes.margin}
      color={color}
      {...props}
    />
  );
};
export default CustomTextField;
