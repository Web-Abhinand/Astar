import React from "react";
import D3Container from "../components/d3Container";
import ControlPanel from "../pages/contolPanel";
import { generateDirectedNodesAndLinks, generateUndirectedNodesAndLinks } from "../experiments/astarSearch";

export default function Playground() {

    const [manual,setManual] = React.useState(false);
    const [graphChoice, setGraphChoice] = React.useState(false);
    const [nodesAndLinks, setNodesAndLinks] = React.useState(generateDirectedNodesAndLinks(10, 10,manual));

    const changeGraph = (noOfNodes, noOfLinks) => {
        console.log("changeGraph");
        console.log(noOfNodes, noOfLinks);
        setNodesAndLinks(graphChoice ? generateUndirectedNodesAndLinks(noOfNodes, noOfLinks,manual) : generateDirectedNodesAndLinks(noOfNodes, noOfLinks,manual));
    }

    const changeGraphType = (e) => {
        setNodesAndLinks(e ? generateUndirectedNodesAndLinks(10, 10,manual) : generateDirectedNodesAndLinks(10, 10,manual));
        setGraphChoice(e);
    }

    return (
        <>
            <ControlPanel manual={manual} setManual={setManual} nodesAndLinks={nodesAndLinks} changeGraphType={changeGraphType} changeGraph={changeGraph} setNodesAndLinks={setNodesAndLinks}></ControlPanel>
            <div className="sm:w-2/3  h-screen">
                <D3Container manual={manual} setManual={setManual} graphType={graphChoice} nodesAndLinks={nodesAndLinks} />
            </div>
        </>
    );
}