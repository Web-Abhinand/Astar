import React from "react";
import ControllerPanel from "../components/controllerPanel";
import FeedbackComponent from "../components/feedback";
// import QuizPanel from "../components/quizPanel";
// import SolutionPanel from "../components/solutionPanel";
export default function ControlPanel({ changeGraph, nodesAndLinks, changeGraphType,manual,setManual,setNodesAndLinks, noOfNodesAndLinks, setNoOfNodesAndLinks}) {

    // props.controllers()

    return (
        <div className="w-1/3 hidden-scroll hidden sm:block">
            <ControllerPanel manual={manual} setManual={setManual} changeGraphType={changeGraphType} changeGraph={changeGraph} nodesAndLinks={nodesAndLinks} setNodesAndLinks={setNodesAndLinks} noOfNodesAndLinks={noOfNodesAndLinks} setNoOfNodesAndLinks={setNoOfNodesAndLinks}></ControllerPanel>
            <FeedbackComponent></FeedbackComponent>
            {/* <QuizPanel></QuizPanel>
            <SolutionPanel></SolutionPanel> */}
        </div>
    );
}