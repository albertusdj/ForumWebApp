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
        console.log(this.state.answers);
    }

    render() {
        return (
            <div className="relativeView questionAndAnswer">
                
                <div className="card questionCard">
                    <h3>{this.state.question[0].fields.title}</h3>
                    <p className="smallFont">Ask by {this.state.question[0].fields.user} at {this.state.question[0].fields.created}</p>
                    <p>{this.state.question[0].fields.content}</p>
                    <a href={"/answer/?question="+this.state.question[0].pk} className="btn btn-primary answerButton">Answer</a>
                </div>
                

                <div >
                {
                    this.state.answers.map((answer, i) => (
                        <li className="card questionCard" key={i}>
                            <p className="smallFont">Answer by {answer.fields.user} at {answer.fields.created}</p>
                            <p>{answer.fields.content}</p>
                        </li>
                    ))
                }
                </div>
            </div>
        )
    }  
}

ReactDOM.render(
    React.createElement(Detail, window.props), 
    document.getElementById('root')
);