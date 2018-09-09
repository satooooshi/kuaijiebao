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
import DebtManagement from "./DebtManagement";
import AutoGridNoWrap from "./AutoGridNoWrap";
import Statistics from "./Statistics";
import axios from "axios";

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

const featuredPosts = [
    {
        title: 'Your Personal Credit',
        date: 'Nov 12',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
    },
    {
        title: 'Total Balance (RMB)',
        date: 'Nov 11',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
    },
    {
        title: 'Yesterday Income',
        date: 'Nov 11',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
    },
    {
        title: 'Upcoming Income',
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


function getDayIncomeFromServer(userId,success) {
    return axios.get('http://localhost:2222/assetflow/day/' + userId)
        .then(function (response) {
            console.log(response);
            return response.data;
        })
        .then(success)
        .catch(function (error) {
            console.log(error);
        });
}
function getBalanceFromServer(userId,success) {
    return axios.get('http://localhost:2222/user/balance/' + userId)
        .then(function (response) {
            console.log(response);
            return response.data.balance;
        })
        .then(success)
        .catch(function (error) {
            console.log(error);
        });
}

class Main extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data:[],
            balance:0,

        };
    }

    componentDidMount(){
        let userId=localStorage.getItem('userId');
        getDayIncomeFromServer(userId,(data)=>{
           this.setState({data:data});
        });
        getBalanceFromServer(userId,(data)=>{
            this.setState({assets:data});
        });

    }


    render(){
        const {classes} = this.props;
        return (
            <div>
                <main>
                    {/* Main featured post */}
                    <Paper className={classes.mainFeaturedPost}>
                        <Grid container>
                            <Grid item md={6}>
                                <div className={classes.mainFeaturedPostContent}>
                                    <Typography variant="display2" color="inherit" gutterBottom>
                                        Title of a longer featured blog post
                                    </Typography>
                                    <Typography variant="headline" color="inherit" paragraph>
                                        3 Financial Assets That Can Make You A Fortune
                                    </Typography>
                                    <Typography variant="title" color="inherit">
                                        Continue reading...
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                    {/* End main featured post */}
                    {/* Sub featured posts */}
                    <Grid container spacing={40} className={classes.cardGrid}>
                        <Grid item key='YesterdayIncome' xs={12} md={6}>
                            <Card className={classes.card}>
                                <div className={classes.cardDetails}>
                                    <CardContent>
                                        <Typography variant="headline">Yesterday Income</Typography>
                                        <Typography variant="subheading" color="textSecondary">
                                            ¥ {this.state.income}
                                        </Typography>
                                        <Typography variant="subheading" paragraph>
                                        </Typography>
                                        <Typography variant="subheading" color="primary">
                                            Go see my stats.
                                        </Typography>
                                    </CardContent>
                                </div>
                                <Hidden xsDown>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                                        title="Image title"
                                    />
                                </Hidden>
                            </Card>
                        </Grid>

                        <Grid item key='TotalBalance' xs={12} md={6}>
                            <Card className={classes.card}>
                                <div className={classes.cardDetails}>
                                    <CardContent>
                                        <Typography variant="headline">Total Balance (RMB)</Typography>
                                        <Typography variant="subheading" color="textSecondary">
                                            ¥ {this.state.balance}
                                        </Typography>
                                        <Typography variant="subheading" paragraph>
                                        </Typography>
                                        <Typography variant="subheading" color="primary">
                                            Go top up.
                                        </Typography>
                                    </CardContent>
                                </div>
                                <Hidden xsDown>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                                        title="Image title"
                                    />
                                </Hidden>
                            </Card>
                        </Grid>

                        <Grid item key='YourPersonalCredit' xs={12} md={6}>
                            <Card className={classes.card}>
                                <div className={classes.cardDetails}>
                                    <CardContent>
                                        <Typography variant="headline">Your Personal Credit</Typography>
                                        <Typography variant="subheading" color="textSecondary">
                                            ¥ {this.state.balance}
                                        </Typography>
                                        <Typography variant="subheading" paragraph>
                                        </Typography>
                                        <Typography variant="subheading" color="primary">
                                            Go see my stats.
                                        </Typography>
                                    </CardContent>
                                </div>
                                <Hidden xsDown>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                                        title="Image title"
                                    />
                                </Hidden>
                            </Card>
                        </Grid>

                        <Grid item key='UpcomingIncome' xs={12} md={6}>
                            <Card className={classes.card}>
                                <div className={classes.cardDetails}>
                                    <CardContent>
                                        <Typography variant="headline">Upcoming Income</Typography>
                                        <Typography variant="subheading" color="textSecondary">
                                            ¥ {this.state.balance}
                                        </Typography>
                                        <Typography variant="subheading" paragraph>
                                        </Typography>
                                        <Typography variant="subheading" color="primary">
                                            Go see my stats.
                                        </Typography>
                                    </CardContent>
                                </div>
                                <Hidden xsDown>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                                        title="Image title"
                                    />
                                </Hidden>
                            </Card>
                        </Grid>
                    </Grid>
                    {/* End sub featured posts */}
                    <Grid container spacing={40} className={classes.mainGrid}>
                        {/* Main content */}
                        <Grid item xs={12} md={8}>
                            <Typography variant="title" gutterBottom>
                               Upcoming Repayments
                            </Typography>
                            <Divider />
                            <DebtManagement />
                            {posts.map(post => (
                                <Markdown className={classes.markdown} key={post.substring(0, 40)}>
                                    {post}
                                </Markdown>
                            ))}
                        </Grid>
                        {/* End main content */}
                        {/* Sidebar */}
                        <Grid item xs={12} md={4}>
                            <Paper elevation={0} className={classes.sidebarAboutBox}>
                                <Typography variant="title" gutterBottom>
                                    Checkout most popular FPs
                                </Typography>
                                <Typography>
                                    Most frequentry seen financial products.
                                </Typography>
                            </Paper>
                            <AutoGridNoWrap />
                            <Paper elevation={0} className={classes.sidebarAboutBox}>
                                <Typography variant="title" gutterBottom>
                                    Current Transactions
                                </Typography>
                                <Typography>
                                    Most frequent transactions.
                                </Typography>
                            </Paper>
                            <Statistics/>
                            <Typography variant="title" gutterBottom className={classes.sidebarSection}>
                                Archives
                            </Typography>
                            {archives.map(archive => (
                                <Typography key={archive}>{archive}</Typography>
                            ))}
                            <Typography variant="title" gutterBottom className={classes.sidebarSection}>
                                Social
                            </Typography>
                            {social.map(network => (
                                <Typography key={network}>{network}</Typography>
                            ))}
                        </Grid>
                        {/* End sidebar */}
                    </Grid>
                </main>

                {/* Footer */}
                <footer className={classes.footer}>
                    <Typography variant="title" align="center" gutterBottom>
                        Footer
                    </Typography>
                    <Typography variant="subheading" align="center" color="textSecondary" component="p">
                        Something here to give the footer a purpose!
                    </Typography>
                </footer>
                {/* End footer */}
            </div>

        );
    }
}

Main.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);

/*
{featuredPosts.map(post => (
    <Grid item key={post.title} xs={12} md={6}>
        <Card className={classes.card}>
            <div className={classes.cardDetails}>
                <CardContent>
                    <Typography variant="headline">{post.title}</Typography>
                    <Typography variant="subheading" color="textSecondary">
                        {post.date}
                    </Typography>
                    <Typography variant="subheading" paragraph>
                        {post.description}
                    </Typography>
                    <Typography variant="subheading" color="primary">
                        Continue reading...
                    </Typography>
                </CardContent>
            </div>
            <Hidden xsDown>
                <CardMedia
                    className={classes.cardMedia}
                    image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                    title="Image title"
                />
            </Hidden>
        </Card>
    </Grid>
))}
*/