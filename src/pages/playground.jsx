import React from "react";
import D3Container from "../components/d3Container";
import ControlPanel from "../pages/contolPanel";
import { useState, useEffect } from "react";
import { generateUndirectedNodesAndLinks,generateUndirectedNodesAndLinksManual } from "../experiments/astarSearch";

export default function Playground() {

    const [manual,setManual] = React.useState(false);
    const [graphChoice, setGraphChoice] = React.useState(false);
    const [nodesAndLinks, setNodesAndLinks] = React.useState(generateUndirectedNodesAndLinks(10, 10,manual));

    const changeGraph = (noOfNodes, noOfLinks) => {
        console.log("changeGraph");
        setNodesAndLinks(graphChoice ? generateUndirectedNodesAndLinks(noOfNodes, noOfLinks,manual) : generateUndirectedNodesAndLinks(noOfNodes, noOfLinks,manual));
    }

    const changeManualGraph = (noOfNodes, noOfLinks) => {
        console.log("changeGraph");
        setNodesAndLinks(graphChoice ? generateUndirectedNodesAndLinksManual(noOfNodes, noOfLinks,manual) : generateUndirectedNodesAndLinksManual(noOfNodes, noOfLinks,manual));
      };


    const changeGraphType = (e) => {
        setNodesAndLinks(e ?generateUndirectedNodesAndLinks(10, 10,manual) : generateUndirectedNodesAndLinks(10, 10,manual));
        setGraphChoice(e);
    }
    const [noOfNodesAndLinks, setNoOfNodesAndLinks] = useState({ noOfNodes: 0, noOfLinks: 0 });

    useEffect(() => {
        const handleCustomEvent = (e) => {
          console.log(e.detail.newValue, 'new value');
          console.log(e.detail.oldValue, 'old value');
      
          const updatedNodesAndLinks = { ...nodesAndLinks };
      
          updatedNodesAndLinks.nodes = updatedNodesAndLinks.nodes.map(node => {
            if (node.id === e.detail.oldValue) {
              return { ...node, id: e.detail.newValue };
            }
            return node;
          });
      
          console.log(updatedNodesAndLinks, 'nodes and links in playground');
      
          setNodesAndLinks(updatedNodesAndLinks);
        };
      
        window.addEventListener("customEventName", handleCustomEvent);
      
        return () => {
          window.removeEventListener("customEventName", handleCustomEvent);
        };
      }, [nodesAndLinks]);
      

    return (
        <>
            <ControlPanel manual={manual} setManual={setManual} nodesAndLinks={nodesAndLinks} changeGraphType={changeGraphType} changeGraph={changeGraph} setNodesAndLinks={setNodesAndLinks} noOfNodesAndLinks={noOfNodesAndLinks} setNoOfNodesAndLinks={setNoOfNodesAndLinks} changeManualGraph={changeManualGraph}></ControlPanel>
            <div className="sm:w-2/3  h-screen">
                <D3Container manual={manual} setManual={setManual} graphType={graphChoice} nodesAndLinks={nodesAndLinks} noOfNodesAndLinks={noOfNodesAndLinks} setNoOfNodesAndLinks={setNoOfNodesAndLinks} changeManualGraph={changeManualGraph}/>
            </div>
        </>
    );
}