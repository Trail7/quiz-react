import React, {Component} from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";


export default class Quiz extends Component {
    state = {
        isFinished: true,
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                question: "What is the fastest car ever?",
                id: 1,
                rightAnswerId: 2,
                answers: [
                    {text: 'Mazda', id: 1},
                    {text: 'BMW', id: 2},
                    {text: 'Audi', id: 3},
                    {text: 'Zaz', id: 4},
                ]
            },
            {
                question: "What is your income",
                id: 2,
                rightAnswerId: 4,
                answers: [
                    {text: '500', id: 1},
                    {text: '750', id: 2},
                    {text: '1500', id: 3},
                    {text: '800', id: 4},
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        console.log(answerId)
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]

        if (question.rightAnswerId === answerId) {

            this.setState({
                answerState: {[answerId]: 'success'}
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
            this.setState({
                answerState: {[answerId]: 'error'}
            })
        }


    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
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