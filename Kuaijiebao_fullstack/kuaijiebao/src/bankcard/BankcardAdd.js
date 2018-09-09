import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PaymentForm from './PaymentForm';
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

function postBankcardToServer(userId,data,success) {
    console.log(data);
    return axios({
        method: 'post',
        url: 'http://localhost:2222/user/bankcard/'+userId,
        data:{
            name:data.name,
            expiry:data.expiry,
            cvc:data.cvc,
            cardNum:data.cardNum
        },
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

class BankcardAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount(){
    }

    handleAdd = () => {
        let data={
            cardNum: localStorage.getItem("number"),
            cvc: localStorage.getItem("cvc"),
            name: localStorage.getItem("name"),
            expiry: localStorage.getItem("expiry"),
        };
        let userId=localStorage.getItem("userId");
        postBankcardToServer(userId,data,()=>{});
        localStorage.removeItem("number");
        localStorage.removeItem("cvc");
        localStorage.removeItem("name");
        localStorage.removeItem("expiry");
    };

    handleCancel = () => {
    };


    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <CssBaseline />
                <AppBar position="absolute" color="default" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="title" color="inherit" noWrap>
                            Add BankCard
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography variant="title" color="inherit" noWrap>
                            BankCard Details
                        </Typography>
                        <React.Fragment>
                            <PaymentForm/>
                            <div className={classes.buttons}>
                                <Button onClick={this.handleCancel}
                                        className={classes.button}
                                        component={Link} to={{
                                    pathname: "/bankcardmanagement",
                                }}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleAdd}
                                    className={classes.button}
                                    component={Link} to={{
                                    pathname: "/bankcardmanagement/add/status",
                                }}>
                                    Add
                                </Button>
                            </div>
                        </React.Fragment>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}

BankcardAdd.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BankcardAdd);