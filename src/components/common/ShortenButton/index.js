import React from "react";
import { createUseStyles } from "react-jss";
import { ContainedButton } from "./../../../components/elements";
import ShortTextIcon from "@material-ui/icons/ShortText";

const useStyles = createUseStyles({
  wrapper: {
    width: "100%",
  },
});

const ShortenButton = (props) => {
  const classes = useStyles();
  const { disabled, loading, onClick = () => {} } = props;
  return (
    <React.Fragment>
      <div className={classes.wrapper}>
        <ContainedButton
          size="large"
          color="secondary"
          label="Shorten"
          loading={loading}
          disabled={disabled}
          fullwidth
          icon={<ShortTextIcon />}
          onClick={onClick}
        />
      </div>
    </React.Fragment>
  );
};

export default ShortenButton;
