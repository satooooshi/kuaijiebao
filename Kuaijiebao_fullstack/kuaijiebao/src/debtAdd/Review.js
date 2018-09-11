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
                Application summary
            </Typography>
            <List disablePadding>
                    <ListItem className={classes.listItem}>
                        <ListItemText primary="Loan Amount" />
                        <Typography variant="body2">{localStorage.getItem('loanAmount')}</Typography>
                    </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Annual Rate" />
                    <Typography variant="body2">{getAnnualRate(localStorage.getItem('loanAmount'),localStorage.getItem('numRepayments'))}%</Typography>
                </ListItem>

                <ListItem className={classes.listItem}>
                    <ListItemText primary="Estimated Total Repayment" />
                    <Typography variant="subheading" className={classes.listItem}>
                        ¥{discardFloatOf(localStorage.getItem('loanAmount')*1+localStorage.getItem('loanAmount')*0.09/365*localStorage.getItem('numRepayments'),0)}
                    </Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="# of Repayments" />
                    <Typography variant="subheading" className={classes.listItem}>
                        {localStorage.getItem('numRepayments')}
                    </Typography>
                </ListItem>
            </List>

        </React.Fragment>
    );
}

//remain up to Nth float
function discardFloatOf(num,n){
    return Math.floor( num * Math.pow( 10, n ) ) / Math.pow( 10, n ) ;
}

function getAnnualRate(loanAmount,numRepay){
    console.log(loanAmount);
    let amount=loanAmount*1;
    let rate=0;

    if(numRepay<=7){
        return rate;
    }

    if(amount>1&&amount<999999){
        rate=18.0;
    }else if(amount>=1000000&&amount<=1999999){
        rate=12.0;
    }else if(amount>=2000000&&amount<=2999999){
        rate=9.0;
    }else if(amount>=3000000&&amount<=3999999){
        rate=7.0;
    }else if(amount>=4000000&&amount<=4999999){
        rate=4.5;
    }else{
        rate=0;
    }
    return rate;
}

Review.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Review);