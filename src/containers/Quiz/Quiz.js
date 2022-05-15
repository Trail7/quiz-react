import React, {Component} from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../ActiveQuiz/ActiveQuiz";


export default class Quiz extends Component {
    state = {
        quiz: [
            {
                question: "What is the fastest car ever?",
                rightAnswerId: 2,
                answers: [
                    {text: 'Mazda', id: 1},
                    {text: 'BMW', id: 2},
                    {text: 'Audi', id: 3},
                    {text: 'Zaz', id: 4},
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        console.log(answerId)
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>
                        Answer all the questions
                    </h1>
                    <ActiveQuiz
                        answers={this.state.quiz[0].answers}
                        question={this.state.quiz[0].question}
                        onAnswerClick = {this.onAnswerClickHandler}
                    />
                </div>
            </div>
        )
    }
}