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

function postPasswordToServer(data,success) {
    console.log(data);
    return axios({
        method: 'get',
        url: 'http://localhost:2222/user/password/'+data.userId+'/'+data.password,
        data:{

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

class PasswordManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password:'',
        };
    }
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleAdd=()=>{
        let data={
            userId:7143423,
            password:this.state.password,
        };
        postPasswordToServer(data,()=>{});
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <FormControl
                    className={classNames(classes.margin, classes.withoutLabel, classes.textField)}
                    aria-describedby="weight-helper-text"
                >
                    <Input
                        id="adornment-weight"
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        endAdornment={<InputAdornment position="end"></InputAdornment>}
                        inputProps={{
                            'aria-label': 'Weight',
                        }}
                    />
                    <FormHelperText id="weight-helper-text">New Password</FormHelperText>
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

PasswordManagement.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PasswordManagement);