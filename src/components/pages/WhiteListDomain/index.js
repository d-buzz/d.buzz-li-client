import React from "react";
import {
  Grid,
  makeStyles,
} from "@material-ui/core";
import { DomainList, Header, Footer } from "../../../components";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    minHeight: "100vh",
    overflow: 'hidden'
  }
}));

const WhiteListDomain = (props) => {
  const classes = useStyles();
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
          <DomainList/>
        </Grid>
        <Grid item>
          <Footer />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default WhiteListDomain;
