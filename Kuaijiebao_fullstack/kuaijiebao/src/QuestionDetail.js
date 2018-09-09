import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from "axios";

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});

function QuestionDetail(props) {
    const { classes } = props;
    console.log(props.location.state);
    return (
        <div>
            <Paper className={classes.root} elevation={1}>
                <Typography variant="headline" component="h3">
                    {props.location.state.referrer.data.title}
                </Typography>
                <Typography component="p">
                    {props.location.state.referrer.data.answer}
                </Typography>
            </Paper>
        </div>
    );
}

QuestionDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuestionDetail);