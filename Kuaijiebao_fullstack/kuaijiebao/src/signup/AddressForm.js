import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from "axios";



class AddressForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
    }

    componentDidMount(){
    }


    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value});
        localStorage.setItem(prop, event.target.value);
    };


    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Typography variant="title" gutterBottom>
                    Personal Information
                </Typography>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="First name"
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
                            label="Last name"
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
                            label="email"
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
                            label="password"
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
                            label="Address line 1"
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
                            label="Address line 2"
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
                            label="City"
                            fullWidth
                            autoComplete="billing address-level2"
                            value={this.state.city}
                            onChange={this.handleChange('city')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField id="state"
                                   name="state"
                                   label="State/Province/Region"
                                   fullWidth
                                   value={this.state.state}
                                   onChange={this.handleChange('state')}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="zip"
                            name="zip"
                            label="Zip / Postal code"
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
                            label="Country"
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