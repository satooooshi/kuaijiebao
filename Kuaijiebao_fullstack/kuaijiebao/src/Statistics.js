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
import Grid from '@material-ui/core/Grid';
import {
    Link,
} from "react-router-dom";
import axios from "axios";

import RateGraph from "./RateGraph";

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

function getStatisticsFromServer(userId,success) {
    return axios.get('http://localhost:2222/assetflow/' + userId)
        .then(function (response) {
            console.log(response);
            return response.data;
        })
        .then(success)
        .catch(function (error) {
            console.log(error);
        });
}

function getStatisticsPeriodFromServer(userId,period,success) {
    return axios.get('http://localhost:2222/assetflow/period/'+ period + '/' + userId)
        .then(function (response) {
            console.log(response);
            return response.data;
        })
        .then(success)
        .catch(function (error) {
            console.log(error);
        });
}


class statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
        };
    }

    componentDidMount(){
        let userId=localStorage.getItem('userId');
        getStatisticsFromServer(userId, (data) => (
            this.setState({ data: data })));
    }

    handlePeriod=(period)=>{
        let userId=localStorage.getItem('userId');
        getStatisticsPeriodFromServer(userId,period,(data)=>{
            this.setState({data:data});
        });
    };


    render() {
        const {classes} = this.props;
        let data=this.state.data;
        return (
            <div>
                <Paper className={classes.root}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Button color="primary" className={classes.button} onClick={()=>this.handlePeriod('week')}>
                            Week
                        </Button>
                        <Button color="primary" className={classes.button}  onClick={()=>this.handlePeriod('month')}>
                            Month
                        </Button>
                        <Button color="primary" className={classes.button}  onClick={()=>this.handlePeriod('year')}>
                            Year
                        </Button>
                    </Grid>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell numeric>Total.</TableCell>
                                <TableCell numeric>Income</TableCell>
                                <TableCell numeric>Expense</TableCell>
                                <TableCell numeric>.</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableCell numeric>.</TableCell>
                            <TableCell numeric>¥ 12342454</TableCell>
                            <TableCell numeric>¥ 1234.34</TableCell>
                            <TableCell numeric>.</TableCell>
                        </TableBody>
                    </Table>
                </Paper>
                <br/>
                <Grid container
                      direction="row"
                      justify="center"
                      alignItems="center">
                <RateGraph/>
                </Grid>
                <br/>
                <Paper>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell numeric>ID</TableCell>
                            <TableCell numeric>Date</TableCell>
                            <TableCell numeric>amount</TableCell>
                            <TableCell numeric>In/Out</TableCell>
                            <TableCell numeric>See Detail</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(row => {
                            return (
                                <TableRow key={row.id}>
                                    <TableCell numeric>{row.id}</TableCell>
                                    <TableCell numeric>{parseDate(row.date)}</TableCell>
                                    <TableCell numeric>{row.amount}</TableCell>
                                    <TableCell numeric>{row.inout}</TableCell>
                                    <TableCell numeric><Button color="primary"
                                                               component={Link}
                                                               to={{
                                                                   pathname: "/debtmanagement/repayment"
                                                               }}
                                                               onClick={()=>this.handleRepay(row.id)} >
                                        Detail
                                    </Button></TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                </Paper>

            </div>
        );
    }
}

statistics.propTypes = {
    classes: PropTypes.object.isRequired,
};

function parseDate(date){
    if(date) return date[0]+'/'+date[1]+'/'+date[2];
    else return date;
}
//{("IN".equals(row.inout))?"IN":"OUT"}

export default withStyles(styles)(statistics);