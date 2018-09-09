/*
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link,
} from "react-router-dom";
import App from './App';
import './App.css';
import axios from "axios";



import DebtListView from "./DebtListView";
import Myinfo from "./Myinfo";
import DebtManagement from "./DebtManagement";
import DebtApplication from "./DebtApplication";
import QuestionDetail from "./QuestionDetail";
import BankcardManagement from "./BankcardManagement";
import Fplist from "./Statistics";
import FpDetail from "./FpDetail";
import DebtRepayment from "./DebtRepayment";
import RepaymentStatus from "./RepaymentStatus";
import DebtApplicationStatus from "./DebtApplicationStatus";
import PasswordChangeStatus from "./PasswordChangeStatus";
import PasswordManagement from "./PasswordManagement";
import BankcardRemoveStatus from "./BankcardRemoveStatus";
import BankcardAdd from "./bankcard/BankcardAdd";
import BankcardAddStatus from "./BankcardAddStatus";
import LoginPage from "./LoginPage";
import  MyinfoChangeStatus from "./MyinfoChangeStatus";
import Qalist from "./Qalist";
import Blog from "./Blog";
import Main from "./Main";
import Album from "./Album";
import Statistics from "./Statistics";
import RateGraph from "./RateGraph";
import Checkout from "./signup/Checkout";
import Signin from "./signin/Signin";
import DebtAdd from './debtAdd/DebtAdd';
import Button from '@material-ui/core/Button';

const hello = (props) => (
    <div>
        <h3>One</h3>
    </div>

);

class One extends Component{

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount(){
    }

    render(){
        return (
            <div>
                <div>
                    <h3>One</h3>
                </div>
                <ul>
                    <li>
                        <Link to="/">main page</Link>
                    </li>
                </ul>
            </div>

        );
    }
}

class Two extends Component{

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount(){
        console.log(this.props.location.state);
        console.log(this.props.location.state.referrer);
        console.log((this.props.location.state && this.props.location.state.ID));



    }

    render(){
        return (
            <div>
                <div>
                    <h3>Two {localStorage.getItem("myCat")}</h3>
                </div>
                <ul>
                    <li>
                        <Link to="/">main page</Link>
                    </li>
                </ul>
                <DebtListView/>
            </div>

        );
    }
}

class Three extends Component{

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount(){
        console.log(this.props.location.state);
        console.log(this.props.location.state.referrer.user);
        console.log((this.props.location.state && this.props.location.state.referrer.user.email));

        localStorage.removeItem("myCat");
    }

    render(){
        return (
            <div>
                <div>
                    <h3>Three</h3>
                </div>
                <ul>
                    <li>
                        <Link to="/">main page</Link>
                    </li>
                </ul>
            </div>

        );
    }
}

class MyDebt extends Component{

    render() {
        return (
            <div>
                <Button variant="contained" color="primary"
                        component={Link}
                        to={{
                            pathname: "/debtapplication",
                            state: {  referrer:{user:{userId:12345,  email:"aikawa@qq.com"} } }
                        }}
                        onClick={()=>this.handlePost()}>
                    Apply For New Loan
                </Button>
                <br/>
                <br/>
                <DebtManagement/>
            </div>
        )
    }
}


class MyFp extends Component{

    render() {
        return (
            <div>
                <Album/>
            </div>
        )
    }
}


class Counsel extends Component{

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount(){
    }

    render(){
        return (
            <div>
                <Qalist />
            </div>

        );
    }
}


class Account extends Component{

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount(){
    }

    render(){
        return (
            <div>
                <div>
                    <h3>My Account</h3>
                </div>
                <ul>
                    <li>
                        <Link to={{
                            pathname: "/myinfo",
                            state: {  referrer:{user:{userId:12345,  email:"aikawa@qq.com"} } }
                        }}>myInfo management</Link>
                    </li>
                    <li>
                        <Link to={{
                            pathname: "/passwordManagement",
                            state: {  referrer:{user:{userId:12345,  email:"aikawa@qq.com"} } }
                        }}>change password</Link>
                    </li>
                    <li>
                        <Link to={{
                            pathname: "/bankcardmanagement",
                            state: {  referrer:{user:{userId:12345,  email:"aikawa@qq.com"} } }
                        }}>bankcard management</Link>
                    </li>
                    <li>
                        <Link to={{
                            pathname: "/topup",
                            state: {  referrer:{user:{userId:12345,  email:"aikawa@qq.com"} } }
                        }}>Top up Balance</Link>
                    </li>
                </ul>

            </div>

        );
    }
}

ReactDOM.render(
    <Router>
        <div>
            <Route path='/' component={Blog} />
            <Route exact path="/" render={(props) => <Main {...props}/>}/>
            <Route path="/one" render={(props) => <One {...props}/>}/>
            <Route path="/two" render={(props) => <Two {...props}/>}/>
            <Route path="/three" render={(props) => <Three {...props}/>}/>

            <Route exact path="/mydebt" render={(props) => <MyDebt {...props}/>}/>
            <Route exact path="/debtapplication" render={(props) => <DebtAdd DebtApplicationStatus{...props}/>}/>
            <Route exact path="/debtapplication/status" render={(props) => <DebtApplicationStatus{...props}/>}/>
            <Route exact path="/debtmanagement" render={(props) => <DebtManagement {...props}/>}/>
            <Route exact path="/debtmanagement/repayment" render={(props) => <DebtRepayment {...props}/>}/>
            <Route exact path="/debtmanagement/repayment/status" render={(props) => <RepaymentStatus {...props}/>}/>

            <Route exact path="/myfp" render={(props) => <MyFp {...props}/>}/>
            <Route exact path="/fplist" render={(props) => <Album {...props}/>}/>
            <Route path="/fplist/:id" render={(props) => <FpDetail {...props}/>}/>
            <Route exact path="/fpmanagement" render={(props) => <Fplist {...props}/>}/>


            <Route exact path="/counsel" render={(props) => <Counsel {...props}/>}/>
            <Route exact path="/qalist" render={(props) => <Qalist {...props}/>}/>
            <Route path="/qalist/:id" render={(props) => <QuestionDetail {...props}/>}/>

            <Route exact path="/statistics" render={(props) => <Statistics {...props}/>}/>

            <Route exact path="/account" render={(props) => <Account {...props}/>}/>
            <Route exact path="/myasset" render={(props) => <Account {...props}/>}/>
            <Route exact path="/myinfo" render={(props) => <Myinfo {...props}/>}/>
            <Route exact path="/topup" render={(props) => <RateGraph {...props}/>}/>
            <Route exact path="/myinfo/status" render={(props) => <MyinfoChangeStatus {...props}/>}/>
            <Route exact path="/passwordmanagement" render={(props) => <PasswordManagement {...props}/>}/>
            <Route exact path="/passwordmanagement/status" render={(props) => <PasswordChangeStatus {...props}/>}/>
            <Route exact path="/bankcardmanagement" render={(props) => <BankcardManagement {...props}/>}/>
            <Route exact path="/bankcardmanagement/add" render={(props) => <BankcardAdd {...props}/>}/>
            <Route exact path="/bankcardmanagement/add/status" render={(props) => <BankcardAddStatus {...props}/>}/>
            <Route exact path="/bankcardmanagement/remove" render={(props) => <BankcardRemoveStatus {...props}/>}/>

            <Route exact path="/login/form" render={(props) => <LoginPage {...props}/>}/>

            <Route exact path="/signup" render={(props) => <Checkout {...props}/>}/>
            <Route exact path="/signin" render={(props) => <Signin {...props}/>}/>


            <Route exact path="/hey" render={(props) => <Checkout {...props}/>}/>
            <Route exact path="/gra" render={(props) => <RateGraph {...props}/>}/>





        </div>
    </Router>,
    document.getElementById('root')
);

/*
Route exact path="/" にするとAppBarがlink移動すると消えてしまう。

*/