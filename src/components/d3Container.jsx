import React, { useEffect, useRef } from "react";
import { runForceGraph } from "../experiments/graphGenerator";

const ForceGraph = ({ nodesAndLinks, graphType,manual,setManual }) => {
    const containerRef = useRef(null);
    let changePointer;

    console.log(nodesAndLinks,"nodesAndLinks");

    useEffect(() => {
        if (containerRef.current) {
            changePointer = runForceGraph(
                containerRef.current,
                nodesAndLinks.links,
                nodesAndLinks.nodes,
                {
                    color: "#808080",
                    radius: 26,
                    graphType: graphType ? "undirected" : "directed",
                }
            );
        }

    }, [nodesAndLinks]);

    return (
        <>
            {/* <div style={{padding:'0.5rem'}}><h1 style={{textAlign:'center',fontSize:'2rem'}}>Random Search</h1></div> */}
            <div ref={containerRef} className="h-full" />
        </>
        );
};

export default ForceGraph;
