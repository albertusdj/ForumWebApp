import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/form.css';
import '../../css/general.css';
import {FormError} from '../utility/form-error.js';
import CSRFToken from '../utility/csrf-token.js';

class AnswerForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: '',
            contentValid: false,
            formError: {
                content: ''
            },
            id: props.id
        }
        console.log(this.state.id);
    }
 
    validateField(name, value) {
        let fieldValidationError = this.state.formError;
        let contentValid = this.state.contentValid;

        if(name=='content'){
            contentValid = value.length > 0 && value.length < 1024;
            fieldValidationError.content = contentValid ? '' : ' can not be empty and not exceed 1024';
        }

        this.setState({
            formError : fieldValidationError,
            contentValid : contentValid
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
            <div className="App center questionAndAnswer relativeView">
                    <div className="App-header">
                        <h2>Answer</h2>
                    </div>

                    <div className="card">
                        <FormError formError={this.state.formError} />
                    </div>

                    <form className="AnswerForm" action="/answer/" method="POST">
                        <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <input type="text" className="form-control" name="content" 
                            value={this.state.content} onChange={(event) => this.handleUserInput(event)}/>
                        </div>
                        <div className="form-group">
                            <input type="hidden" className="form-control" name="id"
                            value={this.state.id}/>
                        </div>
                        <CSRFToken />
                        <button type="submit" className="btn btn-primary" disabled={!this.state.contentValid}>
                            Submit
                        </button>
                    </form>
            </div>
        );
    }
}

ReactDOM.render(
    React.createElement(AnswerForm, window.props),
    document.getElementById('root')
)