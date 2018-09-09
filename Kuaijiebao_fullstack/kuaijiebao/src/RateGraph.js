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
import Chart from 'react-apexcharts'


function getStatisticsFromServer(userId,success) {
    return axios.get('http://localhost:2222/assetflow/period/year/{userId}'+userId)
        .then(function (response) {
            console.log(response);
            return response.data;
        })
        .then(success)
        .catch(function (error) {
            console.log(error);
        });
}

class RateGraph extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data:[],
            options: {
                chart: {
                    id: 'apexchart-example'
                },
                xaxis: {
                    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
                }
            },
            series: [{
                name: 'series-1',
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            }]
        }
    }

    componentDidMount(){
        let userId=localStorage.getItem('userId');
        getStatisticsFromServer(userId,(data)=>{this.setState({data:data})});
    }

    render() {
        return (
            <Chart options={this.state.options} series={this.state.series} type="bar" width={500} height={320} />
        )
    }
}

export default(RateGraph);