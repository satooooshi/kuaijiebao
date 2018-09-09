import React, {Component}from 'react';
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

function postDataToServer(success) {
    return axios({
        method: 'post',
        url: 'http://localhost:2222/user/spec',
        data:{success},
        "Access-Control-Allow-Origin":"*",
    }).then(function (response) {
            console.log(response);
            return response.data;
        })
        .then(success)
        .catch(function (error) {
            console.log(error);
        });
}

function getDataFromServer(userId,success) {
    return axios.get('http://localhost:2222/user/spec/'+userId)
        .then(function (response) {
            console.log(response);
            return response.data;
        })
        .then(success)
        .catch(function (error) {
            console.log(error);
        });
}

const ageRanges = [
    {
        value: '0-20',
        label: '0 to 20',
    },
    {
        value: '21-50',
        label: '21 to 50',
    },
    {
        value: '51 -',
        label: 'over 51',
    }
];

const workRanges = [
    {
        value: 'student',
        label: 'student',
    },
    {
        value: 'business wo/man',
        label: 'business wo/man',
    },
    {
        value: 'public official',
        label: 'public official',
    },
    {
        value: 'etc',
        label: 'etc',
    }
];

class Myinfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            password: '',
            weight: '',
            weightRange: '',
            work:'',
            address:'',
            income:'',
            age:''
        };
    }

    componentDidMount(){
        let userId=localStorage.getItem('userId');
        getDataFromServer(userId,(data) => (
            this.setState({
                id:924337,
                work:data.work,
                address:data.address,
                income:data.income,
                age:data.age,
            })));
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handlePost=()=> {
        console.log("click");
        postDataToServer({
            id:924337,
            work:this.state.work,
            address:this.state.address,
            income:this.state.income,
            age:this.state.age,
        });

    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <TextField
                    select
                    label="Work"
                    className={classNames(classes.margin, classes.textField)}
                    value={this.state.work}
                    onChange={this.handleChange('work')}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">{this.state.work}</InputAdornment>,
                    }}
                >
                    {workRanges.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    label="Age"
                    className={classNames(classes.margin, classes.textField)}
                    value={this.state.age}
                    onChange={this.handleChange('age')}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">{this.state.age}</InputAdornment>,
                    }}
                >
                    {ageRanges.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <FormControl fullWidth className={classes.margin}>
                    <InputLabel htmlFor="adornment-amount">Address</InputLabel>
                    <Input
                        id="adornment-amount"
                        value={this.state.address}
                        onChange={this.handleChange('address')}
                        startAdornment={<InputAdornment position="start">{this.state.address}</InputAdornment>}

                    />
                </FormControl>
                <FormControl
                    className={classNames(classes.margin, classes.withoutLabel, classes.textField)}
                    aria-describedby="weight-helper-text"
                >
                    <Input
                        id="adornment-weight"
                        value={this.state.income}
                        onChange={this.handleChange('income')}
                        startAdornment={<InputAdornment position="start">{this.state.income}</InputAdornment>}
                        endAdornment={<InputAdornment position="end">k</InputAdornment>}
                        inputProps={{
                            'aria-label': 'Weight',
                        }}
                    />
                    <FormHelperText id="weight-helper-text">Income (¥)</FormHelperText>
                </FormControl>
                <Button color="primary"
                        component={Link}
                        to={{
                            pathname: "/myinfo/status",
                            state: {  referrer:{user:{userId:12345,  email:"aikawa@qq.com"} } }
                            }}
                        onClick={()=>this.handlePost()}
                >
                    Update
                </Button>
            </div>
        );
    }
}

Myinfo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Myinfo);