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
    updatefeedBack(`Selecting the link with the lowest value of <p class='highlighted'>g(n) + h(n)</p> from the current node : <p class='highlighted'>${startNode}</p>`)
    await new Promise(r => setTimeout(r, speed));



    let kO=nodes.find(node => node.id == endNode).hOfN;
    console.log(kO,'kO');
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
    bneighbours.find(link => link.source.id == bcurrent).selected = true;
    console.log(bcurrent,'bcurrent');

    let cfscore = new Map();
    let cneighbours = [];
    let clowest;
    let ccurrent;
    let Flag=0;
    
    
    while(openList.length > 0) {
        nodes.find(node => node.id == endNode).hOfN = 0;
        console.log(links,'links');
        console.log(nodes,'nodes');
        //code to find sum of elements of gOfNS
        sumofgOfNS = gOfNS.reduce((a, b) => a + b, 0);
        console.log(sumofgOfNS,'sumofgOfNS');

        //current has start node @ first iteration
        let current = openList[0];
        console.log(current,'current');

        


        //code to find the neighbours of the current node
        const neighbours= links.filter( link => link.target.id == current&&(!closedList.includes(link.source.id)));

        // neighbours.map(link => link.selecting = true)

        console.log(neighbours,'neighbours');



        //find the f score of all the neighbours
        for (let i = 0; i < neighbours.length; i++) {
            if(Flag==0){
                if(!closedList.includes(neighbours[i].target.id)){
                    fscore.set(neighbours[i].source.id, neighbours[i].source.hOfN + links.find(link => link.source.id == neighbours[i].source.id && link.target.id == neighbours[i].target.id).gOfN);
                }
            }
            else{
                if(!closedList.includes(neighbours[i].target.id)&&neighbours[i].source.id==ccurrent){
                    fscore.set(neighbours[i].source.id, neighbours[i].source.hOfN + sumofgOfNS);
                }
            }
            //code to find the f score of the neighbours in closed list

        }
    
        fscore.forEach((value, key) => {
            console.log(key, value);
        });
        


        await new Promise(r => setTimeout(r, speed));



        //find the node with the lowest f score and make it the current node
        let lowest = -1;
        current = "";
        fscore.forEach((value, key) => {
            if ((lowest == -1 || value < lowest) && !(closedList.includes(key))&&(nodes.find(node => node.id !=current))) {
                lowest = value;
                current = key;
                // nodes.find(node => node.id == current).active = true
                console.log(current,'current in fscore');              
            }
        });
        //console the fscore map
        fscore.forEach((value, key) => {
            updatefeedBack(`f score of ${key} is ${value}`);
        });
 
        updatefeedBack(`Selecting the node with the lowest f score : <p class='highlighted'>${current}</p>`)



        fscore.clear();

        openList.push(current);
        //pushing the first element of openList to closedList
        if (openList.length > 0) {
            closedList.push(openList.shift());
        }
        

        //pushing the gOfN of the current node to the gOfNS array and make
        //FIND THE NEW PFSCORE BASED OF THE CURRENT NODE AND SELECT THE LOWEST LINKS GOFN 
        //AND PUSH IT TO THE GOFNS ARRAY

        cneighbours = links.filter(link => link.target.id === current && !closedList.includes(link.source.id));
        console.log(cneighbours,'cneighbours');

        for (let i = 0; i < cneighbours.length; i++) {
            if(Flag==0){
                if(!closedList.includes(cneighbours[i].target.id)){
                    cfscore.set(cneighbours[i].source.id,cneighbours[i].source.hOfN + cneighbours[i].gOfN);
                }
            }
            else{
                if(!closedList.includes(cneighbours[i].target.id)){
                    cfscore.set(cneighbours[i].source.id,cneighbours[i].source.hOfN + cneighbours[i].gOfN);
                }
            }
        }

        clowest = -1;
        ccurrent = "";
        cfscore.forEach((value, key) => {
            console.log(closedList,'closedList');
            if ((clowest == -1 || value < clowest)&& nodes.find(node => node.id != ccurrent)) {
                if(!closedList.includes(key)){
                    console.log(key,'key');
                    console.log(value,'value');
                    clowest = value;
                    ccurrent = key;
                }            
            }
        });

        //console log the cfscore map
        updatefeedBack(`Neighbours of ${current} node are : `);
        cfscore.forEach((value, key) => {
            updatefeedBack(`${key} and fscore from ${current} is ${value} `);
        });

        cfscore.clear();
        
        if(current!=endNode){
        let pgOfN=links.filter(link=>link.target.id==ccurrent&&link.source.id==current&&!closedList.includes(links=>links.target.id));
            console.log(pgOfN,'pgOfN');
            if(pgOfN.length==0){
                nodes.find(node => node.id == endNode).hOfN = kO;
                updatefeedBack(`No path found`);
                return;
            }
            gOfNS.push((pgOfN.find(pgOf=>pgOf.target.id==ccurrent&&pgOf.source.id==current).gOfN));
            console.log(gOfNS,'gOfNS');
        }

        if(openList.includes(current)){
            nodes.find(node => node.id == current).active = true
        }

        if (current == endNode) {
            closedList.push(current);
            nodes.find(node => node.id == current).targetNode = true
            console.log("found",closedList);
            updatefeedBack("Found the end node : <p class='highlighted'>" + current + "</p>")
            nodes.find(node => node.id == endNode).hOfN = kO;
            console.log(nodes.find(node => node.id == endNode).hOfN,'nodes.find(node => node.id == endNode).hOfN');
            //change the color of the path also
            for (let i = 0; i < closedList.length; i++) {
                links.find(link => link.source.id == closedList[i] && link.target.id == closedList[i + 1]).selected = true;
                console.log(closedList[i],'closedList[i]');
            }
            return;
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