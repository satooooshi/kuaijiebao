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
            email:'',
            password:'',
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
                <Grid container spacing={24}>

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

                </Grid>
            </React.Fragment>
        );
    }
}

export default AddressForm;