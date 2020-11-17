import React, { useState } from "react";
import { connect } from "react-redux";
import { ShortenLink, CopyLink } from "../../../components";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  }
}));

const Home = (props) => {
  const classes = useStyles();
  const { shortenedLinkInfo } = props;
  const { shortenedLink } = shortenedLinkInfo
  return (
    <React.Fragment>
      <div className={classes.wrapper}>
        {!shortenedLink && <ShortenLink />}
        {shortenedLink && <CopyLink />}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  shortenedLinkInfo: state.link.get("shortenedLinkInfo"),
});

export default connect(mapStateToProps)(Home);
