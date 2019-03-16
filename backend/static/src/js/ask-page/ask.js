import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/form.css';
import '../../css/general.css';
import {FormError} from '../utility/form-error.js';
import CSRFToken from '../utility/csrf-token.js';

class AskForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title : '',
            content : '',
            formError : {title : '', content : ''},
            titleValid : false,
            contentValid : false,
            formValid : false
        }
    }

    validateForm() {
        this.setState({formValid : this.state.titleValid && this.state.contentValid});
    }

    validateField(name, value) {
        let fieldValidationError = this.state.formError;
        let titleValid = this.state.titleValid;
        let contentValid = this.state.contentValid;

        switch(name) {
            case 'title':
                titleValid = value.length >= 1 && value.length <= 50;
                fieldValidationError.title = titleValid ? '' : ' can not be empty and must be less then 50';
                break;
            case 'content':
                contentValid = value.length >= 1 && value.length <= 256;
                fieldValidationError.content = contentValid ? '' : ' can not be empty and must be less then 256';
                break;
            default:
                break;
        }

        this.setState({
            formError : fieldValidationError,
            titleValid : titleValid,
            contentValid : contentValid
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
            <div className="App center questionAndAnswer relativeView">
                    <div className="App-header">
                        <h2>Ask</h2>
                    </div>

                    <div className="card">
                        <FormError formError={this.state.formError} />
                    </div>

                    <form className="AskForm" action="/ask/" method="POST">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" name="title" 
                            value={this.state.title} onChange={(event) => this.handleUserInput(event)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <input type="text" className="form-control" name="content" 
                            value={this.state.content} onChange={(event) => this.handleUserInput(event)}/>
                        </div>
                        <CSRFToken />
                        <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>
                            Submit
                        </button>
                    </form>
            </div>
        );
    }
}

ReactDOM.render(
    <AskForm />,
    document.getElementById('root')
  );