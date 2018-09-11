import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
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




function signinToServer(data,success) {
    console.log(data);
    return axios({
        method: 'post',
        url: 'http://localhost:2222/user/signin',
        data:{
           email:data.email,
           password:data.password,
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

class Signin extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount(){
    }

    handleSignin = () => {
            let data={
                email: localStorage.getItem("email"),
                password: localStorage.getItem("password"),
            };
            signinToServer(data, (data) => {
                localStorage.setItem('userId', data.id);
                console.log(localStorage.getItem("userId"));

        });
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        console.log("finish cleaning...");
    };

    render() {
        const { classes } = this.props;

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
                            Sign In
                        </Typography>
                        <React.Fragment>
                                <React.Fragment>
                                    <AddressForm/>
                                    <div className={classes.buttons}>
                                            <Button onClick={this.handleBack} className={classes.button}
                                                    component={Link} to={{
                                                pathname: "/",
                                            }}>
                                                Back
                                            </Button>
                                        <Button
                                            color="primary"
                                            onClick={this.handleSignin}
                                            className={classes.button}
                                            component={Link} to={{
                                            pathname: "/signup",
                                        }}
                                        >
                                            Sign Up
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleSignin}
                                            className={classes.button}
                                            component={Link} to={{
                                            pathname: "/",
                                        }}
                                        >
                                            Sign In
                                        </Button>
                                    </div>
                                </React.Fragment>
                        </React.Fragment>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}

Signin.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signin);