import React, { useEffect, useState } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { makeStyles, Link, Grid, Typography } from "@material-ui/core"
import { LoginModal } from "../../../components"
import { signoutUserRequest } from "../../../store/auth/actions"
import { setCurrentPage } from "../../../store/interface/actions"

const useStyles = makeStyles((theme) => ({
  wrapper: {
    flexGrow: 1,
    paddingTop: "1rem",
  },
  copyright: {
    color: "#657786",
  },
  whitelist: {
    cursor: "pointer",
    fontWeight: "bold",
    float: "right",
  },
  login: {
    cursor: "pointer",
    fontWeight: "bold",
    float: "right",
    paddingLeft: "1.5rem",
  },
}))

const Footer = (props) => {
  const { user, signoutUserRequest, currentPage, setCurrentPage } = props
  const { is_authenticated } = user
  const classes = useStyles()
  const [showLogin, setShowLogin] = useState(false)

  const adminDomainRoute = (currentPage === "whitelist")

  useEffect(() => {
    if (
      adminDomainRoute &&
      (!is_authenticated || is_authenticated === undefined)
    ) {
      setShowLogin(true)
    }
  }, [])

  const redirectToWhitelist = () => {
    setCurrentPage('whitelist')
  }

  const redirectToHome = () => {
    setCurrentPage('')
  }

  const handleClickLogout = () => {
    signoutUserRequest()
  }

  const handleClickOpenLoginModal = () => {
    setShowLogin(true)
  }

  const handleClickCloseLoginModal = () => {
    setShowLogin(false)
  }

  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-end"
        className={classes.wrapper}
      >
        <Grid item xs>
          <Typography variant="body2" className={classes.copyright}>
            © 2020 Dataloft, LLC
          </Typography>
        </Grid>
        <Grid item xs={12} sm>
          {adminDomainRoute && !is_authenticated && (
            <Link
              className={classes.login}
              onClick={handleClickOpenLoginModal}
              color="secondary"
              rel="noopener"
              target="_blank"
            >
              Admin 
            </Link>
          )}
          {adminDomainRoute && is_authenticated && (
            <Link
              className={classes.login}
              onClick={handleClickLogout}
              color="secondary"
              rel="noopener"
              target="_blank"
            >
              Logout
            </Link>
          )}
          {!adminDomainRoute && (
            <Link
              className={classes.whitelist}
              onClick={redirectToWhitelist}
              color="secondary"
              rel="noopener"
              target="_blank"
            >
              Whitelisted Domains
            </Link>
          )}
          {adminDomainRoute && (
            <Link
              className={classes.whitelist}
              onClick={redirectToHome}
              color="secondary"
              rel="noopener"
              target="_blank"
            >
              Home
            </Link>
          )}
        </Grid>
      </Grid>
      <LoginModal show={showLogin} onHide={handleClickCloseLoginModal} />
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.get("user"),
  currentPage: state.interfaces.get("currentPage"),
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      signoutUserRequest,
      setCurrentPage,
    },
    dispatch,
  ),
})

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
