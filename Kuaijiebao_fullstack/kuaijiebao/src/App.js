import React, { Component } from 'react';
import './App.css';
import Typography from '@material-ui/core/Typography';

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

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
  render() {
      const {classes} = this.props;
    return (
        <div className="App">
        </div>
    );
  }
}

export default App;
/*
<ul>
                <li>
                    <Link to={{
                        pathname: "/one",
                        state: { referrer: 12345, email:"aikawa@qq.com" }
                    }}>One</Link>
                </li>
                <li>
                    <Link to={{
                        pathname: "/two",
                        state: { referrer:"satoaikawa@qq.com", ID:12345, book:{bookId:43,title:"Gone With the Wind", author:"J.K.Rolling"} }
                    }}>Two</Link>
                </li>
                <li>
                    <Link to={{
                        pathname: "/three/",
                        state: {  referrer:{user:{userId:12345,  email:"aikawa@qq.com"} } }
                    }}>three</Link>
                </li>

                <li>
                    <Link to={{
                        pathname: "/mydebt",
                        state: {  referrer:{user:{userId:12345,  email:"aikawa@qq.com"} } }
                    }}>My Debt</Link>
                </li>
                <li>
                    <Link to={{
                        pathname: "/myfp",
                        state: {  referrer:{user:{userId:12345,  email:"aikawa@qq.com"} } }
                    }}>My Finance</Link>
                </li>
                <li>
                    <Link to={{
                        pathname: "/counsel",
                        state: {  referrer:{user:{userId:12345,  email:"aikawa@qq.com"} } }
                    }}>Counsel</Link>
                </li>
                <li>
                    <Link to={{
                        pathname: "/account",
                        state: {  referrer:{user:{userId:12345,  email:"aikawa@qq.com"} } }
                    }}>Account</Link>
                </li>
            </ul>
            <Button color="primary">
                Primary
            </Button>
 */