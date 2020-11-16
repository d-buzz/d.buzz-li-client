import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    wrapper: {
        width: '100%',
        overflow: 'hidden'
    }
});


const DomainList = (props) => {
    const classes = useStyles()
    return (
        <div className={classes.wrapper}>
            <h1>This is DomainList component</h1>
        </div>
    );
}

export default DomainList;
