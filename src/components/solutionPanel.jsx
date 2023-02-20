import React from 'react';
import { Accordion } from "./mini/accordion";


export default function SolutionPanel() {

    const Information = [
        {
            heading: "Algorithm",
            content: "The algorithm is based on the concept of Breadth First Search. The algorithm is as follows: \n 1. Create a queue Q. \n 2. Mark the source node as visited and enqueue it into Q. \n 3. While Q is not empty, do the following: \n 3.1 Dequeue a node from Q and print it. \n 3.2 If the dequeued node is the destination node, stop. \n 3.3 Else, enqueue all the adjacent nodes of the dequeued node that are not visited. \n 3.4 Mark the adjacent nodes as visited and enqueue them into Q. \n 4. If the destination node is not reached, then the graph is not connected."
        },
        {
            heading: "Time Complexity",
            content: "The time complexity of the algorithm is O(V+E) where V is the number of vertices and E is the number of edges in the graph."
        }

    ];

    return (
        <>
            <div className="p-5 bg-base-100 m-4" >
                <Accordion title="Concepts">
                    {Information.map(concepts => (
                        <>
                            <h1 className='text-xl font-medium'>{concepts.heading}</h1>
                            <p className='text-md font-light mb-5 whitespace-pre-line'>{concepts.content}</p>
                        </>
                    ))}
                </Accordion>
            </div >
        </>
    );
}