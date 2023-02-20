
const event = new CustomEvent('randomSearch')
export const feedbackDetails = [];

const updatefeedBack = (command) => {
    feedbackDetails.push(command);
    window.dispatchEvent(event);
}

const clearfeedBack = () => {
    feedbackDetails.length = 0;
    window.dispatchEvent(event);
}

const alphaarray = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90]


export const generateDirectedNodesAndLinks = function (noOfNodes, noOfLinks,manual,sourceNode,targetNode) {
    console.log(manual,"manual");
    console.log(noOfNodes,"noOfNodes-Directed");
    let nodes = [];
    let links = [];
    for (let i = 0; i < noOfNodes; i++) {
        const c = String.fromCharCode(alphaarray[Math.floor(Math.random() * alphaarray.length)]);

        if (nodes.find(node => node.id === c)) {
            i--;
            continue;
        }

        nodes.push({ id: c });

    }

    // code for selecting source and target nodes for links

    for (let i = 0; i < noOfLinks; i++) {
        const source = nodes[Math.floor(Math.random() * nodes.length)].id;
        const target = nodes[Math.floor(Math.random() * nodes.length)].id;

        if (source == target) {
            i--;
            continue;
        }
        links.push({ source, target, value: Math.floor(Math.random() * 10) + 1 });
    }
    console.log(links,"directed");

    return { nodes, links };

}

export const generateUndirectedNodesAndLinks = function (noOfNodes, noOfLinks,manual,sourceNode,targetNode) {
    let nodes = [];
    let links = [];

    for (let i = 0; i < noOfNodes; i++) {
        const c = String.fromCharCode(alphaarray[Math.floor(Math.random() * alphaarray.length)]);

        if (nodes.find(node => node.id === c)) {
            i--;
            continue;
        }

        nodes.push({ id: c });
    }

    for (let i = 0; i < noOfLinks; i++) {
        console.log(Math.floor(Math.random() * nodes.length));
        console.log(nodes[0].id,"nodes");
        const source = nodes[Math.floor(Math.random() * nodes.length)].id;
        const target = nodes[Math.floor(Math.random() * nodes.length)].id;

        // check if the relation exist
        if (source == target || links.find(link => (link.source === source && link.target === target) || (link.source === target && link.target === source))) {
            i--;
            continue;
        }

        //code to make the graph undirected eg: if a->b exists then b->a also exists         
        const value = Math.floor(Math.random() * 10) + 1;
        links.push({ source, target, value: value });
        links.push({ source: target, target: source, value: value });
        console.log('links in the end',links);
    }
    console.log(links,"sdchg");
    return { nodes, links };
}


const visitedNode = new Set()
const path = []
const speed = 1000

export async function initRandomSearch(nodes, links, startNode, endNode) {
    nodes.map(node => node.active = false)
    links.map(link => link.selected = false)
    links.map(link => link.selecting = false)
    links.map(link => link.startNode = false)
    nodes.map(node => node.startNode = false)
    nodes.map(node => node.targetNode = false)
    clearfeedBack();
    updatefeedBack("Start Node : " + startNode + "")
    nodes.find(node => node.id == startNode).startNode = true
    await new Promise(r => setTimeout(r, speed));
    updatefeedBack("End Node : " + endNode + "")
    visitedNode.clear()
    path.length = 0
    return await randomSearch(nodes, links, startNode, endNode)
}

async function randomSearch(nodes, links, startNode, endNode) {


    // Initialize an empty path
    if (visitedNode.has(startNode)) {
        updatefeedBack("Already visited node : " + startNode + "")
        await new Promise(r => setTimeout(r, speed));
        updatefeedBack("Backtracking to node : " + path[path.length - 1] + "")
        await new Promise(r => setTimeout(r, speed));
        return false;
    }
    path.push(startNode)
    if (startNode == endNode) {
        updatefeedBack("Target Node Found : " + endNode + "")
        nodes.find(node => node.id == endNode).targetNode = true
        await new Promise(r => setTimeout(r, speed));
        updatefeedBack("The path is : <p class='highlighted'>" + path + "</p>")
        return true;
    }
    visitedNode.add(startNode)

    nodes.find(node => node.id == startNode).active = true
    //Selecting all the links that are available from the current node
    updatefeedBack("Selecting all the links that are available from the current node : <p class='highlighted'>" + startNode + "</p>")
    const allAvailableLinks = await links.filter(link => link.source.id == startNode)
    allAvailableLinks.map(link => link.selecting = true)
    await new Promise(r => setTimeout(r, speed));
    updatefeedBack("All the links that are available from the current node : " + startNode + " are : <p class='highlighted'>" + allAvailableLinks.map(link => link.target.id) + "</p>")
    await new Promise(r => setTimeout(r, speed));
    updatefeedBack("Selecting a random link from the available links")
    await new Promise(r => setTimeout(r, speed));
    allAvailableLinks.map(link => link.selecting = false)


    while (allAvailableLinks.length > 0) {
        if(allAvailableLinks.length==1){
            updatefeedBack("Only one link is available and that link is selected")
            await new Promise(r => setTimeout(r, speed));
        }
        const randomIndex = Math.floor(Math.random() * (allAvailableLinks.length - 0) + 0)
        const selectedLink = allAvailableLinks[randomIndex]
        selectedLink.selected = true
        updatefeedBack("Selected Link : <p class='highlighted'>" + selectedLink.source.id + " -> " + selectedLink.target.id + "</p>")
        await new Promise(r => setTimeout(r, speed));
        updatefeedBack("Checking if the target node of the selected link is the target node")
        await new Promise(r => setTimeout(r, speed));
        if (await randomSearch(nodes, links, selectedLink.target.id, endNode)) {
            console.log("Path Found")
            return path;
        }
        // MADE CHANGE HERE the selected link to true
        selectedLink.selected = true
        allAvailableLinks.splice(randomIndex, 1)
    }
    // Dead End
    updatefeedBack("No path found from node : " + startNode + "")
    await new Promise(r => setTimeout(r, speed));

    if (path.length == 1) {
        updatefeedBack("No path found")
        return false;
    }

    nodes.find(node => node.id == startNode).active = false
    updatefeedBack("Backtracking to node : <p class='highlighted'>" + path[path.length - 2] + "</p>")
    path.pop()
    await new Promise(r => setTimeout(r, speed));
    return false;
}

