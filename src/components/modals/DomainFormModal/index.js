import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { DialogTitle } from "../../../components";
import { broadcastNotification } from "../../../store/interface/actions";
import { getDomainListRequest, addDomainRequest, updateDomainRequest } from "../../../store/whitelist/actions"
import { CustomTextField, ContainedButton } from "../../elements";

import {
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    textTransform: 'capitalize'
  },
  formContainer: {
    position: "relative",
  },
  username: {
    color: "#FFFFFF",
    fontStyle: "italic",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signInContainer: {
    maxWidth: "800px",
    alignSelf: "flex-end",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  buttonProgress: {
    color: "red",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  actionBtn: {
    paddingRight: "0.5rem",
    paddingBottom: "1rem",
  },
}));

const DomainFormModal = (props) => {
  const { 
    show, 
    onHide, 
    domainId=null,
    domainName=null,
    broadcastNotification,
    addDomainRequest,
    updateDomainRequest,
    getDomainListRequest
  } = props;
  const [loading, setLoading] = useState(false);
  const [domain, setDomain] = useState("");
  const [domainTouched, setDomainTouched] = useState(false)
  const [actionType, setActionType] = useState("add")
  const classes = useStyles();

  useEffect(() => {
    if(show){
      if(!domainId){
        setActionType("add")
      }else{
        setDomain(domainName)
        setActionType("update")
      }
    }
  }, [show]);

  const handleSubmit = () => {
    if(domain){
      console.log(actionType)
      if(actionType === "add"){
        handleAddDomain()
      }else{
        handleUpdateDomain()
      }
    }else{
      setDomainTouched(true)
    }
  };

  const handleAddDomain = () => {
    setLoading(true)
    addDomainRequest(domain).then((response) => {
      setLoading(false)
      if(response.code !== 200){
        broadcastNotification("error",response.message)
      }else{
        handleClose()
        getDomainListRequest()
        broadcastNotification("success",response.message)
      }
    });
  }

  const handleUpdateDomain = () => {
    setLoading(true)
    updateDomainRequest(domainId,domain).then((response) => {
      setLoading(false)
      if(response.code !== 200){
        broadcastNotification("error",response.message)
      }else{
        handleClose()
        getDomainListRequest()
        broadcastNotification("success",response.message)
      }
    });
  }

  const handleClose = () => {
    onHide();
    setDomain("")
    setDomainTouched(false)
  };

  const onChangeValues = (e) => {
    const { target } = e;
    const { id, value } = target;

    if(id === "domain"){
      setDomain(value)
    }

    if(!value){
      setDomainTouched(true)
    } 
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={show}
        PaperProps={{
          style: {
            backgroundColor: "#202225",
            color: "#FFFFFF",
            paddingTop: "1rem",
          },
        }}
      >
        <DialogTitle onClose={handleClose} classes={classes}>
          <Typography variant="body1" className={classes.title}>
            {actionType} Domain
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container className={classes.signInContainer}>
            <Grid item xs={12} className={classes.formContainer}>
              <form id="addDomainForm" className={classes.form}>
                <CustomTextField
                  error={domainTouched && !domain}
                  id="domain"
                  label="domain"
                  color="secondary"
                  value={domain}
                  onChange={onChangeValues}
                  variant="outlined"
                  required
                  autoFocus
                  fullWidth
                  helperText={domainTouched && !domain ? "Domain is required" : ""}
                />
              </form>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <div className={classes.actionBtn}>
            <ContainedButton
              variant="outlined"
              color="secondary"
              label={actionType}
              onClick={handleSubmit}
              disabled={loading}
              loading={loading}
              loadType="circular"
            />
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      getDomainListRequest,
      addDomainRequest,
      updateDomainRequest,
      broadcastNotification,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(DomainFormModal);
