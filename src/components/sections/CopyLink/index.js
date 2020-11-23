import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CopyButton } from "../../../components";
import { InputText } from "../../../components/elements";
import { clearShortenedLink } from "../../../store/link/actions";
import {
  Grid,
  Paper,
  makeStyles,
  Typography,
  ButtonBase,
  Link,
} from "@material-ui/core";
import logo from "../../../images/dbuzz_icon.png";

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
    display: "flex",
    margin: "0 auto",
    paddingTop: "10px",
  },
  urlInput: {
    color: "#f50057",
    fontStyle: "italic",
    fontWeight: "700",
    fontSize: "20px",
    backgroundColor: "#202225",
    paddingLeft: "5px",
  },
  title: {
    fontWeight: "bold",
  },
  center: {
    alignItems: "center",
  },
  description: {
    alignItems: "center",
    paddingBottom: "0.5rem",
    fontSize: "14px",
    fontWeight: "lighter",
  },
  tryHereDiv: {
    display: "flex",
    margin: "0 auto",
  },
  newShortenLink: {
    fontSize: "14px",
    fontWeight: "600",
    lineHeight: "1.43",
    paddingLeft: "5px",
    cursor: "pointer",
  },
  longUrl: {
    wordBreak: "break-word",
  },
}));

const CopyLink = (props) => {
  const classes = useStyles();
  const { shortLink, longLink, clearShortenedLink } = props;

  const shortenNewLink = () => {
    clearShortenedLink();
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
              <Grid item xs container direction="column" spacing={4}>
                <Grid item xs>
                  <Typography
                    gutterBottom
                    variant="h5"
                    className={classes.title}
                  >
                    Your Shortened Link
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    className={classes.description}
                  >
                    Copy the shortened link and share it in messages, texts,
                    posts, websites and other locations.
                  </Typography>
                  <form className={classes.root} noValidate autoComplete="off">
                    <div className={classes.urlInputDiv}>
                      <InputText
                        defaultValue={shortLink}
                        inputProps={{ "aria-label": "copyUrl" }}
                        className={classes.urlInput}
                        color="secondary"
                        disableUnderline
                        readOnly
                        fullWidth
                      />
                      <CopyButton shortLink={shortLink} />
                    </div>
                  </form>
                </Grid>
                <Grid item>
                  <Typography variant="body2" style={{ cursor: "pointer" }}>
                    Long URL:
                  </Typography>
                  <Link
                    className={classes.longUrl}
                    href={longLink}
                    color="secondary"
                    rel="noopener"
                    target="_blank"
                  >
                    {longLink}
                  </Link>
                </Grid>
                <Grid item>
                  <div className={classes.tryHereDiv}>
                    <Typography variant="body2" style={{ cursor: "pointer" }}>
                      Try another one{" "}
                    </Typography>
                    <Link
                      className={classes.newShortenLink}
                      onClick={shortenNewLink}
                      color="secondary"
                    >
                      {" "}
                      HERE
                    </Link>
                  </div>
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
  longLink: state.link.get("longLink"),
  shortLink: state.link.get("shortLink"),
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      clearShortenedLink,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(CopyLink);
