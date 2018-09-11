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
    { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
    { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
    { name: 'Product 3', desc: 'Something else', price: '$6.51' },
    { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
    { name: 'Shipping', desc: '', price: 'Free' },
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
                Do you confirm the update?
            </Typography>
            <List disablePadding>
                    <ListItem className={classes.listItem}>
                        <ListItemText primary="Address1" />
                        <Typography variant="body2">{localStorage.getItem('address1')}</Typography>
                    </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Address2" />
                    <Typography variant="body2">{localStorage.getItem('address2')}</Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="City" />
                    <Typography variant="body2">{localStorage.getItem('city')}</Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="State/privince" />
                    <Typography variant="body2">{localStorage.getItem('state')}</Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Country" />
                    <Typography variant="body2">{localStorage.getItem('country')}</Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Zip" />
                    <Typography variant="body2">{localStorage.getItem('zip')}</Typography>
                </ListItem>
            </List>

        </React.Fragment>
    );
}

//remain up to Nth float
function discardFloatOf(num,n){
    return Math.floor( num * Math.pow( 10, n ) ) / Math.pow( 10, n ) ;
}

Review.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Review);