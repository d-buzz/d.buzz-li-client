import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ShortenButton } from "../../../components";
import { InputText } from "../../../components/elements";
import {
  Grid,
  Paper,
  makeStyles,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import logo from "../../../images/dbuzz_icon.png";
import { shortenLinkRequest, setLongLink } from "../../../store/link/actions";
import { broadcastNotification } from "../../../store/interface/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(5),
    margin: "auto",
    width: "800px",
    backgroundColor: "#282a2d",
    color: "#FFFFFF",
    borderRadius: "5px",
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  urlInputDiv: {
    paddingBottom: "1rem",
  },
  urlInput: {
    color: "#FFFFFF",
    fontStyle: "italic",
  },
  title: {
    paddingBottom: "1rem",
    fontWeight: "bold",
  },
  center: {
    alignItems: "center",
  },
  description: {
    alignItems: "center",
  },
  errorMsg: {
    color: "#e51c34",
    fontStyle: "italic",
  },
}));

const ShortenLink = (props) => {
  const { shortenLinkRequest, broadcastNotification, setLongLink } = props;
  const classes = useStyles();
  const [longurl, setLongurl] = useState("");
  const [inputError, setInputError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { target } = e;
    const { value } = target;
    setLongurl(value);

    if (!value) {
      setInputError("URL is required");
    } else {
      setInputError("");
    }
  };

  const handleShortenLink = () => {
    if (!longurl) {
      setInputError("URL is required");
    } else {
      if (!inputError) {
        setLongLink(longurl);
        setInputError("");
        setLoading(true);
        shortenLinkRequest(longurl).then((result) => {
          setLoading(false);
          if (result && result.code !== 200) {
            broadcastNotification("error", result.message);
          }
        });
      }
    }
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={5} className={classes.center}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="dbuzz" src={logo} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography
                    gutterBottom
                    variant="h5"
                    className={classes.title}
                  >
                    Shorten a link
                  </Typography>
                  <form className={classes.root} noValidate autoComplete="off">
                    <div className={classes.urlInputDiv}>
                      <InputText
                        id="input-long-url"
                        placeholder="Paste here the URL you want to shorten"
                        inputProps={{ "aria-label": "shortenUrl" }}
                        className={classes.urlInput}
                        color="secondary"
                        value={longurl}
                        onChange={onChange}
                        autoFocus
                        required
                        fullWidth
                      />
                      {inputError && (
                        <Typography
                          gutterBottom
                          variant="body2"
                          className={classes.errorMsg}
                        >
                          {inputError}
                        </Typography>
                      )}
                    </div>
                    <ShortenButton
                      disabled={Boolean(loading)}
                      loading={Boolean(loading)}
                      onClick={handleShortenLink}
                    />
                  </form>
                </Grid>
                <Grid item>
                  <Typography
                    gutterBottom
                    variant="body2"
                    className={classes.description}
                  >
                    Dbuzz.Link is a link shortening service for D.Buzz &
                    microbloggers alike.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  shortLink: state.link.get("shortLink"),
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      setLongLink,
      shortenLinkRequest,
      broadcastNotification,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShortenLink);
