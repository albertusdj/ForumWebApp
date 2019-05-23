import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/form.css';
import {FormError} from '../utility/form-error.js';
import CSRFToken from '../utility/csrf-token.js';

class LoginForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            username : '',
            password : '',
            formError : {username : '', password : ''},
            usernameValid : false,
            passwordValid : false,
            formValid : false
        }
    }

    validateField(name, value) {
        let fieldValidationError = this.state.formError;
        let usernameValid = this.state.usernameValid;
        let passwordValid = this.state.passwordValid;

        switch(name) {
            case 'username':
                usernameValid = value.length >= 4 && value.length <= 20;
                fieldValidationError.username = usernameValid ? '' : ' must contain 4-10 alphanumeric letters or underscore';
                break;
            case 'password':
                passwordValid = value.length >= 6 && value.length <= 30;
                fieldValidationError.password = passwordValid ? '' : ' must have length between 6 and 15';
                break;
            default:
                break;
        }

        this.setState({
            formError : fieldValidationError,
            usernameValid : usernameValid,
            passwordValid : passwordValid,
            formValid : usernameValid && passwordValid
        });
    }

    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({[name]:value},
            ()=>{this.validateField(name, value)});
    }

    render() {
        return (
            <div className="App center">
                <div className="App-header">
                    <h2>Login</h2>
                </div>

                <div className="card">
                    <FormError formError={this.state.formError} />
                </div>

                <form className="LoginForm" action="/login/" method="POST">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" 
                        value={this.state.username} onChange={(event) => this.handleUserInput(event)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" 
                        value={this.state.password} onChange={(event) => this.handleUserInput(event)}/>
                    </div>
                    <CSRFToken />
                    <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>
                        Login
                    </button>
                </form>
                <a href='/register/'>New ? Sign up here</a>
            </div>
        );
    }
}

ReactDOM.render(
    <LoginForm />,
    document.getElementById('root')
  );