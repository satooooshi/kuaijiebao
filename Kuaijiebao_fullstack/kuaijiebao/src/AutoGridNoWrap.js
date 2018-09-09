import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ComplexGrid from "./ComplexGrid";

const styles = theme => ({
    root: {
        overflow: 'hidden',
        padding: `0 ${theme.spacing.unit * 3}px`,
    },
    wrapper: {
        maxWidth: 400,
    },
    paper: {
        margin: theme.spacing.unit,
        padding: theme.spacing.unit * 2,
    },
});

function AutoGridNoWrap(props) {
    const { classes } = props;
    const message = `Truncation should be conditionally applicable on this long line of text
                    as this is a much longer line than what the container can support. `;

    return (
        <div className={classes.root}>

            <div className={classes.wrapper}>
                <Grid container direction="row" wrap="nowrap" spacing={16}>

                    <div>
                        <br/>
                        <Paper className={classes.paper}>
                            <Grid container wrap="nowrap" spacing={16}>
                                <Grid item xs zeroMinWidth>
                                    <Typography noWrap><ComplexGrid/></Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                        <br/>
                    </div>



                </Grid>
            </div>

        </div>
    );
}

AutoGridNoWrap.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutoGridNoWrap);