import React, { useEffect, useRef, useState } from "react";
import { runForceGraph } from "../experiments/graphGenerator";
import { generateDirectedNodesAndLinks, generateUndirectedNodesAndLinks } from "../experiments/astarSearch";



const ForceGraph = ({ nodesAndLinks, graphType,manual,setManual,noOfNodesAndLinks,setNoOfNodesAndLinks}) => {
    const containerRef = useRef(null);
    let changePointer;

    console.log(nodesAndLinks,"nodesAndLinks");
    const [nodes, setNodes] = useState([]);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        if (containerRef.current) {
            changePointer = runForceGraph(
                containerRef.current,
                nodesAndLinks.links,
                nodesAndLinks.nodes,
                {
                    color: "#808080",
                    radius: 20,
                    graphType: graphType ? "directed" : "undirected",
                }
            );
        }
    }, [nodesAndLinks]);

   
    console.log(nodesAndLinks,"nodesAndLinks");
    return (
        <>
            <div style={{padding:'0.5rem'}}><h1 style={{textAlign:'center',fontSize:'2rem'}}></h1>
                
            </div>
            <div ref={containerRef} className="h-full" />
        </>
        );
};

export default ForceGraph;
