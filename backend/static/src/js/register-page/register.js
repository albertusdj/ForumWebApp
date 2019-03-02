import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/form.css';
import {FormError} from '../utility/form-error.js';
import CSRFToken from '../utility/csrf-token.js';

class RegisterForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            username : '',
            password : '',
            email : '',
            formError : {username : '', password : '', email : ''},
            usernameValid : false,
            passwordValid : false,
            emailValid : false,
            formValid : false
        }
    }

    validateForm() {
        this.setState({formValid : this.state.usernameValid && this.state.passwordValid && this.state.emailValid});
        console.log("usernamevalid=" + this.state.usernameValid);
        console.log("passwordvalid=" + this.state.passwordValid);
        console.log("emailvalid="+this.state.emailValid);
        console.log("formvalid=" + this.state.formValid);
    }

    validateField(name, value) {
        let fieldValidationError = this.state.formError;
        let usernameValid = this.state.usernameValid;
        let passwordValid = this.state.passwordValid;
        let emailValid = this.state.emailValid;

        switch(name) {
            case 'username':
                usernameValid = value.match(/\w{4,20}/i);
                fieldValidationError.username = usernameValid ? '' : ' must contain 4-10 alphanumeric letters or underscore';
                break;
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationError.email = emailValid ? '' : ' not valid';
                break;
            case 'password':
                passwordValid = value.length >= 6 && value.length <= 15;
                fieldValidationError.password = passwordValid ? '' : ' must have length between 6 and 15';
                break;
            default:
                break;
        }

        this.setState({
            formError : fieldValidationError,
            usernameValid : usernameValid,
            passwordValid : passwordValid,
            emailValid : emailValid
        }, this.validateForm());
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
                    <h2>Register</h2>
                </div>

                <div className="card">
                    <FormError formError={this.state.formError} />
                </div>

                <form className="RegisterForm" action="/register/" method="POST">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" 
                        value={this.state.username} onChange={(event) => this.handleUserInput(event)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" name="email" 
                        value={this.state.email} onChange={(event) => this.handleUserInput(event)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" 
                        value={this.state.password} onChange={(event) => this.handleUserInput(event)}/>
                    </div>
                    <CSRFToken />
                    <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>
                        Sign up
                    </button>
                </form>
                <a href='/login/'>Already have account ? Log in here</a>
            </div>
        );
    }
}

ReactDOM.render(
    <RegisterForm />,
    document.getElementById('root')
  );