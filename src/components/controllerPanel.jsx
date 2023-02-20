import Switch from "./mini/switch";
import { initRandomSearch } from "../experiments/randomSearch";
import { useState, useEffect } from "react";
import { generateDirectedNodesAndLinks } from '../experiments/randomSearch';
import { generateUndirectedNodesAndLinks } from '../experiments/randomSearch';

export default function ControllerPanel({ changeGraph, nodesAndLinks, changeGraphType, manual, setManual,setNodesAndLinks}) {

    const [targetNode, setTargetNode] = useState('');
    const [sourceNode, setSourceNode] = useState('');
    const [manualNOofNodes, setManualNOofNodes] = useState(1);
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [path, setPath] = useState();
    const [random,setRandom] = useState(true);
    const [alertt, setAlertt] = useState(false);
    const [error, setError] = useState({
        state: false,
        message: ''
    });
    const [noOfNodesAndLinks, setNoOfNodesAndLinks] = useState({ noOfNodes: 0, noOfLinks: 0 });

    // const [noOfNodes, setNoOfNodes] = useState(1);
    // const [noOfLinks, setNoOfLinks] = useState(1);

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
        if (!capitalLettersRegEx.test(e.target.value ) && e.target.value.length !== 0) {
            setAlertt(true);
        }
        else { setAlertt(false); }
        console.log(e.target.value);
        setDestination(e.target.value);
    }

    const startSearch = async (nodes, links, source, destination) => {
        await initRandomSearch(nodes, links, source, destination);
    }

    // const handleNofNodesAndLinks = (e) => {    
    //     if (e.target.value < 1 || e.target.value > 20) {
    //         setError({ state: true, message: 'No of nodes and links should be between 5 and 15' });
    //         console.log('hello worlddddd');
    //         console.log(typeof(noOfNodesAndLinks.noOfNodes));
    //         return;
    //     }
    //     setError({ state: false, message: '' });
    //     setNoOfNodesAndLinks({ ...noOfNodesAndLinks, [e.target.name]: e.target.value });
    //     //what is happening here
    //     console.log(noOfNodesAndLinks);
    // }
    

    const handleNofNodesAndLinks = () => {

        if (noOfNodesAndLinks.noOfNodes < 0 || noOfNodesAndLinks.noOfLinks > 101 || noOfNodesAndLinks.noOfNodes < 0 || noOfNodesAndLinks.noOfLinks > 101) {
            setError({ state: true, message: 'No of nodes and links should be between 0 and 100' });
            return;
        }
        let newNoOfNodesAndLinks = { noOfNodes: noOfNodesAndLinks.noOfNodes, noOfLinks:noOfNodesAndLinks.noOfLinks};
        if (parseInt(newNoOfNodesAndLinks.noOfNodes) <= parseInt(newNoOfNodesAndLinks.noOfLinks)) {
            console.log(newNoOfNodesAndLinks.noOfNodes);
            console.log(newNoOfNodesAndLinks.noOfLinks);
            setError({ state: true, message: 'No of nodes should be greater than no of links' });
            return;
        }
        setError({ state: false, message: '' });
        setNoOfNodesAndLinks(newNoOfNodesAndLinks);
        changeGraph(noOfNodesAndLinks.noOfNodes, noOfNodesAndLinks.noOfLinks)
    }

    function handleManualNodesChange(e){
        setManualNOofNodes(e.target.value);
    }
    function handleManualGraph() {
        setManual(true);
        changeGraph(manualNOofNodes,0);
        console.log('change graph call\led');
    }

    // function handleManualTargetChange(e){
    //     setTargetNode(e.target.value);
    // }
    // function handleManualSourceChange(e){
    //     setSourceNode(e.target.value);
    // }

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
        // TODO: add link to the nodeAndLinks object and update the graph
        // let newNodesAndLinks = { ...nodesAndLinks };
        // newNodesAndLinks.links.push({ source: sourceNode, target: targetNode });
        // setNodesAndLinks(newNodesAndLinks);

        // generateUndirectedNodesAndLinks(nodesAndLinks.nodes, nodesAndLinks.links,sourceNode,targetNode);
        // generateDirectedNodesAndLinks(nodesAndLinks.nodes, nodesAndLinks.links,sourceNode,targetNode);

        let nodes = nodesAndLinks.nodes;
        let links = nodesAndLinks.links;

        let sourceNodeToBeAdded = nodes.filter(node => node.id === sourceNode);
        let targetNodeToBeAdded = nodes.filter(node => node.id === targetNode);
        const value = Math.floor(Math.random() * 10) + 1;

        if (sourceNodeToBeAdded.length !== 0 && targetNodeToBeAdded.length !== 0) {
            console.log(sourceNodeToBeAdded,"sourceNodeToBeAdded");
            console.log(targetNodeToBeAdded,"targetNodeToBeAdded");

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
        // <div className="grid grid-cols-2 gap-10 shadow-sm shadow-gray-700 tracking-widest p-5 bg-blue m-4">
        //     <Switch changeGraphType={changeGraphType} id={"toggle"} ></Switch>
            
        //     <label htmlFor="noOfNodes">No Of Nodes :</label>
        //     <input type="number" name="noOfNodes" onChange={
        //         (event) =>{
        //             const newValue = parseInt(event.target.value);
        //             setNoOfNodesAndLinks({ ...noOfNodesAndLinks, noOfNodes: newValue });
        //             if(newValue > 100){
        //                 setError({ state: true, message: 'No of nodes should be less than 100' });
        //                 return;
        //             }
        //             if (newValue < noOfNodesAndLinks.noOfLinks) {
        //                 setError({ state: true, message: 'No of nodes should be greater than no of links' });
        //                 return;
        //             }
        //             if (newValue < 100 && newValue > noOfNodesAndLinks.noOfLinks) {
        //                 setError({ state: false, message: '' });
        //                 return;
        //             }
        //             //code to display error message when something other than number is entered
        //             if (isNaN(newValue)) {
        //                 setError({ state: true, message: 'No of nodes should be a number' });
        //                 return;
        //             }
        //         }
        //     } className="input input-bordered input-accent bg-white placeholder-gray-800" placeholder="No Of Node" id="noOfNodes" />
        //     <label htmlFor="noOfLinks">No Of Links :</label>
        //     <input type="number" name="noOfLinks" onChange={
        //         (event) =>{
        //             const newValue = parseInt(event.target.value);
        //             setNoOfNodesAndLinks({ ...noOfNodesAndLinks, noOfLinks: newValue });
        //             if (newValue > noOfNodesAndLinks.noOfNodes) {
        //                 setError({ state: true, message: 'No of links should be less than no of nodes' });
        //                 return;
        //             }
        //             if (newValue > 100) {
        //                 setError({ state: true, message: 'No of links should be less than 100' });
        //                 return;
        //             }
        //             if (newValue < 100 && newValue < noOfNodesAndLinks.noOfNodes) {
        //                 setError({ state: false, message: '' });
        //                 return;
        //             }
        //         }
        //     } className="input input-bordered input-accent bg-white placeholder-gray-800" placeholder="No Of Links" id="noOfLinks" />
        //     <button className="btn btn-primary w-full" onClick={() =>
        //      handleNofNodesAndLinks()
        //     } style={{ width: '100%' ,fontWeight:'bold'}}>Generate Random Graph</button>
        //     <button className="btn btn-primary w-full" onClick={handleManualGraph} style={{ width: '100%',fontWeight:'bold'}}>Generate Custom Graph</button>
        //     {/* <button className="btn btn-primary" onClick={() => changeGraph(10, 10)} >Generate Random</button> */}
        //     <label htmlFor="source">Source Node :</label>
        //     <input type="text" value={source} onChange={handleSourceChange} className="input input-bordered input-accent bg-white placeholder-gray-800" placeholder="Source Node" id="source" />
        //     <label htmlFor="destination">Destination Node :</label>
        //     <input type="text" value={destination} onChange={handleDestinationChange} className="input input-bordered input-accent bg-white placeholder-gray-800" placeholder="Destination Node" id="destination" />
        //     <button className="btn btn-secondary" onClick={() => startSearch(nodesAndLinks.nodes, nodesAndLinks.links, source, destination)}>Find Path</button><br></br>
        //     {
        //         path ? <div >
        //             <h6 className="font-bold tracking-wide">Path Found</h6>
        //             {path && path.map((node, index) => {
        //                 return <span className="text-lg text-accent pr-2" key={index}>{node} {index != path.length - 1 ? '-->' : ''}</span>
        //             })}
        //         </div> : null
        //     }
        //     {
        //         error.state ? <div className="text-red-500">
        //             <h6 className="font-bold tracking-wide">
        //                 {error.message}
        //             </h6>
        //         </div> : null
        //     }
        //     {alertt ? <div className="text-red-500" style={{fontWeight:'bold'}}>Only One Capital Letters Allowed</div> : null}
        //     <br></br>
        //     {manual ? <div>
        //         <div className="flex flex-col">
        //         <input type="number" placeholder="No of nodes" className="input input-bordered input-accent bg-white placeholder-gray-800 my-4" 
        //         value={manualNOofNodes}
        //         onChange={
        //             (e)=>{
        //                 setManualNOofNodes(e.target.value);
        //             }
        //         }></input>
        //         {/* button */}
        //         <button className="btn btn-primary w-full" onClick={handleManualGraph} style={{ width: '100%',fontWeight:'bold'}}>Add Custom Nodes</button>
        //         </div>
        //         <input type="text" placeholder="Source" className="input input-bordered input-accent bg-white placeholder-gray-800 my-4 w-full" 
        //         value={sourceNode}
        //         onChange={(e)=>{
        //             setSourceNode(e.target.value);
        //         }}></input>
        //         <input type="text" placeholder="Target" className="input input-bordered input-accent bg-white placeholder-gray-800 my-4 w-full" 
        //         value={targetNode}
        //         onChange={(e)=>{
        //             setTargetNode(e.target.value);
        //         }}></input>
        //         <div style={{}}>
        //             <button className="btn btn-primary w-full" onClick={handleManualLink} style={{ width: '100%',fontWeight:'bold'}}>Add Link</button>
        //             <div style={{display:'flex',width:'220%',justifyContent:'space-between',paddingLeft:'5px'}} className='my-2'>
        //                 <label htmlFor="source">Source Node :</label>
        //                 <input type="text" value={source} onChange={handleSourceChange} className="input input-bordered input-accent bg-white placeholder-gray-800" placeholder="Source Node" id="source" />
        //             </div>
        //             <div style={{display:'flex',width:'220%',justifyContent:'space-between',paddingLeft:'5px'}} className='my-2'>
        //                 <label htmlFor="destination">Destination Node :</label>
        //                 <input type="text" value={destination} onChange={handleDestinationChange} className="input input-bordered input-accent bg-white placeholder-gray-800" placeholder="Destination Node" id="destination" />
        //             </div>
        //             <button className="btn btn-secondary w-full" onClick={() => startSearch(nodesAndLinks.nodes, nodesAndLinks.links, source, destination)}>Find Path</button>
        //         </div>
        //     </div> : null}
        // </div>
        <div className="p-5 bg-base-100 m-4 shadow-sm shadow-gray-700">
            <Switch changeGraphType={changeGraphType} id={"toggle"} ></Switch>
        </div>
    );
}
