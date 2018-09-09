import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import {
    Link,
} from "react-router-dom";
import axios from "axios";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    withoutLabel: {
        marginTop: theme.spacing.unit * 3,
    },
    textField: {
        flexBasis: 200,
    },
});

function postBankcardToServer(userId,data,success) {
    console.log(data);
    return axios({
        method: 'post',
        url: 'http://localhost:2222/user/bankcard',
        data:{
            userId:userId,
            name:data.name,
            expiry:data.expiry,
            cvc:data.cvc,
            cardNum:data.number
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
            number:'',
            name:'',
            expiry:'',
            cvc:'',
            focused:"number",
        };
    }
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value, focused:prop });
    };


    handleAdd=()=>{
        let data={
            name:this.state.name,
            expiry:this.state.expiry,
            cvc:this.state.cvc,
            cardNum:this.state.number,
        };
        let userId=localStorage.getItem('userId');
        postBankcardToServer(userId,data,()=>{});
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>

                <Cards
                    number={this.state.number}
                    name={this.state.name}
                    expiry={this.state.expiry}
                    cvc={this.state.cvc}
                    focused={this.state.focused}
                    preview={true}
                />

                <FormControl
                    className={classNames(classes.margin, classes.withoutLabel, classes.textField)}
                    aria-describedby="weight-helper-text"
                >
                    <Input
                        id="adornment-weight"
                        value={this.state.number}
                        onChange={this.handleChange('number')}
                        inputProps={{
                            'aria-label': 'Weight',
                        }}
                    />
                    <FormHelperText id="weight-helper-text">Card Number</FormHelperText>
                </FormControl>
                <FormControl
                    className={classNames(classes.margin, classes.withoutLabel, classes.textField)}
                    aria-describedby="weight-helper-text"
                >
                    <Input
                        id="adornment-weight"
                        value={this.state.expiry}
                        onChange={this.handleChange('expiry')}
                        inputProps={{
                            'aria-label': 'Weight',
                        }}
                    />
                    <FormHelperText id="weight-helper-text">Expiry</FormHelperText>
                </FormControl>
                <FormControl
                    className={classNames(classes.margin, classes.withoutLabel, classes.textField)}
                    aria-describedby="weight-helper-text"
                >
                    <Input
                        id="adornment-weight"
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                        inputProps={{
                            'aria-label': 'Weight',
                        }}
                    />
                    <FormHelperText id="weight-helper-text">Name</FormHelperText>
                </FormControl>
                <FormControl
                    className={classNames(classes.margin, classes.withoutLabel, classes.textField)}
                    aria-describedby="weight-helper-text"
                >
                    <Input
                        id="adornment-weight"
                        value={this.state.cvc}
                        onChange={this.handleChange('cvc')}
                        inputProps={{
                            'aria-label': 'Weight',
                        }}
                    />
                    <FormHelperText id="weight-helper-text">CVC</FormHelperText>
                </FormControl>



                <Button color="primary" component={Link} to={{
                    pathname: "/bankcardmanagement/add/status",
                }}
                onClick={this.handleAdd()}
                >
                    Add
                </Button>
            </div>
        );
    }
}

BankcardAdd.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BankcardAdd);