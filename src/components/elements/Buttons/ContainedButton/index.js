import React from "react";
import { createUseStyles } from "react-jss";
import { LinearProgress, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { red } from '@material-ui/core/colors';

const useStyles = createUseStyles({
  button: {
    margin: 1,
  }
});
const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: "#e51c34",
    "&:hover": {
      backgroundColor: red[900],
    },
    "&:disabled": {
      color: "#D3D3D3",
    },
  },
}))(Button);

const ContainedButton = (props) => {
  const classes = useStyles();
  const {
    size,
    color,
    label,
    icon,
    loading = false,
    disabled = false,
    fullwidth = false,
    onClick = () => {},
  } = props;
  return (
    <div>
      <ColorButton
        variant="contained"
        size={size}
        color={color}
        className={classes.button}
        disabled={disabled}
        startIcon={icon}
        fullWidth={fullwidth}
        onClick={onClick}
      >
        {label}
      </ColorButton>
      {loading && <LinearProgress color="secondary" />}
    </div>
  );
};
export default ContainedButton;
