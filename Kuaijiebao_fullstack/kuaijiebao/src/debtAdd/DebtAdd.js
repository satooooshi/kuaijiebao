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
import Review from './Review';
import PreInfo from "./PreInfo";
import axios from "axios";
import {
    Link,
} from "react-router-dom";

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

const steps = ['Check current loan plan', 'Loan Detail', 'Review your Loan'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <PreInfo />;
        case 1:
            return <AddressForm />;
        case 2:
            return <Review />;
        default:
            throw new Error('Unknown step');
    }
}

function addDebtToServer(data,userId,success) {
    console.log(data);
    return axios({
        method: 'post',
        url: 'http://localhost:2222/debt/apply',
        data:{
            debtSideId:userId,
            loanAmount:data.loanAmount,
            numRepayments:data.numRepayments,
            description:data.description
        }
    })
        .then(function (response) {
            console.log("signin");
            console.log(response);
            return response.data;
        })
        .then(success)
        .catch(function (error) {
            console.log(error);
        });
}

class DebtAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
        };
    }

    componentDidMount(){
    }

    handleNext = () => {

        if(this.state.activeStep===2){
            let data={
                loanAmount:localStorage.getItem('loanAmount'),
                numRepayments:localStorage.getItem('numRepayments'),
                description:localStorage.getItem('description')
            };
            let userId=localStorage.getItem('userId');
            addDebtToServer(data, userId,(data) => {});
            localStorage.removeItem("loanAmount");
            localStorage.removeItem("numPayments");
            localStorage.removeItem("description");
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


    render() {
        const { classes } = this.props;
        const { activeStep } = this.state;

        return (
            <React.Fragment>
                <CssBaseline />
                <AppBar position="absolute" color="default" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="title" color="inherit" noWrap>
                            Apply Loan
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography variant="display1" align="center">
                            Fill In Loan Detail.
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
                                        Loan Application Submitted.
                                    </Typography>
                                    <Typography variant="subheading">
                                        Your application is under auditing. Please Check Loan status at My Debt.
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleNext}
                                        className={classes.button}
                                        component={Link}
                                        to={{
                                            pathname: "/debtmanagement"
                                        }}
                                    >
                                        Got It.
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
                                            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
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

DebtAdd.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DebtAdd);