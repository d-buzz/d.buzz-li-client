import React from "react";
import { connect } from "react-redux";
import { CopyButton } from "../../../components";
import { SimpleLink } from "../../../components/elements";
import {
  Grid,
  Paper,
  makeStyles,
  Typography,
  ButtonBase,
  Input,
  Link,
} from "@material-ui/core";
import logo from "../../../images/dbuzz_icon.png";

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
    display: "flex",
    margin: "0 auto",
  },
  urlInput: {
    color: "#f50057",
    fontStyle: "italic",
    fontSize: "20px",
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
  newShortenLink: {
    fontSize: "0.875rem",
  },
}));

const CopyLink = (props) => {
  const classes = useStyles();
  const { shortLink, longLink } = props;

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
            <Grid item xs container direction="column" spacing={4}>
              <Grid item xs>
                <Typography gutterBottom variant="h5" className={classes.title}>
                  Your shortened Link
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
                    <Input
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
                  href={longLink}
                  color="secondary"
                  rel="noopener"
                  target="_blank"
                >
                  {longLink}
                </Link>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: "pointer" }}>
                  Try another one{" "}
                  <Link
                    className={classes.newShortenLink}
                    href={longLink}
                    color="secondary"
                  >
                    here
                  </Link>
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
  longLink: state.link.get("longLink"),
  shortLink: state.link.get("shortLink"),
});

export default connect(mapStateToProps)(CopyLink);
