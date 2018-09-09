import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {
    Link,
} from "react-router-dom";


const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});

function RepaymentStatus(props) {
    const { classes } = props;

    return (
        <div>
            <Paper className={classes.root} elevation={1}>
                <Typography variant="headline" component="h3">
                    Repayment Succeed.
                </Typography>
                <Button color="primary" component={Link} to={{
                    pathname: "/debtmanagement",
                    state: {  referrer:{user:{userId:12345,  email:"aikawa@qq.com"} } }
                }}>
                    Ok
                </Button>
            </Paper>
        </div>
    );
}

RepaymentStatus.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RepaymentStatus);