import React from 'react'
import { renderRoutes } from 'react-router-config'
import { createUseStyles } from 'react-jss'
import { Container } from '@material-ui/core';
import NotificationBox from "../../../components/common/NotificationBox"

const useStyles = createUseStyles({
    main: {
        maxWidth: 'max-content',
        width: 'max-content',
        margin: '0 auto',  
    },
})

const AppFrame = (props) => {
    const { route } = props
    const classes = useStyles();
    return (
        <React.Fragment>
            <Container>
                <div className={classes.main}>
                    {renderRoutes(route.routes)}
                </div>
            </Container>
            <NotificationBox />
        </React.Fragment>
    );
}

export default AppFrame;