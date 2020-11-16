import React from 'react';
import routes from "./routes";
import { withRouter } from 'react-router';
import { renderRoutes } from 'react-router-config'
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    overflow: "hidden !important",
    backgroundColor: '#202225'
  },
}));

const AppWrapper = ({ children }) => {
  const classes = useStyles()
  return (
    <div className={classes.wrapper}>
      {children}
    </div>
  )
}
function App() {
  return (
    <React.Fragment>
      <AppWrapper>
        {renderRoutes(routes)}
      </AppWrapper>
    </React.Fragment>
  );
}

export default withRouter(App)
