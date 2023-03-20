import { link } from "d3";
import { current } from "daisyui/src/colors";


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
  
    let nodes = [];
    let links = [];
    for (let i = 0; i < noOfNodes; i++) {
        const c = String.fromCharCode(alphaarray[Math.floor(Math.random() * alphaarray.length)]);

        if (nodes.find(node => node.id === c)) {
            i--;
            continue;
        }

        nodes.push({ id: c,hOfN : Math.floor(Math.random() * 10) + 1 });

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
        
        links.push({ source, target, value: Math.floor(Math.random() * 10) + 1, 
        gOfN: gOfN});
    }
    

    return { nodes, links };

}

export const generateUndirectedNodesAndLinks = function (noOfNodes, noOfLinks,sourceNode,targetNode) {
    let nodes = [];
    let links = [];

    for (let i = 0; i < noOfNodes; i++) {
        const c = String.fromCharCode(alphaarray[Math.floor(Math.random() * alphaarray.length)]);


        if (nodes.find(node => node.id === c)) {
            i--;
            continue;
        }
        
        nodes.push({ id: c, hOfN : Math.floor(Math.random() * 10) + 1 });
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
    updatefeedBack("Selecting a link from the available links based on the heuristic function")
    await new Promise(r => setTimeout(r, speed));




    let openList = [];
    let closedList = [];
    let fscore = new Map();
    openList.push(startNode);
    let gOfNS=[];
    let sumofgOfNS;
    let bcurrent = "";
    let bfscore = new Map();
    let bneighbours = [];
    bneighbours= links.filter( link => link.target.id == startNode);
    for(let i=0;i<bneighbours.length;i++){
        bfscore.set(bneighbours[i].source.id, bneighbours[i].gOfN + bneighbours[i].source.hOfN);
    }

    let blowest = -1;
        bcurrent = "";
        bfscore.forEach((value, key) => {
            if ((blowest == -1 || value < blowest)) {
                blowest = value;
                bcurrent = key;               
            }
        });
        
    gOfNS.push(bneighbours.find(link => link.source.id == bcurrent).gOfN);
    console.log(bcurrent,'bcurrent');
    
    let Flag=0;

    while(openList.length > 0) {
        console.log(links,'links');
        console.log(nodes,'nodes');
        //code to find sum of elements of gOfNS
        sumofgOfNS = gOfNS.reduce((a, b) => a + b, 0);
        console.log(sumofgOfNS,'sumofgOfNS');

        //current has start node @ first iteration
        let current = openList[0];
        console.log(current,'current');

        //CODE to check if the current node is the end node
        if (current == endNode) {
            closedList.push(current);
            nodes.find(node => node.id == current).targetNode = true
            console.log("found",closedList);
            return;
        }

        //code to find the neighbours of the current node
        const neighbours= links.filter( link => link.target.id == current&&(!closedList.includes(link.source.id)));

        console.log(neighbours,'neighbours');



        //find the f score of all the neighbours
        for (let i = 0; i < neighbours.length; i++) {
            if(Flag==0){
                if(!closedList.includes(neighbours[i].target.id)){
                    fscore.set(neighbours[i].source.id, neighbours[i].gOfN + neighbours[i].source.hOfN + 0);
                }
            }
            else{
                if(!closedList.includes(neighbours[i].target.id)){
                    fscore.set(neighbours[i].source.id, neighbours[i].gOfN + neighbours[i].source.hOfN + sumofgOfNS);
                }
            }
            //code to find the f score of the neighbours in closed list

        }
    
        fscore.forEach((value, key) => {
            console.log(key, value);
        });
        
        if(neighbours.includes(endNode)){
            console.log("found",closedList);
            return;
        }

        await new Promise(r => setTimeout(r, speed));

        //pushing the gOfN of the current node to the gOfNS array and make
        let pgOfN=links.filter(link=>link.target.id==current&&(!closedList.includes(link.target.id)));
        console.log(pgOfN,'pgOfN');
        if(Flag!=0){
            gOfNS.push((pgOfN.find(pgOf=>pgOf.target.id==current).gOfN));
            console.log(gOfNS,'gOfNS');
        }

        //find the node with the lowest f score and make it the current node
        let lowest = -1;
        current = "";
        fscore.forEach((value, key) => {
            if ((lowest == -1 || value < lowest) && !(closedList.includes(key))&&(nodes.find(node => node.id !=current))) {
                lowest = value;
                current = key; 
                nodes.find(node => node.id == current).active = true
                console.log(current,'current in fscore');               
            }
        });

        fscore.clear();
        
        openList.push(current);
        //pushing the first element of openList to closedList
        if (openList.length > 0) {
            closedList.push(openList.shift());
          }


            // links.find(link => link.target.id == current).selected = true
            console.log(gOfNS,'gOfNS');
        

        await new Promise(r => setTimeout(r, speed));

        console.log(current,'current');

        lowest = -1;
        // closedList=openList.pop();

        



        Flag=Flag+1;
        //final path
        console.log(closedList,'final path');
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