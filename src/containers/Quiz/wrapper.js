import React from "react";
import {useParams} from "react-router-dom";
import Quiz from "./Quiz";

const Wrapper = props => {
    const parameters = useParams()

    return <Quiz parameters={parameters} {...props}/>
}

export default Wrapper