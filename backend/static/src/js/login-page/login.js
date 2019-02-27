import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/form.css';

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

    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]:value});
    }

    render() {
        return (
            <div className="App">
                <div className="App-header center">
                    <h2>Login</h2>
                </div>

                <form className="LoginForm center">
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
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(
    <LoginForm />,
    document.getElementById('root')
  );