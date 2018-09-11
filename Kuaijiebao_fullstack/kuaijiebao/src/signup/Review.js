import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const products = [
    { name: 'firstname', desc: 'A nice thing', price: '$9.99' },
    { name: 'lastname', desc: 'Another thing', price: '$3.45' },
    { name: 'email', desc: 'Something else', price: '$6.51' },
    { name: 'password', desc: 'Best thing of all', price: '$14.11' },
    { name: '', desc: '', price: '' },
];

const payments = [
    { name: 'name', detail: 'Mr John Smith' },
    { name: 'number', detail: 'Visa' },
    { name: 'expiry', detail: 'xxxx-xxxx-xxxx-1234' },
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
                Account summary
            </Typography>
            <List disablePadding>
                {products.map(product => (
                    <ListItem className={classes.listItem} key={product.name}>
                        <ListItemText primary={product.name} />
                        <Typography variant="subheading" className={classes.total}>
                            {localStorage.getItem(product.name)}
                        </Typography>
                    </ListItem>
                ))}
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Total" />
                    <Typography variant="subheading" className={classes.total}>
                        $34.06
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={16}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="title" gutterBottom className={classes.title}>
                        Address
                    </Typography>
                    <Typography gutterBottom>{localStorage.getItem('firstname')+' '+localStorage.getItem('lastname') }</Typography>
                    <Typography gutterBottom>{
                        localStorage.getItem('zip')+' '+
                        localStorage.getItem('country')+' '+
                        localStorage.getItem('state')+' '+
                        localStorage.getItem('city')+' '+
                        localStorage.getItem('address1')+' '+
                        localStorage.getItem('address2')
                    }</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="title" gutterBottom className={classes.title}>
                        Payment details
                    </Typography>
                    <Grid container>
                        {payments.map(payment => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={12} xm={6}>
                                    <Typography gutterBottom>{localStorage.getItem(payment.name)}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

Review.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Review);