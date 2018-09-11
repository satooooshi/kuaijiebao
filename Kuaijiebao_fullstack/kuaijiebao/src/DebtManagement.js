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
    Redirect
} from "react-router-dom";
import axios from "axios";

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
function createData(amountRepayments, auditedDate, amountPerMonth, numRepayments, loanAmount,appliedDate,status) {
    id += 1;
    return { id, amountRepayments, auditedDate, amountPerMonth, numRepayments, loanAmount ,appliedDate,status};
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0,1,"SUBMITTED"),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3,1,"SUBMITTED"),
    createData('Eclair', 262, 16.0, 24, 6.0,1,"SUBMITTED"),
    createData('Cupcake', 305, 3.7, 67, 4.3,1,"SUBMITTED"),
    createData('Gingerbread', 356, 16.0, 49, 3.9,1,"SUBMITTED"),
];

function getAcceptedFromServer(userId,success) {
    return axios.get('http://localhost:2222/debt/accepted/'+userId)
        .then(function (response) {
            console.log(response);
            return response.data;
        })
        .then(success)
        .catch(function (error) {
            console.log(error);
        });
}

function getExceptAcceptedFromServer(userId,success) {
    return axios.get('http://localhost:2222/debt/exceptaccepted/'+userId)
        .then(function (response) {
            console.log(response);
            return response.data;
        })
        .then(success)
        .catch(function (error) {
            console.log(error);
        });
}

function repayToServer(userId,debtId,cardId,success) {
    return axios.get('http://localhost:2222/debt/repay/'+userId+'/'+debtId+'/'+cardId)
        .then(function (response) {
            console.log(response);
            return response.data;
        })
        .then(success)
        .catch(function (error) {
            console.log(error);
        });
}





class DebtManagement extends Component {


    constructor(props) {
        super(props);
        this.state = {
            dataOne:[],
            dataTwo:[],
        };
    }

    componentDidMount(){
        let userId=localStorage.getItem('userId');
        getAcceptedFromServer(userId, (data) => (
            this.setState({ dataOne: data })));
        getExceptAcceptedFromServer(userId, (data) => (
            this.setState({ dataTwo: data })));
    }

    handleRepay=(debtId)=>{
        console.log(debtId);
        let userId=localStorage.getItem('userId');
        repayToServer(userId,debtId,"cardId",()=>{})
    };


    render() {
        const {classes} = this.props;
        let dataOne=this.state.dataOne;
        let dataTwo=this.state.dataTwo;
        let userId=localStorage.getItem('userId');
        if(userId)
        return (
            <div>
                Ongoing Repayment List
                <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Debt ID</TableCell>
                            <TableCell numeric>Repayment Total Amount (¥)</TableCell>
                            <TableCell numeric>Accepted Date</TableCell>
                            <TableCell numeric>Amount Per Month (¥)</TableCell>
                            <TableCell numeric># of Repayments Left</TableCell>
                            <TableCell numeric>Operations</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataOne.map(row => {
                            return (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell numeric>{discardFloatOf(row.amountRepayments,2)}</TableCell>
                                    <TableCell numeric>{parseDate(row.auditedDate)}</TableCell>
                                    <TableCell numeric>{discardFloatOf(row.amountPerMonth,2)}</TableCell>
                                    <TableCell numeric>{discardFloatOf(row.numRepayments-row.repaidNum,2)}</TableCell>
                                    <TableCell numeric><Button color="primary"
                                                               component={Link}
                                                               to={{
                                                                    pathname: "/debtmanagement/repayment/status"
                                                               }}
                                                               onClick={()=>this.handleRepay(row.id)} >
                                        Repay
                                    </Button></TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                </Paper>

                Other Debt List
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Debt ID</TableCell>
                                <TableCell numeric>Loan Amount(¥)</TableCell>
                                <TableCell numeric>Applied Date</TableCell>
                                <TableCell numeric># of Repayments</TableCell>
                                <TableCell numeric>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataTwo.map(row => {
                                return (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell numeric>{row.loanAmount}</TableCell>
                                        <TableCell numeric>{parseDate(row.appliedDate)}</TableCell>
                                        <TableCell numeric>{row.numRepayments}</TableCell>
                                        <TableCell numeric>{row.status}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );

        return(
            <Redirect to="/signin"/>
        );
    }
}

DebtManagement.propTypes = {
    classes: PropTypes.object.isRequired,
};

//remain up to Nth float
function discardFloatOf(num,n){
    return Math.floor( num * Math.pow( 10, n ) ) / Math.pow( 10, n ) ;
}

//format Date
function parseDate(date){
    if(date) return date[0]+'/'+date[1]+'/'+date[2];
    else date;
}

export default withStyles(styles)(DebtManagement);