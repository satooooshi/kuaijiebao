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

function BankcardRemoveStatus(props) {
    const { classes } = props;

    return (
        <div>
            <Paper className={classes.root} elevation={1}>
                <Typography variant="headline" component="h3">
                    Bankcard Removed.
                </Typography>
                <Button color="primary" component={Link} to={{
                    pathname: "/bankcardmanagement"
                }}>
                    Ok
                </Button>
            </Paper>
        </div>
    );
}

BankcardRemoveStatus.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BankcardRemoveStatus);