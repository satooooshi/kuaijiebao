import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

function getBankcardFromServer(userId,success) {
    return axios.get('http://localhost:2222/user/bankcard/'+userId)
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
            balance:'',
            data:[],
            chosenCard:'',
        };
    }

    componentDidMount(){
        let userId=localStorage.getItem('userId');
        getBankcardFromServer(userId,(data)=>{this.setState({data:data});console.log(data.length);});

    }


    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
        localStorage.setItem(prop, event.target.value);
    };

    handleChoose=(cardId)=>{
        this.setState({chosenCard: cardId});
        localStorage.setItem('chosenCard',cardId);
    };


    render() {
        const {classes} = this.props;
        let data=this.state.data;
        return (
            <React.Fragment>
                <Typography variant="title" gutterBottom>
                    Top Up Amount
                </Typography>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="balance"
                            name="balance"
                            label="balance"
                            fullWidth
                            autoComplete="fname"
                            value={this.state.balance}
                            onChange={this.handleChange('balance')}
                        />
                    </Grid>
                    <Paper >
                        <Typography variant="title" gutterBottom>
                            Choose Bankcard
                        </Typography>
<br/>
                        <Table >
                            <TableHead>
                                <TableRow>
                                    <TableCell >Card No.</TableCell>
                                    <TableCell >Choose</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <div>{data.map(row => {
                                    return (
                                        <TableRow key={row.id}>
                                            <TableCell component="th" scope="row">
                                                {row.cardNum}
                                            </TableCell>
                                            <TableCell><Button color="primary" onClick={() => this.handleChoose(row.id)}>
                                                    Choose
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}</div>
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </React.Fragment>
        );
    }
}

export default AddressForm;