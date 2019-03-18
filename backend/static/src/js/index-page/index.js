import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/form.css';
import '../../css/general.css';
import $ from 'jquery';

class Questions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questions : []
        }

        $.get('/get-questions/', (data) => {
            this.setState({questions : data});
            console.log(this.state.questions[0].pk);
        });
    }

    render(){
        return (
            <div className="relativeView questionAndAnswer">
                {
                    this.state.questions.map((question, i) => (
                        <a href={"/detail/?id=" + question.pk} key={i}>
                            <li className="card questionCard link">
                                <h3>{question.fields.title}</h3>
                                <p className="smallFont">Ask by {question.fields.user} at {question.fields.created}</p>
                                <p>{question.fields.content}</p>
                            </li>
                        </a>
                    ))
                }
            </div>
        );
    }
}

ReactDOM.render(
    <Questions/>, 
    document.getElementById('root')
);