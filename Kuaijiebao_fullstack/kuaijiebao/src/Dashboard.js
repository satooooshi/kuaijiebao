import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {
    Link,
} from "react-router-dom";

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class SimpleTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange}>
                        <Tab label="Workspace" component={Link} to={{
                            pathname: "/workspace",
                            state: {  referrer:{user:{userId:12345,  email:"aikawa@qq.com"} } }
                        }}/>
                        <Tab label="My Debt" component={Link} to={{
                            pathname: "/mydebt",
                            state: {  referrer:{user:{userId:12345,  email:"aikawa@qq.com"} } }
                        }}/>
                        <Tab label="My Finance" component={Link} to={{
                            pathname: "/myfp",
                            state: {  referrer:{user:{userId:12345,  email:"aikawa@qq.com"} } }
                        }}/>
                        <Tab label="Counsel" component={Link} to={{
                            pathname: "/counsel",
                            state: {  referrer:{user:{userId:12345,  email:"aikawa@qq.com"} } }
                        }}/>
                        <Tab label="My Account" component={Link} to={{
                            pathname: "/account",
                            state: {  referrer:{user:{userId:12345,  email:"aikawa@qq.com"} } }
                        }} />
                    </Tabs>
                </AppBar>
            </div>
        );
    }
}

SimpleTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);