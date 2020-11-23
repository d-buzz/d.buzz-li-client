import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { BrandIconDark } from "../../elements";
import { makeStyles, Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    paddingBottom: "1rem",
  },
}));

const Header = (props) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} container className={classes.root}>
      <BrandIconDark height={40} />
    </Grid>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
