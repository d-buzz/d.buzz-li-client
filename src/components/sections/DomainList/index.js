import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { pending } from "redux-saga-thunk";
import { connect } from "react-redux";
import { Grid, Paper, makeStyles, Typography } from "@material-ui/core";
import { FixedHeader } from "../../elements";
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
  const { domainList, getDomainListRequest } = props;
  const classes = useStyles();

  const columns = [
    { id: "domain", label: "Domain", minWidth: 150, type: "link" },
    { id: "status", label: "Status", minWidth: 100, type: "chip" },
    // { id: "actions", label: "", minWidth: 150 },
  ];

  useEffect(() => {
    getDomainListRequest();
  }, []);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="h5" className={classes.title}>
                Whitelisted Domains
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FixedHeader
                rows={domainList}
                columns={columns}
              />
            </Grid>
          </Grid>
        </Paper>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
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
