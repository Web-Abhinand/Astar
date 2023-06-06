import { link } from "d3";
import { current } from "daisyui/src/colors";
import { Node } from "postcss";


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


export const generateDirectedNodesAndLinks = function (noOfNodes, noOfLinks, manual, sourceNode, targetNode) {

    let nodes = [];
    let links = [];
    for (let i = 0; i < noOfNodes; i++) {
        const c = String.fromCharCode(alphaarray[Math.floor(Math.random() * alphaarray.length)]);

        if (nodes.find(node => node.id === c)) {
            i--;
            continue;
        }

        nodes.push({ id: c, hOfN: Math.floor(Math.random() * 10) + 1 });

    }

    // code for selecting source and target nodes for links

    for (let i = 0; i < noOfLinks; i++) {
        const source = nodes[Math.floor(Math.random() * nodes.length)].id;
        const target = nodes[Math.floor(Math.random() * nodes.length)].id;

        if (source == target) {
            i--;
            continue;
        }
        const gOfN = Math.floor(Math.random() * 10) + 1;

        links.push({
            source, target, value: Math.floor(Math.random() * 10) + 1,
            gOfN: gOfN
        });
    }


    return { nodes, links };

}

export const generateUndirectedNodesAndLinks = function (noOfNodes, noOfLinks, sourceNode, targetNode) {
    let nodes = [];
    let links = [];

    for (let i = 0; i < noOfNodes; i++) {
        const c = String.fromCharCode(alphaarray[Math.floor(Math.random() * alphaarray.length)]);


        if (nodes.find(node => node.id === c)) {
            i--;
            continue;
        }

        nodes.push({ id: c, hOfN: Math.floor(Math.random() * 10) + 1 });
    }

    for (let i = 0; i < noOfLinks; i++) {
        const source = nodes[Math.floor(Math.random() * nodes.length)].id;
        const target = nodes[Math.floor(Math.random() * nodes.length)].id;

        // check if the relation exist
        if (source == target || links.find(link => (link.source === source && link.target === target) || (link.source === target && link.target === source))) {
            i--;
            continue;
        }
        //code to make the graph undirected eg: if a->b exists then b->a also exists         
        const value = Math.floor(Math.random() * 10) + 1;
        const gOfN = Math.floor(Math.random() * 10) + 1;
        links.push({ source, target, value: value, gOfN: gOfN });
        links.push({ source: target, target: source, value: value, gOfN: gOfN });
    }
    return { nodes, links };
}


const visitedNode = new Set()
const path = []
const speed = 1000


// Random Search Algorithm

export async function initAstarSearch(nodes, links, startNode, endNode) {
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
    return await astarSearch(nodes, links, startNode, endNode)
}

async function astarSearch(nodes, links, startNode, endNode) {
    // Initialize an empty path
    nodes.find(node => node.id == startNode).active = true
    //Selecting all the links that are available from the current node
    updatefeedBack("Selecting all the links that are available from the current node : <p class='highlighted'>" + startNode + "</p>")
    const allAvailableLinks = await links.filter(link => link.source.id == startNode)
    allAvailableLinks.map(link => link.selecting = false)
    await new Promise(r => setTimeout(r, speed));
    updatefeedBack("All the links that are available from the current node : " + startNode + " are : <p class='highlighted'>" + allAvailableLinks.map(link => link.target.id) + "</p>")
    await new Promise(r => setTimeout(r, speed));
    updatefeedBack(`Selecting the link with the lowest value of <p class='highlighted'>g(n) + h(n)</p> from the current node : <p class='highlighted'>${startNode}</p>`)
    await new Promise(r => setTimeout(r, speed));

    //step1
    let openList = []
    let closedList = []
    let current = nodes.find(node => node.id == startNode).id
    let end = nodes.find(node => node.id == endNode)
    openList.push(current)
    let neighbours = [];
    let fscore = new Map();
    let gOfNS = [];
    let flag = 0;
    let sumofgOfNS = 0;

    while (openList.length > 0) {

        //step2
        if (openList.length === 0) {
            return
        }

        //Step 3
        updatefeedBack(`OPEN LIST : <p class='highlighted'>${openList}</p>`)
        if (openList.includes(current)) {
            openList = openList.filter(item => item !== current);
        }

        closedList.push(current);
        console.log(openList, "openList");
        if (current === endNode) {
            console.log("found the end node", current);
            return
        }


        //step 4
        console.log(nodes, "nodes")
        neighbours = links.filter(link => link.source.id == current)
        console.log(neighbours, "neighbours");


        //step 5
        if (neighbours.find(neighbour => neighbour.target.id == endNode)) {
            console.log("found the end node", neighbours.find(neighbour => neighbour.target.id == endNode));
            closedList.push(endNode);
            console.log(closedList, "closedList in step 5")
            updatefeedBack(`CLOSED LIST : <p class='highlighted'>${closedList}</p>`)
            await new Promise(r => setTimeout(r, speed));
            nodes.find(node => node.id == endNode).active = true
            await new Promise(r => setTimeout(r, speed));
            updatefeedBack(`Goal Node Reached: ${endNode}`);

            //code to change the color of the link
            console.log('exiting from step 5')
            console.log('current', current);

            // for (let i = 0; i < closedList.length; i++) {
            //     links.find(link => link.source.id == closedList[i] && link.target.id == closedList[i + 1]).selected = true;
            //     console.log(closedList[i],'closedList[i]');
            // }

            //code to change the color of the link between current and end node
            links.find(link => link.source.id === current && link.target.id === endNode).selected = true;

            return
        }

        //step 6
        for (let i = 0; i < neighbours.length; i++) {
            if (flag === 0) {
                fscore.set(neighbours[i].target.id, neighbours[i].target.hOfN + neighbours[i].gOfN);
                openList.push(neighbours[i].target.id);
            }
            else {
                if (!closedList.includes(neighbours[i].target.id)) {
                    fscore.set(neighbours[i].target.id, neighbours[i].target.hOfN + sumofgOfNS + neighbours[i].gOfN);
                }
                if (!openList.includes(neighbours[i].target.id) && !closedList.includes(neighbours[i].target.id)) {
                    openList.push(neighbours[i].target.id);
                }
                // if all the neighbours are in closed list then then set the first element of open list as current and continue the  iterations  
                function checkElementsPresent(neighbors, closedList) {
                    for (let i = 0; i < neighbors.length; i++) {
                        if (!closedList.includes(neighbors[i])) {
                            return false;
                        }
                    }
                    return true;
                }

                if (checkElementsPresent(neighbours, closedList)) {
                    console.log("All elements of neighbors are present in closedList");
                } else {
                    console.log("Not all elements of neighbors are present in closedList");
                }

            }
        }

        await new Promise(r => setTimeout(r, speed));
        updatefeedBack("fscore of all the nodes : <p class='highlighted'>" + Array.from(fscore) + "</p>")
        //find the minimum value of fscore and set it as current
        let lowest = -1;
        fscore.forEach((value, key) => {
            if ((lowest == -1 || value < lowest) && !(closedList.includes(key)) && (nodes.find(node => node.id != current))) {
                lowest = value;
                current = key;
                console.log(current, 'current in fscore');
            }
        });

        //code to change the color of the link between current and last element of closed list
        links.find(link => link.source.id === closedList[closedList.length - 1] && link.target.id === current).selected = true;

        await new Promise(r => setTimeout(r, speed));
        updatefeedBack("lowest fscore node : <p class='highlighted'>" + current + "</p>" + " with fscore : <p class='highlighted'>" + lowest + "</p>")
        fscore.clear();
        await new Promise(r => setTimeout(r, speed));
        nodes.find(node => node.id === current).active = true
        //if current is the end node then return the path
        if (current === endNode) {
            console.log('path found');
            updatefeedBack(`CLOSED LIST : <p class='highlighted'>${closedList}</p>`)
            updatefeedBack("Path found")
            //remove current from openlist
            openList = openList.filter(item => item !== current);
            updatefeedBack(`OPEN LIST : <p class='highlighted'>${openList}</p>`)
            for (let i = 0; i < closedList.length; i++) {
                links.find(link => link.source.id === closedList[i] && link.target.id == closedList[i + 1]).selected = true;
                console.log(closedList[i], 'closedList[i]');
            }
            return
        }

        
        gOfNS.push(links.find(link => link.target.id === closedList[closedList.length - 1] && link.source.id === current).gOfN);
        console.log(gOfNS, "gOfNS");
        sumofgOfNS = gOfNS.reduce((a, b) => a + b, 0);
        console.log(sumofgOfNS, "sumofgOfNS");
        flag = flag + 1;
    }


    allAvailableLinks.map(link => link.selecting = false)

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

//  