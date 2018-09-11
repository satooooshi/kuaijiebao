import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Markdown from './Markdown';
import post1 from './blog-post.1.md';
import post2 from './blog-post.1.md';
import post3 from './blog-post.1.md';
import {
    Link,
} from "react-router-dom";


const styles = theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    toolbarMain: {
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
    },
    mainFeaturedPost: {
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing.unit * 4,
    },
    mainFeaturedPostContent: {
        padding: `${theme.spacing.unit * 6}px`,
        [theme.breakpoints.up('md')]: {
            paddingRight: 0,
        },
    },
    mainGrid: {
        marginTop: theme.spacing.unit * 3,
    },
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
    markdown: {
        padding: `${theme.spacing.unit * 3}px 0`,
    },
    sidebarAboutBox: {
        padding: theme.spacing.unit * 2,
        backgroundColor: theme.palette.grey[200],
    },
    sidebarSection: {
        marginTop: theme.spacing.unit * 3,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing.unit * 8,
        padding: `${theme.spacing.unit * 6}px 0`,
    },
});

const sections = [
    {label:'Workspace',path:''},
    {label:'My Debt',path:'mydebt'},
    {label:'My Finance',path:'myfp'},
    {label:'Counsel',path:'counsel'},
    {label:'My Statistics',path:'statistics'},
    {label:'My Account',path:'account'},
];

const featuredPosts = [
    {
        title: 'Featured post',
        date: 'Nov 12',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
    },
    {
        title: 'Post title',
        date: 'Nov 11',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
    },

];

const posts = [post1, post2, post3];

const archives = [
    'March 2020',
    'February 2020',
    'January 2020',
    'December 2019',
    'November 2019',
    'October 2019',
    'September 2019',
    'August 2019',
    'July 2019',
    'June 2019',
    'May 2019',
    'April 2019',
];

const social = ['GitHub', 'Twitter', 'Facebook'];

class Blog extends Component {


    constructor(props) {
        super(props);
        this.state = {
            userId:'',
        };
    }

    //*********************************
    //
    //set userId for test
    //
    //*********************************
    componentDidMount() {
        this.setState({userId:localStorage.getItem('userId')});
    }

    handleSignOut=()=>{
      localStorage.removeItem("userId");
    };

    render() {
        const {classes} = this.props;
        let userId=this.state.userId;
        return (
            <React.Fragment>
                <CssBaseline/>
                <div className={classes.layout}>
                    <Toolbar className={classes.toolbarMain}>
                        <Button size="small">See on GitHub</Button>
                        <Typography
                            variant="headline"
                            color="inherit"
                            align="center"
                            noWrap
                            className={classes.toolbarTitle}
                        >
                            KuaiJieBao
                        </Typography>

                        <Button variant="outlined" size="small" component={Link} to={{
                            pathname: "/signup",
                        }}>
                            {(userId) ?
                                <Button variant="outlined" size="small" onClick={this.handleSignOut} component={Link} to={{
                                    pathname: "/"}}>Sign out</Button>:
                                <div>
                                    <Button variant="outlined" size="small" component={Link} to={{
                                        pathname: "/signup"}}>Sign up</Button><hr/>
                                    <Button variant="outlined" size="small" component={Link} to={{
                                        pathname: "/signin"}}>Sign in</Button>
                                </div>}
                        </Button>
                    </Toolbar>
                    <Toolbar variant="dense" className={classes.toolbarSecondary}>
                        {sections.map(section => (
                            <Typography color="inherit" noWrap key={section.label} component={Link} to={{
                                pathname: "/" + section.path,
                            }}>
                                {section.label}
                            </Typography>
                        ))}
                    </Toolbar>
                </div>

            </React.Fragment>
        );
    }
}

Blog.propTypes = {
    classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(Blog);