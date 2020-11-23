import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { pending } from 'redux-saga-thunk'
import { authenticateUserRequest } from "../../../store/auth/actions"
import { DialogTitle } from "../../../components";
import { CustomTextField, ContainedButton } from "../../../components/elements";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import {
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
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
}));

const LoginModal = (props) => {
  const { 
      show, 
      onHide, 
      user, 
      loading,
      authenticateUserRequest
  } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const classes = useStyles();

  const handleSubmit = () => {
    authenticateUserRequest(username, password)
  };

  const handleClose = () => {
    onHide();
  };

  const onChangeValues = (e) => {
    const { target } = e;
    const { id, value } = target;
    if (id === "username") {
      setUsername(value);
    } else if (id === "password") {
      setPassword(value);
    }
  };

  const onChangeShowPass = () => {
    setShowPass(!showPass);
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
          },
        }}
      >
        <DialogTitle onClose={handleClose} classes={classes}>
          <Typography variant="body1" className={classes.title}>
            Welcome back Admin!
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container className={classes.signInContainer}>
            <Grid item xs={12} className={classes.formContainer}>
              <form id="loginForm" className={classes.form}>
                <CustomTextField
                  id="username"
                  label="Username"
                  color="secondary"
                  value={username}
                  onChange={onChangeValues}
                  variant="outlined"
                  required
                  autoFocus
                  fullWidth
                />
                <CustomTextField
                  id="password"
                  type={showPass ? "text" : "password"}
                  label="Password"
                  color="secondary"
                  value={password}
                  onChange={onChangeValues}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          aria-label="Toggle password visibility"
                          onClick={onChangeShowPass}
                        >
                          {showPass ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </form>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <ContainedButton
            variant="outlined"
            color="secondary"
            label="Login"
            onClick={handleSubmit}
            disabled={loading}
            loading={loading}
            loadType="circular"
          />
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
    loading: pending(state, 'AUTHENTICATE_USER_REQUEST')
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    authenticateUserRequest
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
