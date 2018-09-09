import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import {
    Link,
} from "react-router-dom";
import axios from "axios";



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

const ranges = [
    {
        value: '0-20',
        label: '0 to 20',
    },
    {
        value: '21-50',
        label: '21 to 50',
    },
    {
        value: '51-100',
        label: '51 to 100',
    },
];

function postDataToServer(data,success) {
    console.log(data);
    return axios({
        method: 'post',
        url: 'http://localhost:2222/debt/apply',
        data:{
            loanAmount:data.loanAmount,
            description:data.description,
            numRepayments:data.numRepayments,
            debitSideId:data.debitSideId
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


class DebtApplication extends Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            password: '',
            weight: '',
            weightRange: '',
            loanAmount:'',
            description:'',
            numRepayments:'',
        };
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handlePost=()=> {
        postDataToServer({
            debtSideId:"s123",
            loanAmount:this.state.loanAmount,
            description:this.state.description,
            numRepayments:this.state.numRepayments,
        },()=>console.log("success post."));

    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                
                <TextField
                    select
                    label="With Select"
                    className={classNames(classes.margin, classes.textField)}
                    value={this.state.weightRange}
                    onChange={this.handleChange('weightRange')}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                    }}
                >
                    {ranges.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <FormControl
                    className={classNames(classes.margin, classes.withoutLabel, classes.textField)}
                    aria-describedby="weight-helper-text"
                >
                    <Input
                        id="adornment-weight"
                        value={this.state.loanAmount}
                        onChange={this.handleChange('loanAmount')}
                        startAdornment={<InputAdornment position="start">¥</InputAdornment>}
                        inputProps={{
                            'aria-label': 'Weight',
                        }}
                    />
                    <FormHelperText id="weight-helper-text">Loan Amount</FormHelperText>
                </FormControl>
                <FormControl
                    className={classNames(classes.margin, classes.withoutLabel, classes.textField)}
                    aria-describedby="weight-helper-text"
                >
                    <Input
                        id="num repayments"
                        value={this.state.numRepayments}
                        onChange={this.handleChange('numRepayments')}
                        endAdornment={<InputAdornment position="end">months</InputAdornment>}
                        inputProps={{
                            'aria-label': 'Weight',
                        }}
                    />
                    <FormHelperText id="weight-helper-text"># of Repayments</FormHelperText>
                </FormControl>
                <FormControl fullWidth className={classes.margin}>
                    <InputLabel htmlFor="adornment-amount">Description</InputLabel>
                    <Input
                        id="description"
                        value={this.state.description}
                        onChange={this.handleChange('description')}
                    />
                </FormControl>
                <Button color="primary"
                        component={Link}
                        to={{
                            pathname: "/debtapplication/status",
                            state: {  referrer:{user:{userId:12345,  email:"aikawa@qq.com"} } }
                        }}
                        onClick={()=>this.handlePost()}>
                    Submit
                </Button>
            </div>
        );
    }
}

DebtApplication.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DebtApplication);