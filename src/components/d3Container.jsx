import React, { useEffect, useRef, useState } from "react";
import { runForceGraph } from "../experiments/graphGenerator";

const ForceGraph = ({ nodesAndLinks, graphType, manual, setManual, noOfNodesAndLinks, setNoOfNodesAndLinks }) => {
    const containerRef = useRef(null);
    let changePointer;


    useEffect(() => {
        if (containerRef.current) {
            changePointer = runForceGraph(
                containerRef.current,
                nodesAndLinks.links,
                nodesAndLinks.nodes,
                noOfNodesAndLinks,
                setNoOfNodesAndLinks,
                {
                    color: "#808080",
                    radius: 20,
                    graphType: graphType ? "directed" : "undirected",
                }
            );
        }
        console.log(nodesAndLinks, "nodesAndLinks");
    }, [nodesAndLinks]);

    console.log(nodesAndLinks, "nodesAndLinks");
    console.log(containerRef.current, "containerRef.current");
    return (
        <>
            <div style={{ padding: '0.5rem' }}><h1 style={{ textAlign: 'center', fontSize: '2rem' }}></h1>

            </div>
            <div ref={containerRef} className="h-full" />
        </>
    );
};

export default ForceGraph;
