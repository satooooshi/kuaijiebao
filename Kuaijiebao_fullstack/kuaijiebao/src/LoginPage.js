import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Form from './Form'

const inputs = [{
    name: "username",
    placeholder: "username",
    type: "text"
},{
    name: "password",
    placeholder: "password",
    type: "password"
},{
    type: "submit",
    value: "Submit",
    className: "btn"
}];

const props = {name: 'loginForm', method: 'POST', action: '/login', inputs: inputs}

const params = new URLSearchParams(window.location.search)


class LoginPage extends Component{

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
                <Form {...props} error={params.get('error')} />
            </div>

        );
    }
}

export default LoginPage