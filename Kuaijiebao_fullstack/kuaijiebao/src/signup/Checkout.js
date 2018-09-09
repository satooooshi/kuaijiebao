import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import {
    Link,
} from "react-router-dom";
import axios from "axios";


const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            marginTop: theme.spacing.unit * 6,
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 3,
        },
    },
    stepper: {
        padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit,
    },
});

const steps = ['Personal Information', 'Payment Details', 'Review Your Information'];




function getStepContent(step) {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <PaymentForm />;
        case 2:
            return <Review />;
        default:
            throw new Error('Unknown step');
    }
}


function postNewUserOfUserSpecAndBankcardToServer(data,success) {
    console.log(data);
    return axios({
        method: 'post',
        url: 'http://localhost:2222/user/signup',
        data:{
            firstName:data.firstname,
            lastName:data.lastname,
            password:data.password,
            email:data.email,

            name:data.name,
            expiry:data.expiry,
            cvc:data.cvc,
            cardNum:data.cardNum,
        }
    })
        .then(function (response) {
            console.log(response);
            return response.data;
        })
        .then(success)
        .catch(function (error) {
            console.log(error);
        });
}

class Checkout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
        };
    }

    componentDidMount(){
    }

    handleNext = () => {

        if(this.state.activeStep===0) {
            let data = {
                firstname: localStorage.getItem("firstname"),
                lastname: localStorage.getItem("lastname"),
                email: localStorage.getItem("email"),
                password: localStorage.getItem("password"),
                address1: localStorage.getItem("address1"),
                address2: localStorage.getItem("address2"),
                city: localStorage.getItem("city"),
                zip: localStorage.getItem("zip"),
                state: localStorage.getItem("state"),
                country: localStorage.getItem("country")
            };
            console.log(data);
        }else if(this.state.activeStep===1){
            let data = {
                cardNum: localStorage.getItem("number"),
                cvc: localStorage.getItem("cvc"),
                name: localStorage.getItem("name"),
                expiry: localStorage.getItem("expiry"),
                userId:localStorage.getItem("userId")
            };
            console.log(data);
        }else if(this.state.activeStep===2){
            let data={
                firstname: localStorage.getItem("firstname"),
                lastname: localStorage.getItem("lastname"),
                email: localStorage.getItem("email"),
                password: localStorage.getItem("password"),
                address1: localStorage.getItem("address1"),
                address2: localStorage.getItem("address2"),
                city: localStorage.getItem("city"),
                zip: localStorage.getItem("zip"),
                state: localStorage.getItem("state"),
                country: localStorage.getItem("country"),
                cardNum: localStorage.getItem("number"),
                cvc: localStorage.getItem("cvc"),
                name: localStorage.getItem("name"),
                expiry: localStorage.getItem("expiry"),
            };
            postNewUserOfUserSpecAndBankcardToServer(data, (data) => {

            });

            localStorage.removeItem("firstname");
            localStorage.removeItem("lastname");
            localStorage.removeItem("email");
            localStorage.removeItem("password");
            localStorage.removeItem("address1");
            localStorage.removeItem("address2");
            localStorage.removeItem("city");
            localStorage.removeItem("zip");
            localStorage.removeItem("state");
            localStorage.removeItem("country");
            localStorage.removeItem("number");
            localStorage.removeItem("cvc");
            localStorage.removeItem("name");
            localStorage.removeItem("expiry");
            console.log("finish cleaning...");
        }

        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep + 1,
        });

    };

    handleBack = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep - 1,
        });
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    render() {
        const { classes } = this.props;
        const { activeStep } = this.state;

        return (
            <React.Fragment>
                <CssBaseline />
                <AppBar position="absolute" color="default" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="title" color="inherit" noWrap>
                            Welcome To Kuaijiebao
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography variant="display1" align="center">
                            Sign Up
                        </Typography>
                        <Stepper activeStep={activeStep} className={classes.stepper}>
                            {steps.map(label => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <React.Fragment>
                            {activeStep === steps.length ? (
                                <React.Fragment>
                                    <Typography variant="headline" gutterBottom>
                                        Thank you for registration.
                                    </Typography>
                                    <Typography variant="subheading">
                                        We have emailed your registration confirmation,
                                        Please check you email box to finish registration.
                                    </Typography>
                                    <Button color="primary" variant="contained" component={Link} to={{
                                        pathname: "/signin",
                                    }}>
                                        Sign In
                                    </Button>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    {getStepContent(activeStep)}
                                    <div className={classes.buttons}>
                                        {activeStep !== 0 && (
                                            <Button onClick={this.handleBack} className={classes.button}>
                                                Back
                                            </Button>
                                        )}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Register' : 'Next'}
                                        </Button>
                                    </div>
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}

Checkout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Checkout);