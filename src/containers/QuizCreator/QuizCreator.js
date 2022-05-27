import React, {Component} from "react";
import classes from './QuizCreator.module.css'
import Button from "../../components/UI/Button/Button";
import {createControl} from "../../form/formFramework";
import Input from "../../components/UI/Input/Input";
import Auxililary from "../../hoc/Auxililary/Auxililary";

function createOptionControl(number){
    return createControl({
        label: `Option ${number}`,
        errorMessage: "Value is not valid",
        id: number
    }, {required: true})
}

function createformControls(){
    return {
        question: createControl({
            label: 'Enter your question',
            errorMessage: "Question cannot be empty"
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}

export default class QuizCreator extends Component {

    state = {
        quiz: [],
        formControls: createformControls()
    }

    submitHandler = event => {
        event.preventDefault()
    }

    addQuestionHandler = () => {

    }

    createQuizHandler = () => {

    }

    changeHandler = (value, controlName) => {

}

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Auxililary key={controlName+index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />
                    { index === 0? <hr/> : null}
                </Auxililary>
            )
        })
    }

    render() {
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Create new test</h1>

                    <form onSubmit={this.submitHandler}>

                        {this.renderControls()}

                        <select name="" id=""></select>

                        <Button
                            type='primary'
                            onClick={this.addQuestionHandler}
                        >
                            Add question
                        </Button>

                        <Button
                            type='success'
                            onClick={this.createQuizHandler}
                        >
                            Create test
                        </Button>
                    </form>
                </div>


            </div>
        )
    }
}