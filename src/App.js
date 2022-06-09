import React, {Component} from "react"
import Layout from "./hoc/Layout/Layout"
import {Navigate, Route, Routes} from "react-router-dom";

// import Quiz from "./containers/Quiz/Quiz";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";
import Wrapper from "./containers/Quiz/wrapper";
import {connect} from "react-redux";
import Logout from "./components/Logout/Logout";
import authReducer from "./store/reducers/auth";
import {autoLogin} from "./store/actions/auth";



class App extends Component {

    componentDidMount() {
        this.props.autoLogin()
    }

    render() {
        let routes = (
            <Routes>
                <Route path='/auth' element={<Auth/>}/>
                <Route path='quiz/:id' element={<Wrapper/>}/>
                <Route path='/' exact element={<QuizList/>}/>
                <Route path='/' element={<Navigate to='/'/>}/>
            </Routes>
        )

        if (this.props.isAuthenticated){
            routes = (
                <Routes>
                    <Route path='/quiz-creator' element={<QuizCreator/>}/>
                    <Route path='quiz/:id' element={<Wrapper/>}/>
                    <Route path='/logout' element={<Logout/>} />
                    <Route path='/auth' element={<Navigate to='/'/>}/>
                    <Route path='/' exact element={<QuizList/>}/>
                    {/*<Route path='/' element={<Navigate to='/'/>}/>*/}
                </Routes>
            )
        }

        return (
            <Layout>
                {routes}
            </Layout>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        isAuthenticated:  !!state.authReducer.token
    }
}

function mapDispatchToProps(dispatch) {
    return{
        autoLogin: () => dispatch(autoLogin())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)