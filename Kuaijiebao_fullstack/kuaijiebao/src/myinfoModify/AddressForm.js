import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from "axios";

function getSpecFromServer(userId,success) {
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
function getUserFromServer(userId,success) {
    return axios.get('http://localhost:2222/user/'+userId)
        .then(function (response) {
            console.log(response);
            return response.data;
        })
        .then(success)
        .catch(function (error) {
            console.log(error);
        });
}
class AddressForm extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data:{},//Only initial data
            address1:'',
            address2:'',
            city:'',
            state:'',
            country:'',
            zip:'',
        };
    }

    componentDidMount() {
        let userId=localStorage.getItem('userId');
        getSpecFromServer(userId,(data)=>{
            this.setState({
                data:data,
                address1:data.address1,
                address2:data.address2,
                city:data.city,
                state:data.state,
                country:data.country,
                zip:data.zip,
            });
            Object.keys(data).map(function(key, index) {
                localStorage.setItem(key,data[key]);
            });
        });
        getUserFromServer(userId,(data)=>{
            this.setState({
                data:data,
                firstname:data.firstName,
                lastname:data.lastName,
                email:data.email,
                password:data.password,
            });
            Object.keys(data).map(function(key, index) {
                localStorage.setItem(key,data[key]);
            });
        });
    }


    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
        localStorage.setItem(prop, event.target.value);
    };


    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <Typography variant="title" gutterBottom>
                    Personal Info.
                </Typography>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            helperText="First name"
                            fullWidth
                            autoComplete="fname"
                            value={this.state.firstname}
                            onChange={this.handleChange('firstname')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            helperText="Last name"
                            fullWidth
                            autoComplete="lname"
                            value={this.state.lastname}
                            onChange={this.handleChange('lastname')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            helperText="email"
                            fullWidth
                            autoComplete="email"
                            value={this.state.email}
                            onChange={this.handleChange('email')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="password"
                            name="password"
                            helperText="password"
                            fullWidth
                            autoComplete="password"
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="address1"
                            name="address1"
                            helperText="Address line 1"
                            fullWidth
                            autoComplete="billing address-line1"
                            value={this.state.address1}
                            onChange={this.handleChange('address1')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="addiress2"
                            name="addiress2"
                            helperText="Address line 2"
                            fullWidth
                            autoComplete="billing address-line2"
                            value={this.state.address2}
                            onChange={this.handleChange('address2')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="city"
                            name="city"
                            helperText="City"
                            fullWidth
                            autoComplete="billing address-level2"
                            value={this.state.city}
                            onChange={this.handleChange('city')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField id="state"
                                   name="state"
                                   helperText="State/Province/Region"
                                   fullWidth
                                   value={this.state.state}
                                   onChange={this.handleChange('state')}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="zip"
                            name="zip"
                            helperText="Zip / Postal code"
                            fullWidth
                            autoComplete="billing postal-code"
                            value={this.state.zip}
                            onChange={this.handleChange('zip')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="country"
                            name="country"
                            helperText="Country"
                            fullWidth
                            autoComplete="billing country"
                            value={this.state.country}
                            onChange={this.handleChange('country')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox color="secondary" name="saveAddress" value="yes"/>}
                            label="Use this address for payment details"
                        />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default AddressForm;