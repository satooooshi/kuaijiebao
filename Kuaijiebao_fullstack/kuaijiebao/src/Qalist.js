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
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {
    Link,
} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import VirtualList from 'react-virtual-list';
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
        let data = this.state.data;

        let myBigListOfItems=data;
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
                <MyVirtualList
                    items={myBigListOfItems}
                    itemHeight={100}
                />
            </div>



        );
    }
}

const MyList = ({
                    virtual,
                    itemHeight,
                }) => (
    <ul style={virtual.style}>
        {virtual.items.map(item => (
            <li key={`item_${item.id}`} style={{height: itemHeight}}>
                <Typography variant="title" gutterBottom >
                    <Link to={{
                        pathname: "/qalist/"+item.id,
                        state: {  referrer:{item} }
                    }}>{item.title}</Link>
                </Typography>
                <Typography variant="subheading" gutterBottom>{item.answer}</Typography>
            </li>
        ))}
    </ul>
);

const MyVirtualList = VirtualList()(MyList);



Qalist.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Qalist);

/*
<List disablePadding>
                    <ListItem  key={product.id}>
                        <ListItemText primary={product.title}
                                      component={Link}
                                      to={{
                                          pathname: "/qalist/"+product.id,
                                      }}/>
                        <Typography variant="body2">{product.answer}</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleNext}
                            className={classes.button}
                            component={Link}
                            to={{
                                pathname: "/debtmanagement"
                            }}
                        >
                            Got It.
                        </Button>
                    </ListItem>
            </List>
 */