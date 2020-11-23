import React, { useState } from "react";
import { connect } from "react-redux";
import { ShortenLink, CopyLink, Header, Footer } from "../../../components";
import { makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    minHeight: "100vh",
  }
}));

const Home = (props) => {
  const classes = useStyles();
  const { shortenedLinkInfo } = props;
  const { shortenedLink } = shortenedLinkInfo;
  return (
    <React.Fragment>
      <Grid
        container
        spacing={0}
        direction="column"
        justify="center"
        className={classes.wrapper}
      >
        <Grid item>
          <Header />
        </Grid>
        <Grid item xs={12}>
          {!shortenedLink && <ShortenLink />}
          {shortenedLink && <CopyLink />}
        </Grid>
        <Grid item>
          <Footer />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  shortenedLinkInfo: state.link.get("shortenedLinkInfo"),
});

export default connect(mapStateToProps)(Home);
