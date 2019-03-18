import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/general.css';
import '../../css/form.css';

class Detail extends Component {
    constructor(props){
        super(props);
        this.state = {
            question: JSON.parse(props.question),
            answers: JSON.parse(props.answers)
        }

        console.log(typeof(this.state.question));
    }

    render() {
        return (
            <div className="relativeView questionAndAnswer">
                <div className="card questionCard">
                        <h3>{this.state.question[0].fields.title}</h3>
                        <p className="smallFont">Ask by {this.state.question[0].fields.user} at {this.state.question[0].fields.created}</p>
                        <p>{this.state.question[0].fields.content}</p>
                        <a href="http://google.com" className="btn btn-primary answerButton">Answer</a>
                </div>
            </div>
        )
    }  
}

ReactDOM.render(
    React.createElement(Detail, window.props), 
    document.getElementById('root')
);