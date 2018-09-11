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
            loanAmount:'',
            numRepayments:'',
            description:''
        };
    }

    componentDidMount() {
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
                    Loan Detail
                </Typography>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="loanAmount"
                            label="loanAmount"
                            fullWidth
                            autoComplete="fname"
                            value={this.state.loanAmount}
                            onChange={this.handleChange('loanAmount')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="numRepayments"
                            name="numRepayments"
                            label="numRepayments"
                            fullWidth
                            autoComplete="billing address-line1"
                            value={this.state.numRepayments}
                            onChange={this.handleChange('numRepayments')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="description"
                            name="description"
                            label="description"
                            fullWidth
                            autoComplete="lname"
                            value={this.state.description}
                            onChange={this.handleChange('description')}
                        />

                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default AddressForm;