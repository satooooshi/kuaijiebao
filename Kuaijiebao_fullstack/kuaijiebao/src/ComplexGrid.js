import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const styles = theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 600,
        padding: theme.spacing.unit * 2,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
});

function ComplexGrid(props) {
    const { classes } = props;
    return (
        <Paper className={classes.root}>
            <Grid container spacing={16}>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={16}>
                        <Grid item xs zeroMinWidth>
                            <Typography noWrap gutterBottom variant="subheading">
                                Standard license
                            </Typography>
                            <Typography noWrap gutterBottom>Full resolution 1920x1080 • JPEG</Typography>
                            <Typography noWrap color="textSecondary">ID: 1030114fffffffffffffffff</Typography>
                        </Grid>
                        <Grid item zeroMinWidth>
                            <Typography noWrap style={{ cursor: 'pointer' }}>Remove</Typography>
                        </Grid>
                    </Grid>
                    <Grid item zeroMinWidth>
                        <Typography noWrap variant="subheading">$19.00</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}

ComplexGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComplexGrid);