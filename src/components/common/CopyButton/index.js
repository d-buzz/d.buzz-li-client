import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { ContainedButton } from "./../../../components/elements";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { swalBasicFire } from "../../../services/helper"

const useStyles = createUseStyles({
  wrapper: {
    width: "100%",
  },
});

const CopyButton = (props) => {
  const classes = useStyles();
  const { disabled, loading, shortLink } = props;

  const onCopy = () => {
    swalBasicFire( 'Success','Link copied to clipboard','success')
  }

  return (
    <React.Fragment>
      <div className={classes.wrapper}>
        <CopyToClipboard 
            onCopy={onCopy} 
            text={shortLink}>
          <ContainedButton
            size="large"
            color="secondary"
            label="Copy"
            loading={loading}
            disabled={disabled}
            fullwidth
            icon={<FileCopyIcon />}
          />
        </CopyToClipboard>
      </div>
    </React.Fragment>
  );
};

export default CopyButton;
