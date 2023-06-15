import React from "react";
import D3Container from "../components/d3Container";
import ControlPanel from "../pages/contolPanel";
import { useState, useEffect } from "react";
import { generateDirectedNodesAndLinks, generateUndirectedNodesAndLinks } from "../experiments/astarSearch";

export default function Playground() {

    const [manual,setManual] = React.useState(false);
    const [graphChoice, setGraphChoice] = React.useState(false);
    const [nodesAndLinks, setNodesAndLinks] = React.useState(generateUndirectedNodesAndLinks(10, 10,manual));

    const changeGraph = (noOfNodes, noOfLinks) => {
        console.log("changeGraph");
        console.log(noOfNodes, noOfLinks);
        setNodesAndLinks(graphChoice ? generateUndirectedNodesAndLinks(noOfNodes, noOfLinks,manual) : generateUndirectedNodesAndLinks(noOfNodes, noOfLinks,manual));
    }

    const changeGraphType = (e) => {
        setNodesAndLinks(e ?generateUndirectedNodesAndLinks(10, 10,manual) : generateUndirectedNodesAndLinks(10, 10,manual));
        setGraphChoice(e);
    }
    const [noOfNodesAndLinks, setNoOfNodesAndLinks] = useState({ noOfNodes: 0, noOfLinks: 0 });

    useEffect(() => {
        window.addEventListener("customEventName", (e) => {
            console.log(e.detail.newValue, 'new value')
            console.log(e.detail.oldValue, 'old value')

            nodesAndLinks.nodes.map(node => {
                if (node.id === e.detail.oldValue) {
                    node.id = e.detail.newValue;
                }
            }
            );
            console.log(nodesAndLinks.nodes, 'nodes and links in playground');
        }
        );

        return () => {
            window.removeEventListener("customEventName", console.log('event removed'));
        };
    }, [nodesAndLinks]);

    return (
        <>
            <ControlPanel manual={manual} setManual={setManual} nodesAndLinks={nodesAndLinks} changeGraphType={changeGraphType} changeGraph={changeGraph} setNodesAndLinks={setNodesAndLinks} noOfNodesAndLinks={noOfNodesAndLinks} setNoOfNodesAndLinks={setNoOfNodesAndLinks}></ControlPanel>
            <div className="sm:w-2/3  h-screen">
                <D3Container manual={manual} setManual={setManual} graphType={graphChoice} nodesAndLinks={nodesAndLinks} noOfNodesAndLinks={noOfNodesAndLinks} setNoOfNodesAndLinks={setNoOfNodesAndLinks}/>
            </div>
        </>
    );
}