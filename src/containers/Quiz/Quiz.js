import React, {Component} from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";


export default class Quiz extends Component {
    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                question: "2+2=?",
                id: 1,
                rightAnswerId: 3,
                answers: [
                    {text: '5', id: 1},
                    {text: '3', id: 2},
                    {text: '4', id: 3},
                    {text: '8', id: 4},
                ]
            },
            {
                question: "5*5=?",
                id: 2,
                rightAnswerId: 2,
                answers: [
                    {text: '35', id: 1},
                    {text: '25', id: 2},
                    {text: '43', id: 3},
                    {text: '55', id: 4},
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        // console.log(answerId)
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            this.setState({
                answerState: {[answerId]: 'success'},
                results //results: results
            })
            const timeout = window.setTimeout(() => {

                if (this.isQuizFinished()) {
                    console.log('finished')
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 300)


        } else {
            results[question.id] = 'error'
            this.setState({
                activeQuestion: this.state.activeQuestion + 1,
                answerState: {[answerId]: 'error'},
                results  //results: results
            })
        }


    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    onRetryHandler = () => {
        this.setState({
            results: {},
            isFinished: false,
            activeQuestion: 0,
            answerState: null
        })
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>
                        Answer all the questions
                    </h1>
                    {
                        this.state.isFinished
                            ? <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRetry={this.onRetryHandler}
                            />
                            : <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            />
                    }

                </div>
            </div>
        )
    }
}