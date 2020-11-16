import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { validateUrl } from "../../../services/helper";
import { ShortenButton } from "../../../components";
import {
  Grid,
  Paper,
  makeStyles,
  Typography,
  ButtonBase,
  Input,
} from "@material-ui/core";
import logo from "../../../images/dbuzz_icon.png";
import { shortenLinkRequest, setLongLink } from "../../../store/link/actions";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(5),
    margin: "auto",
    width: "750px",
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
    fontStyle: "italic"
  },
}));

const ShortenLink = (props) => {
  const { shortenLinkRequest, setLongLink, shortLink } = props;
  const classes = useStyles();
  const [longurl, setLongurl] = useState("");
  const [loading, setloading] = useState(false);
  const [inputError, setInputError] = useState("");

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
        shortenLinkRequest(longurl);
        setInputError("");
      }
    }
  };

  return (
    <React.Fragment>
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
                <Typography gutterBottom variant="h5" className={classes.title}>
                  Shorten a link
                </Typography>
                <form className={classes.root} noValidate autoComplete="off">
                  <div className={classes.urlInputDiv}>
                    <Input
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
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShortenLink);
