import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from "axios";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';



let row={id:"a",cardNum:"1234",name:"aikakwa",added:"12/12"};
class PaymentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            cvc: '',
            name: '',
            expiry: '',
            focused:"number",
        };
    }

    componentDidMount(){
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value, focused:prop });
        localStorage.setItem(prop, event.target.value);
    };


    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Typography variant="title" gutterBottom>
                    Payment method
                </Typography>
                <Grid container spacing={24}>
                    <Grid item xs={12} md={6}>
                        <TextField required id="cardName" label="Name on card" fullWidth
                                   value={this.state.name}
                                   onChange={this.handleChange('name')}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField required id="cardNumber" label="Card number" fullWidth
                                   value={this.state.nuber}
                                   onChange={this.handleChange('number')}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField required id="expDate" label="Expiry date" fullWidth
                                   value={this.state.expiry}
                                   onChange={this.handleChange('expiry')}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id="cvc"
                            label="CVC"
                            helperText="Last three digits on signature strip"
                            fullWidth
                            value={this.state.cvc}
                            onChange={this.handleChange('cvc')}/>
                    </Grid>
                    <Cards
                        number={this.state.number}
                        name={this.state.name}
                        expiry={this.state.expiry}
                        cvc={this.state.cvc}
                        focused={this.state.focused}
                        preview={true}
                    />
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox color="secondary" name="saveCard" value="yes"/>}
                            label="Remeber credit card details for next time"
                        />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default PaymentForm;