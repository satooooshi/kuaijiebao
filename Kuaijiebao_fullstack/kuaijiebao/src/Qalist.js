import React, {Component}from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import {
    Link,
} from "react-router-dom";
import axios from "axios";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    withoutLabel: {
        marginTop: theme.spacing.unit * 3,
    },
    textField: {
        flexBasis: 200,
    },
});


function getDataFromServer(success) {
    return axios.get('http://localhost:2222/question')
        .then(function (response) {
            console.log(response);
            return response.data;
        })
        .then(success)
        .catch(function (error) {
            console.log(error);
        });
}
function getSearchResultFromServer(keyword,success,) {
    return axios.get('http://localhost:2222/question/search?keyword='+keyword)
        .then(function (response) {
            console.log(response);
            return response.data;
        })
        .then(success)
        .catch(function (error) {
            console.log(error);
        });
}

class Qalist extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data:[],
            keyword:'',
        };
    }

    componentDidMount(){
        getDataFromServer((data) => (
            this.setState({ data: data })));
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleSearch=()=>{
        let keyword=this.state.keyword;
        getSearchResultFromServer(keyword,(data) => (
            this.setState({ data: data })));

    };

    render(){

        const { classes } = this.props;
        let questions = this.state.data.map(question =>
            <Question question={question}/>
        );

        return (
            <div>
                <div>
                    <h3>Q&A</h3>
                </div>
                <div>
                    <FormControl
                        className={classNames(classes.margin, classes.withoutLabel, classes.textField)}
                        aria-describedby="weight-helper-text"
                    >
                        <Input
                            id="adornment-weight"
                            value={this.state.keyword}
                            onChange={this.handleChange('keyword')}
                            inputProps={{
                                'aria-label': 'Weight',
                            }}
                        />
                        <FormHelperText id="weight-helper-text">Search by Keyword</FormHelperText>
                    </FormControl>
                    <Button color="primary"
                            onClick={()=>this.handleSearch()}
                    >
                        Search
                    </Button>
                </div>

                <table>
                    <tbody>
                    <tr>
                        <th>Title</th>
                        <th>Answer</th>
                    </tr>
                    {questions}
                    </tbody>
                </table>
            </div>



        );
    }
}


class Question extends Component{

    render() {
        return (
            <div>
                <tr>
                    <td><Link to={{
                        pathname: "/qalist/"+this.props.question.id,
                        state: {  referrer:{ data:this.props.question } }
                    }}>{this.props.question.title}</Link></td>
                    <td>{this.props.question.answer}</td>
                </tr>
            </div>
        )
    }
}


Qalist.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Qalist);