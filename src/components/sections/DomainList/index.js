import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { pending } from "redux-saga-thunk";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { Grid, Paper, makeStyles, Typography } from "@material-ui/core";
import { FixedHeader, ContainedButton } from "../../elements";
import { getDomainListRequest } from "../../../store/whitelist/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(5),
    margin: "auto",
    width: "800px",
    backgroundColor: "#282a2d",
    color: "#FFFFFF",
    borderRadius: "5px",
  },
  title: {
    fontWeight: "bold",
  },
}));

const DomainList = (props) => {
  const { user, domainList, getDomainListRequest } = props;
  const { is_authenticated } = user;
  const classes = useStyles();
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);

  const adminDomainRoute = pathname.match(/^\/admin\/whitelist/);
  let isAdmin = false;
  if (adminDomainRoute && is_authenticated) {
    isAdmin = true;
  }

  let columns = [
    { id: "domain", label: "Domain", minWidth: 150, type: "link" },
    { id: "status", label: "Status", minWidth: 100, type: "chip" },
  ];

  if (isAdmin) {
    columns = [
      { id: "domain", label: "Domain", minWidth: 150, type: "link" },
      { id: "status", label: "Status", minWidth: 100, type: "chip" },
      { id: "created", label: "Date added", minWidth: 100},
      { id: "actions", label: "Options", minWidth: 50, type: "options" },
    ];
  }

  useEffect(() => {
    getDomainListRequest();
  }, []);

  const handleAddDomain = () => {};

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item sm container>
              <Grid
                item
                xs
                container
                direction="row"
                justify="space-between"
                alignItems="flex-end"
              >
                <Grid item xs>
                  <Typography variant="h5" className={classes.title}>
                    Whitelisted Domains
                  </Typography>
                </Grid>
                <Grid item>
                  {isAdmin && (<ContainedButton
                    variant="outlined"
                    color="secondary"
                    label="Add new"
                    onClick={handleAddDomain}
                    disabled={loading}
                    loading={loading}
                    loadType="circular"
                  />)}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FixedHeader rows={domainList} columns={columns} />
            </Grid>
          </Grid>
        </Paper>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.get("user"),
  domainList: state.whitelist.get("domainList"),
  loading: pending(state, "GET_DOMAIN_LIST_REQUEST"),
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      getDomainListRequest,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(DomainList);
