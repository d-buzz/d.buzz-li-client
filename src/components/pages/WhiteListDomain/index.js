import React from "react";
import { createUseStyles } from "react-jss";
import { DomainList } from "../../../components"

const useStyles = createUseStyles({
    wrapper: {
        minHeight: '100vh',
    }
});

const WhiteListDomain = (props) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <div className={classes.wrapper}>
                <h1>This is WhiteListDomain component</h1>
                <DomainList/>
            </div>
        </React.Fragment>
    );
};

export default WhiteListDomain;
