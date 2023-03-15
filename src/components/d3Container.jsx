import React, { useEffect, useRef, useState } from "react";
import { runForceGraph } from "../experiments/graphGenerator";
import { generateUndirectedNodesAndLinks } from "../experiments/astarSearch";


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
                    radius: 30,
                    graphType: graphType ? "undirected" : "directed",
                }
            );
        }
    }, [nodesAndLinks]);
    var nodelinks = generateUndirectedNodesAndLinks(noOfNodesAndLinks.noOfNodes, noOfNodesAndLinks.noOfLinks);
    console.log(nodelinks, "nodelinks");
    

    return (
        <>
            <div style={{padding:'0.5rem'}}><h1 style={{textAlign:'center',fontSize:'2rem'}}></h1>
                {nodelinks.nodes.map((node, index) => {return(
                    <div key={index} style={{display:'flex',justifyContent:'space-between',alignItems:'center',margin:'0.5rem'}}>
                        {/* {node.hOfN} */}
                    </div>
                )})}
            </div>
            <div ref={containerRef} className="h-full" />
        </>
        );
};

export default ForceGraph;
