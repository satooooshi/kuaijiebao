import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {
    Link,
} from "react-router-dom";
import axios from "axios";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

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

function deleteBankcatdFromServer(cardId,success) {
    return axios({
        method: 'delete',
        url: 'http://localhost:2222/user/bankcard/'+cardId,
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


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
    id += 1;
    return { id, name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const bard=[{id:"a",cardNum:"1234",name:"aikakwa",added:"12/12"},{id:"b",cardNum:"1234",name:"aiakwa",added:"12/12"}];

class BankcardManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:[],
        };
    }

    componentDidMount(){
        let userId=localStorage.getItem('userId');
        getBankcardFromServer(userId,(data)=>{this.setState({data:data})});
    }

    handleRemove=(cardId)=>{
        deleteBankcatdFromServer(cardId,()=>{});
    };

    render() {
        const {classes} = this.props;
        let data=this.state.data;
        if(data===undefined)
            return (
                <div>
                    <Button variant="contained" color="primary"
                            component={Link}
                            to={{
                                pathname: "/bankcardmanagement/add",
                                state: {  referrer:{user:{userId:12345,  email:"aikawa@qq.com"} } }
                            }}
                            onClick={()=>this.handlePost()}>
                        Add New Card
                    </Button>
                </div>);
        return (
            <div>
                Bankcard Management
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell numeric>Card No.</TableCell>
                                <TableCell numeric>Added Date</TableCell>
                                <TableCell numeric>Operation</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                <div>{data.map(row => {
                                    return (
                                        <TableRow key={row.id}>
                                            <TableCell component="th" scope="row">
                                                <Cards
                                                    number={row.cardNum}
                                                    name={row.name}
                                                    expiry={row.expiry}
                                                    cvc={row.cvc}
                                                />
                                            </TableCell>
                                            <TableCell numeric>{parseDate(row.addedDate)}</TableCell>
                                            <TableCell numeric><Button color="primary" component={Link} to={{
                                                pathname: "/bankcardmanagement/remove",
                                            }} onClick={() => this.handleRemove(row.id)}>
                                                Remove
                                            </Button></TableCell>
                                        </TableRow>
                                    );
                                })}</div>
                        </TableBody>
                    </Table>
                </Paper>
                <Paper className={classes.root}>
                    <Button color="primary" component={Link} to={{
                        pathname: "/bankcardmanagement/add",
                    }}>
                        Add Card
                    </Button>
                </Paper>
            </div>
        );
    }
}
BankcardManagement.propTypes = {
    classes: PropTypes.object.isRequired,
};

//format Date
function parseDate(date){
    if(date) return date[0]+'/'+date[1]+'/'+date[2];
    else return date;
}

export default withStyles(styles)(BankcardManagement);