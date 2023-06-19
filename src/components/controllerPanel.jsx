import { initAstarSearch } from "../experiments/astarSearch";
import { useState, useEffect } from "react";


export default function ControllerPanel({ changeGraph, nodesAndLinks, changeGraphType, manual, setManual, setNodesAndLinks, changeManualGraph }) {

    const [targetNode, setTargetNode] = useState('');
    const [sourceNode, setSourceNode] = useState('');
    const [hofn, setHofn] = useState(0);
    const [gofn, setGofn] = useState(0);
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
    const [noOfNodesAndLinks, setNoOfNodesAndLinks] = useState({ noOfNodes: 0, noOfLinks: 0 });



    const handleSourceChange = (e) => {
        console.log(typeof (e.target.value));
        console.log(e.target.value.length);
        const alphabetRegEx = /[a-zA-Z]/;
        if (!alphabetRegEx.test(e.target.value) && e.target.value.length !== 0) {
            setAlertt(true);
        }
        else { setAlertt(false); }
        setSource(e.target.value.toUpperCase());
    }

    const handleDestinationChange = (e) => {
        const alphabetRegEx = /[a-zA-Z]/;
        if (!alphabetRegEx.test(e.target.value) && e.target.value.length !== 0) {
            setAlertt(true);
        }
        else { setAlertt(false); }
        setDestination(e.target.value.toUpperCase());
    }

    const startSearch = async (nodes, links, source, destination) => {
        await initAstarSearch(nodes, links, source, destination);
    }

    useEffect(() => {
        const handleCustomEvent = (e) => {
            const { newValue, linksData,nodesData } = e.detail;
            console.log(e.detail.newValue, 'new value');
            console.log(e.detail.oldValue, 'old value');
            const updatedNodesAndLinks = { ...nodesAndLinks };
            updatedNodesAndLinks.nodes = nodesData;
            updatedNodesAndLinks.links = linksData;
            console.log(updatedNodesAndLinks, 'nodes and links in playground');
            setNodesAndLinks(updatedNodesAndLinks);
        };
        window.addEventListener("updateIdOnClick", handleCustomEvent);
        return () => {
            window.removeEventListener("updateIdOnClick", handleCustomEvent);
        };
    }, []);


    useEffect(() => {
        const handleHOfNUpdate = (e) => {
            const newHOfNValue = e.detail;
            console.log(newHOfNValue);
        };
        window.addEventListener('hOfNUpdate', handleHOfNUpdate);
        return () => {
            window.removeEventListener('hOfNUpdate', handleHOfNUpdate);
        };
    }, []);


    useEffect(() => {
        const handleGOfNUpdate = (e) => {
            const { newValue, linksData,nodesData } = e.detail;
            // Handle the newValue and linksData in your component logic
            console.log(newValue);
            console.log(linksData);
            console.log(nodesData);
            const updatedNodesAndLinks = { ...nodesAndLinks };
            updatedNodesAndLinks.nodes = nodesData;
            updatedNodesAndLinks.links = linksData;
            setNodesAndLinks(updatedNodesAndLinks);
            console.log(nodesAndLinks, "nodes and links in controller panel useEffect");
        };
        window.addEventListener('gOfNUpdate', handleGOfNUpdate);
        return () => {
            window.removeEventListener('gOfNUpdate', handleGOfNUpdate);
        };
    }, []);

    const handleNofNodesAndLinks = () => {

        if (noOfNodesAndLinks.noOfNodes < 0 || noOfNodesAndLinks.noOfLinks > 101 || noOfNodesAndLinks.noOfNodes < 0 || noOfNodesAndLinks.noOfLinks > 101) {
            setError({ state: true, message: 'No of nodes and links should be between 0 and 100' });
            return;
        }
        let newNoOfNodesAndLinks = { noOfNodes: noOfNodesAndLinks.noOfNodes, noOfLinks: noOfNodesAndLinks.noOfLinks };
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

    function handleManualNodesChange(e) {
        setManualNOofNodes(e.target.value);
    }
    function handleManualGraph() {
        setManual(true);
        changeManualGraph(manualNOofNodes, 0);
        console.log('change graph called');
        console.log(nodesAndLinks.nodes, "nodes in controller panel");
        setRandom(false);
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
        //insert hofn value to the node
        nodes = nodes.map(node => {
            if (node.id === sourceNode) {
                node.hOfN = hofn;
                if (node.hOfN !== null && node.hOfN !== undefined) {
                    //set error message
                    setError({ state: true, message: '' });
                } else {
                    // The node.hOfN doesn't have a value, do something here
                    console.log('noproblem');
                }
            }
            return node;
        })


        console.log(nodes, "nodes in contrller panel");
        console.log(links, "links in contrller panel");

        let sourceNodeToBeAdded = nodes.filter(node => node.id === sourceNode);
        let targetNodeToBeAdded = nodes.filter(node => node.id === targetNode);
        const value = Math.floor(Math.random() * 10) + 1;

        if (sourceNodeToBeAdded.length !== 0 && targetNodeToBeAdded.length !== 0) {
            console.log(sourceNodeToBeAdded, "sourceNodeToBeAdded");
            console.log(targetNodeToBeAdded, "targetNodeToBeAdded");

            let link1 = { source: sourceNodeToBeAdded[0], target: targetNodeToBeAdded[0], value: value, gOfN: gofn };
            let link2 = { source: targetNodeToBeAdded[0], target: sourceNodeToBeAdded[0], value: value, gOfN: gofn };

            setNodesAndLinks({ nodes: nodes, links: [...links, link1, link2] });
            console.log(links, "links in controller panel after adding new links");

            setSourceNode('');
            setTargetNode('');
        }
        else {
            setError({ state: true, message: 'Source and Target node should be present in the graph' });
            return;
        }
    }

    return (
        <div className="gap-10 shadow-sm shadow-gray-700 tracking-widest p-5 bg-blue m-4">
            <div className="w-full">
                {/* <Switch changeGraphType={changeGraphType} id={"toggle"} ></Switch> */}
                <h1 className="text-3xl text-center">A* Algorithm</h1>
            </div>
            {/* new state strats here */}
            {random ?
                <>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }} className="my-5">
                        <div className="">
                            {/* <label htmlFor="noOfNodes" style={{ display: 'block' }}>No Of Nodes :</label> */}
                            <input type="number" name="noOfNodes" onChange={
                                (event) => {
                                    const newValue = parseInt(event.target.value);
                                    setNoOfNodesAndLinks({ ...noOfNodesAndLinks, noOfNodes: newValue });
                                    if (newValue > 26) {
                                        setError({ state: true, message: 'No of nodes should be less than 26' });
                                        return;
                                    }
                                    if (newValue < noOfNodesAndLinks.noOfLinks) {
                                        setError({ state: true, message: 'No of nodes should be greater than no of links' });
                                        return;
                                    }
                                    if (newValue < 100 && newValue > noOfNodesAndLinks.noOfLinks) {
                                        setError({ state: false, message: '' });
                                        return;
                                    }
                                    //code to display error message when something other than number is entered
                                    if (isNaN(newValue)) {
                                        setError({ state: true, message: 'No of nodes should be a number' });
                                        return;
                                    }
                                }
                            } className="input input-bordered input-accent bg-white placeholder-gray-800" placeholder="No Of Node" id="noOfNodes" />
                        </div>
                        <div className=''>
                            {/* <label htmlFor="noOfLinks" style={{ display: 'block' }}>No Of Links :</label> */}
                            <input type="number" name="noOfLinks" onChange={
                                (event) => {
                                    const newValue = parseInt(event.target.value);
                                    setNoOfNodesAndLinks({ ...noOfNodesAndLinks, noOfLinks: newValue });
                                    if (newValue > noOfNodesAndLinks.noOfNodes) {
                                        setError({ state: true, message: 'No of links should be less than no of nodes' });
                                        return;
                                    }
                                    if (newValue > 100) {
                                        setError({ state: true, message: 'No of links should be less than 100' });
                                        return;
                                    }
                                    if (newValue < 100 && newValue < noOfNodesAndLinks.noOfNodes) {
                                        setError({ state: false, message: '' });
                                        return;
                                    }
                                }
                            } className="input input-bordered input-accent bg-white placeholder-gray-800" placeholder="No Of Links" id="noOfLinks" />
                        </div>
                    </div>
                </> : null}

            {/* new state ends here */}
            <div className="my-5" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button className="btn btn-primary " onClick={() => {
                    handleNofNodesAndLinks();
                    setManual(false);
                    setRandom(true);
                }
                } style={{ fontWeight: 'bold', width: '49%', color: random ? 'black' : 'grey', boxShadow: random ? '0px 0px 0px 2px #F471B5' : 'none', border: '1px solid #0F1629' }}>Generate Random Graph</button>
                <button className="btn btn-primary" onClick={handleManualGraph} style={{ width: '49%', fontWeight: 'bold', color: manual ? 'black' : 'grey', boxShadow: manual ? '0px 0px 0px 2px #F471B5' : 'none', border: '1px solid #0F1629' }}>Generate Custom Graph</button>
            </div>
            {/* <button className="btn btn-primary" onClick={() => changeGraph(10, 10)} >Generate Random</button> */}

            {/* Random state again begins here */}
            {random ?
                <>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className="my-5">
                            {/* <label htmlFor="source2" style={{ display: 'block' }}>Source Node :</label> */}
                            <input type="text" onChange={handleSourceChange} className="input input-bordered input-accent bg-white placeholder-gray-800" placeholder="Source Node" id="source2" />
                        </div>

                        <div className="my-5">
                            {/* <label htmlFor="destination2">Destination Node :</label> */}
                            <input type="text" onChange={handleDestinationChange} className="input input-bordered input-accent bg-white placeholder-gray-800" placeholder="Destination Node" id="destination2" />
                        </div>
                    </div>

                    <button className="btn btn-secondary" style={{ width: '50%' }} onClick={() => startSearch(nodesAndLinks.nodes, nodesAndLinks.links, source, destination)}>Find Path</button></> : null}

            {
                path ? <div >
                    <h6 className="font-bold tracking-wide">Path Found</h6>
                    {path && path.map((node, index) => {
                        return <span className="text-lg text-accent pr-2" key={index}>{node} {index != path.length - 1 ? '-->' : ''}</span>
                    })}
                </div> : null
            }

            {alertt ? <div className="text-red-500" style={{ fontWeight: 'bold' }}>Only One Capital Letters Allowed</div> : null}

            {manual ? <>
                <div className="my-5" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <input type="number" placeholder="No of nodes" className="input input-bordered input-accent bg-white placeholder-gray-800"
                        value={manualNOofNodes}
                        onChange={
                            (e) => {
                                setManualNOofNodes(e.target.value);
                            }
                        }></input>
                    <button className="btn btn-primary" onClick={handleManualGraph} style={{  fontWeight: 'bold' }}>Add Custom Nodes</button>
                </div>
                {/* button */}


                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <select className="select select-bordered select-accent bg-white my-4"
                        value={sourceNode}
                        onChange={(e) => {
                            setSourceNode(e.target.value);
                        }}>
                        <option value="">Select Source</option>
                        {nodesAndLinks.nodes.map((node) => (
                            <option key={node.id} value={node.id}>{node.id}</option>
                        ))}
                    </select>

                    <select className="select select-bordered select-accent bg-white my-4"
                        value={targetNode}
                        onChange={(e) => {
                            setTargetNode(e.target.value);
                        }}>
                        <option value="">Select Target</option>
                        {nodesAndLinks.nodes.map((node) => (
                            <option key={node.id} value={node.id}>{node.id}</option>
                        ))}
                    </select>
                    {/* <input type="number" placeholder="h(n)" className="input input-bordered input-accent bg-white placeholder-gray-800 my-4 " style={{ width: '25%' }}
                        value={hofn}
                        onChange={(e) => {
                            if (nodesAndLinks.nodes.find(node => node.id === sourceNode && node.hOfN != parseInt(e.target.value))) {
                                setError({ state: true, message: 'If you change the h(n) value of the source node, you will change its original h(n) value. If you want to keep the original h(n) value, please enter the value that was previously assigned to it' });
                            }
                            else {
                                setError({ state: false, message: '' });
                            }
                            setHofn(parseInt(e.target.value));
                        }}></input>
                    <input type="number" placeholder="g(n)" className="input input-bordered input-accent bg-white placeholder-gray-800 my-4 "
                        style={{ width: '25%' }}
                        value={gofn}
                        onChange={(e) => {
                            setGofn(parseInt(e.target.value));
                        }}></input> */}
                </div>

                {/*Input for h(n) and g(n)*/}
                <button className="btn btn-primary my-5" onClick={handleManualLink} style={{ width: '50%', fontWeight: 'bold' }}>Add Link</button>
                <div style={{ display: "flex", justifyContent: 'space-between' }} className="my-5">
                    <div style={{display: "flex"}}>
                        <input type="text" value={source} onChange={handleSourceChange} className="input input-bordered input-accent bg-white placeholder-gray-800" placeholder="Source Node" id="source"  style={{minWidth:'50px'}}/>
                    </div>

                    <div>
                        <input type="text" value={destination} onChange={handleDestinationChange} className="input input-bordered input-accent bg-white placeholder-gray-800" placeholder="Destination Node" id="destination" style={{minWidth:'50px'}}/>
                    </div>
                </div>
                <button className="btn btn-secondary" onClick={() => startSearch(nodesAndLinks.nodes, nodesAndLinks.links, source, destination)}>Find Path</button>
            </> : null}
            {
                error.state ? <div className="text-red-500 w-full">
                    <h6 className="font-bold tracking-wide">
                        {error.message}
                    </h6>
                </div> : null
            }
        </div>
    );
}
