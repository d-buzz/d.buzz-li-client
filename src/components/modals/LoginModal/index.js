import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { authenticateUserRequest } from "../../../store/auth/actions";
import { DialogTitle } from "../../../components";
import { broadcastNotification } from "../../../store/interface/actions";

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
  IconButton
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
  actionBtn: {
    paddingRight: "0.5rem",
    paddingBottom: "1rem",
  },
  errorMsg: {
    color: "#e51c34",
    fontStyle: "italic",
  },
}));

const LoginModal = (props) => {
  const {
    show,
    onHide,
    authenticateUserRequest,
    broadcastNotification,
  } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const classes = useStyles();

  const handleSubmit = () => {
    if (username && password) {
      setLoading(true);
      authenticateUserRequest(username, password).then(
        ({ is_authenticated }) => {
          setLoading(false);
          if (!is_authenticated) {
            broadcastNotification(
              "error",
              "Authentication failed, please check your credentials."
            );
          } else {
            handleClose();
            handleClearInput();
            broadcastNotification("success", "Authenticated successfully.");
          }
        }
      );
    }else{
      setUsernameTouched(true)
      setPasswordTouched(true)
    }
  };

  const handleClose = () => {
    onHide();
  };

  const handleClearInput = () => {
    setUsername("")
    setPassword("")
    setUsernameTouched(false)
    setPasswordTouched(false)
  }

  const onChangeValues = (e) => {
    const { target } = e;
    const { id, value } = target;

    if (id === "username") {
      setUsername(value);
      setUsernameTouched(true);
    } else if (id === "password") {
      setPassword(value);
      setPasswordTouched(true);
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
            paddingTop: "1rem",
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
                  error={usernameTouched && username == ""}
                  id="username"
                  label="Username"
                  color="secondary"
                  value={username}
                  onChange={onChangeValues}
                  variant="outlined"
                  required
                  autoFocus
                  fullWidth
                  helperText={
                    usernameTouched && !username ? "Username is required" : ""
                  }
                />
                <CustomTextField
                  error={passwordTouched && password == ""}
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
                  helperText={
                    passwordTouched && !password ? "Password is required" : ""
                  }
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
          <div className={classes.actionBtn}>
            <ContainedButton
              variant="outlined"
              color="secondary"
              label="Login"
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
      authenticateUserRequest,
      broadcastNotification,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
