import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createUseStyles } from "react-jss";
import { ContainedButton } from "./../../../components/elements";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { broadcastNotification } from "../../../store/interface/actions"

const useStyles = createUseStyles({
  wrapper: {
    width: "100%",
  },
});

const CopyButton = (props) => {
  const classes = useStyles();
  const { 
    disabled, 
    loading, 
    shortLink,
    broadcastNotification 
  } = props;

  const onCopy = () => {
    broadcastNotification('success','Link copied to clipboard')
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
            disabled={disabled}
            fullWidth
            icon={<FileCopyIcon />}
          />
        </CopyToClipboard>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      broadcastNotification
    },
    dispatch
  ),
});

export default connect(mapStateToProps,mapDispatchToProps)(CopyButton);
