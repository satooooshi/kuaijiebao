import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import axios from "axios";


const products = [
    { name: 'Plan 1', desc: 'For low amount loan ¥1 ~ ¥999999', price: '18.0%' },
    { name: 'Plan 2', desc: 'For moderate amount loan ¥1000000 ~ ¥1999999', price: '12.0%' },
    { name: 'Plan 3', desc: 'For relatively large amount loan ¥2000000 ~ ¥2999999', price: '9.0%' },
    { name: 'Plan 4', desc: 'For large amount loan ¥3000000 ~ ¥3999999', price: '7.0%' },
    { name: 'Plan 5', desc: 'For large amount loan ¥4000000 ~ ¥4999999', price: '4.5%' },
    { name: 'Plan 6', desc: 'For loan within 7 days', price: 'Free 0%' },
];
const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: 'Mr John Smith' },
    { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
    { name: 'Expiry date', detail: '04/2024' },
];

const styles = theme => ({
    listItem: {
        padding: `${theme.spacing.unit}px 0`,
    },
    total: {
        fontWeight: '700',
    },
    title: {
        marginTop: theme.spacing.unit * 2,
    },
});

function Review(props) {
    const { classes } = props;
    return (
        <React.Fragment>
            <Typography variant="title" gutterBottom>
                Current Loan Plan
            </Typography>
            <List disablePadding>
                {products.map(product => (
                    <ListItem className={classes.listItem} key={product.name}>
                        <ListItemText primary={product.name} secondary={product.desc} />
                        <Typography variant="body2">{product.price}</Typography>
                    </ListItem>
                ))}
            </List>
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <Typography variant="title" gutterBottom className={classes.title}>
                        Calculation of annual rate
                    </Typography>
                    <Typography variant="subheading" gutterBottom>(Loan Amount)x(Rate)/365x(Number of Repayments)</Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

Review.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Review);