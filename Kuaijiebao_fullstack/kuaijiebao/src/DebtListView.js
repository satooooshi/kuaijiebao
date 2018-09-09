import React, { Component, PropTypes } from 'react';
import axios from 'axios';


function getUsersFromServer(success) {
    return axios.get('http://localhost:8080//api/user')
        .then(function (response) {
            console.log(response);
            return response.data;
        })
        .then(success)
        .catch(function (error) {
            console.log(error);
        });
}

let users=[{email:"saoaka@qq.com",password:"password"},{email:"satoikaa@qq.com",password:"paword"},];

class DebtListView extends Component {


    constructor(props) {
        super(props);
        this.state = {
            users:[],
        };
    }


    componentDidMount() {
        getUsersFromServer((serverUsers) => (
            this.setState({ users: serverUsers })));

        this.setState({ users: users });


    }





    render() {


        let users = this.state.users.map(user =>
            <User user={user}/>
        );

        return (
            <div>
                <header className="header">
                    <h1>My Debts</h1>
                    <input
                        className="search"
                        type="text"
                        onKeyUp={e => this.handleClick(e)}
                        placeholder="input todo item"
                        ref='input' />
                </header>

                <table>
                    <tbody>
                    <tr>
                        <th>email</th>
                        <th>password</th>
                    </tr>
                    {users}
                    </tbody>
                </table>

            </div>
        )
    }

    handleClick(e) {
        if (e.keyCode === 13) {
            const text = e.target.value.trim();
            this.props.onAddClick(text);
        }
    }
}


class User extends Component{

    render() {
        return (
            <tr>
                <td>{this.props.user.email}</td>
                <td>{this.props.user.password}</td>
                <td>button</td>
            </tr>
        )
    }
}


export default DebtListView;