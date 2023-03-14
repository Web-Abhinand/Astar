import Switch from "./mini/switch";
import { initAstarSearch } from "../experiments/astarSearch";
import { useState, useEffect } from "react";
import { generateDirectedNodesAndLinks } from '../experiments/astarSearch';
import { generateUndirectedNodesAndLinks } from '../experiments/astarSearch';

export default function ControllerPanel({ changeGraph, nodesAndLinks, changeGraphType, manual, setManual, setNodesAndLinks, noOfNodesAndLinks, setNoOfNodesAndLinks }) {

    const [targetNode, setTargetNode] = useState('');
    const [sourceNode, setSourceNode] = useState('');
    const [manualNOofNodes, setManualNOofNodes] = useState(1);
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [path, setPath] = useState();
    const [random, setRandom] = useState(true);
    const [alertt, setAlertt] = useState(false);
    const [error, setError] = useState({
        state: false,
        message: ''
    });



    const handleSourceChange = (e) => {
        console.log(typeof (e.target.value));
        console.log(e.target.value.length);
        const capitalLettersRegEx = /^[A-Z]$/;
        if (!capitalLettersRegEx.test(e.target.value) && e.target.value.length !== 0) {
            setAlertt(true);
        }
        else { setAlertt(false); }
        setSource(e.target.value);
    }

    const handleDestinationChange = (e) => {
        const capitalLettersRegEx = /^[A-Z]$/;
        if (!capitalLettersRegEx.test(e.target.value) && e.target.value.length !== 0) {
            setAlertt(true);
        }
        else { setAlertt(false); }
        console.log(e.target.value);
        setDestination(e.target.value);
    }

    const startSearch = async (nodes, links, source, destination) => {
        await initAstarSearch(nodes, links, source, destination);
    }

    const handleNofNodesAndLinks = () => {

        if (noOfNodesAndLinks.noOfNodes < 0 || noOfNodesAndLinks.noOfLinks > 101 || noOfNodesAndLinks.noOfNodes < 0 || noOfNodesAndLinks.noOfLinks > 101) {
            setError({ state: true, message: 'No of nodes and links should be between 0 and 100' });
            return;
        }
        let newNoOfNodesAndLinks = { noOfNodes: noOfNodesAndLinks.noOfNodes, noOfLinks: noOfNodesAndLinks.noOfLinks };
        // if (parseInt(newNoOfNodesAndLinks.noOfNodes) >= parseInt(newNoOfNodesAndLinks.noOfLinks)) {
        //     console.log(newNoOfNodesAndLinks.noOfNodes);
        //     console.log(newNoOfNodesAndLinks.noOfLinks);
        //     setError({ state: true, message: 'No of nodes should be greater than no of links' });
        //     return;
        // }
        setError({ state: false, message: '' });
        setNoOfNodesAndLinks(newNoOfNodesAndLinks);
        changeGraph(noOfNodesAndLinks.noOfNodes, noOfNodesAndLinks.noOfLinks)
    }

    function handleManualNodesChange(e) {
        setManualNOofNodes(e.target.value);
    }
    function handleManualGraph() {
        setManual(true);
        changeGraph(manualNOofNodes, 0);
        console.log('change graph called');
    }

    useEffect(() => {
        setPath();
        setSource('');
        setDestination('');
    }, [nodesAndLinks])

    const handleManualLink = () => {
        if (sourceNode === '' || targetNode === '') {
            setError({ state: true, message: 'Source and Target node cannot be empty' });
            return;
        }
        if (sourceNode === targetNode) {
            setError({ state: true, message: 'Source and Target node cannot be same' });
            return;
        }
        setError({ state: false, message: '' });

        let nodes = nodesAndLinks.nodes;
        let links = nodesAndLinks.links;

        let sourceNodeToBeAdded = nodes.filter(node => node.id === sourceNode);
        let targetNodeToBeAdded = nodes.filter(node => node.id === targetNode);
        const value = Math.floor(Math.random() * 10) + 1;

        if (sourceNodeToBeAdded.length !== 0 && targetNodeToBeAdded.length !== 0) {
            console.log(sourceNodeToBeAdded, "sourceNodeToBeAdded");
            console.log(targetNodeToBeAdded, "targetNodeToBeAdded");

            let link = { source: sourceNodeToBeAdded[0], target: targetNodeToBeAdded[0], value: value };

            setNodesAndLinks({ nodes: nodes, links: [...links, link] });


            setSourceNode('');
            setTargetNode('');
        }
        else {
            setError({ state: true, message: 'Source and Target node should be present in the graph' });
            return;
        }
    }

    return (
        <div className="p-5 bg-base-100 m-4 shadow-sm shadow-gray-700">
            <Switch changeGraphType={changeGraphType} id={"toggle"} ></Switch>
            <div style={{ display: 'flex', justifyContent: 'space-between' }} className="my-5">
                <label htmlFor="noOfNodes" style={{ display: 'block' }}>No Of Nodes :</label>
                <input type="number" name="noOfNodes" onChange={
                    (event) => {
                        const newValue = parseInt(event.target.value);
                        setNoOfNodesAndLinks({ ...noOfNodesAndLinks, noOfNodes: newValue });
                        // if (newValue > 100) {
                        //     setError({ state: true, message: 'No of nodes should be less than 100' });
                        //     return;
                        // }
                        // if (newValue >= noOfNodesAndLinks.noOfLinks) {
                        //     setError({ state: true, message: 'No of nodes should be greater than no of links' });
                        //     return;
                        // }
                        // if (newValue < 100 && newValue >= noOfNodesAndLinks.noOfLinks) {
                        //     setError({ state: false, message: '' });
                        //     return;
                        // }
                        //code to display error message when something other than number is entered
                        if (isNaN(newValue)) {
                            setError({ state: true, message: 'No of nodes should be a number' });
                            return;
                        }
                    }
                } className="input input-bordered input-accent bg-white placeholder-gray-800" placeholder="No Of Node" id="noOfNodes" />
            </div>
            <div style={{ display: 'flex', justifyContent: "space-between" }} className='my5'>
                <label htmlFor="noOfLinks" style={{ display: 'block' }}>No Of Links :</label>
                <input type="number" name="noOfLinks" onChange={
                    (event) => {
                        const newValue = parseInt(event.target.value);
                        setNoOfNodesAndLinks({ ...noOfNodesAndLinks, noOfLinks: newValue });
                        // if (newValue >= noOfNodesAndLinks.noOfNodes) {
                        //     setError({ state: true, message: 'No of links should be less than no of nodes' });
                        //     return;
                        // }
                        // if (newValue > 100) {
                        //     setError({ state: true, message: 'No of links should be less than 100' });
                        //     return;
                        // }
                        // if (newValue < 100 && newValue <= noOfNodesAndLinks.noOfNodes) {
                        //     setError({ state: false, message: '' });
                        //     return;
                        // }
                    }
                } className="input input-bordered input-accent bg-white placeholder-gray-800" placeholder="No Of Links" id="noOfLinks" />
            </div>
            <div className="my-5"style={{display:'flex',justifyContent:'space-between'}}>
                {/* Genereat Random and Generate Manual Buttons */}
                <button className="btn btn-primary " onClick={() =>
                {handleNofNodesAndLinks();
                setManual(false);
            setRandom(true);}
                } style={{fontWeight:'bold',width:'49%',color:random?'black':'grey',boxShadow:random?'0px 0px 0px 2px #F471B5':'none',border:'1px solid #0F1629'}}>Generate Random Graph</button>
                <button className="btn btn-primary" onClick={handleManualGraph} style={{width:'49%', fontWeight:'bold',color:manual?'black':'grey',boxShadow:manual?'0px 0px 0px 2px #F471B5':'none',border:'1px solid #0F1629'}}>Generate Custom Graph</button>
            </div>

            {/* sourve and destination inputs */}
            <div className="my-5" style={{display:'flex',justifyContent:'space-between'}}>
            <label htmlFor="source2" style={{display:'block'}}>Source Node :</label>
            <input type="text"  onChange={handleSourceChange} className="input input-bordered input-accent bg-white placeholder-gray-800" placeholder="Source Node" id="source2" />
            </div>

            <div className="my-5" style={{display:'flex',justifyContent:'space-between'}}>
            <label htmlFor="destination2">Destination Node :</label>
            <input type="text"  onChange={handleDestinationChange} className="input input-bordered input-accent bg-white placeholder-gray-800" placeholder="Destination Node" id="destination2" />
            </div>


            <button className="btn btn-secondary" style={{width:'50%'}} onClick={() => startSearch(nodesAndLinks.nodes, nodesAndLinks.links, source, destination)}>Find Path</button>

        </div>
    );
}
