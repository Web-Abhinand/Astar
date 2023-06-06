import * as d3 from 'd3';

let exportedValue;
export let idValue;
export let hOfNValue;
//exporting the value of gOfN

export const runForceGraph = (container, linksData, nodesData, {
    color,
    radius,
    graphType
}) => {

    if (container.innerHTML != "") {
        container.innerHTML = "";
    }
    console.log(linksData,'linksData');
    console.log(nodesData,'nodesData');

    var digits=['0','1','2','3','4','5','6','7','8','9'];
    const containerRect = container.getBoundingClientRect();
    const height = containerRect.height;
    const width = containerRect.width;

    const linkStrengthScale = d3.scaleLinear()
        .domain([0, d3.max(linksData, d => d.value)])
        .range([0, 1]);

    const forceX = d3.forceX().x(d => d.x).strength(0.02);
    const forceY = d3.forceY().y(d => d.y).strength(0.02);

    const simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(d => d.id).strength(d => linkStrengthScale(d.value / 1000)))
        .force("charge", d3.forceManyBody().strength(-100))
        .force("center", d3.forceCenter())
        .force("x", forceX)
        .force("y", forceY);

    simulation.nodes(nodesData)
    simulation.force("link").links(linksData)

    const svg = d3
        .select(container)
        .append("svg")
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .call(d3.zoom().on("zoom", function () {
            svg.attr("transform", d3.event.transform);
        }));


    const linkGroup = svg.append("g")
        .attr("class", "links")
        .selectAll("g")
        .data(linksData)
        .enter()
        .append("g");

const link = linkGroup.append("line")
  .attr("stroke-width", 1.5)
  .attr("marker-end", "url(#arrowhead)")
  .attr("stroke", "white");

    //appending gOfN value to the link
    const linkLabels = linkGroup.append("text")
        .text(d => d.gOfN)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("fill", "white")
        .attr("font-size", "large")
        .on("click", function(d) {
            var newValue = prompt("Enter new value for gOfN:");
            if (newValue !== null) {
              d.gOfN = newValue;
              d3.select(this).text(newValue);
              exportedValue = newValue; // Store the value in the exported variable
              console.log(d.gOfN, 'gOfN');
              exportValue(exportedValue); // Pass the value to a function for further processing or export
            }
          });

          function exportValue(value) {
            // Use the value for exporting or further processing
            console.log(value);
            // Perform export or other operations with the value
          }

console.log(linksData,'linksData');

    const node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(nodesData)
        .enter().append("g")
        .style("fill", color)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    node.append("circle")
        .attr("r", radius);
    
    //appending id value to the node
    node.append("text")
        .text(d => d.id)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("fill", "black")
        .attr("font-size", "large")
        .on("click", function(d) {
            var oldValue = d.id;
            var newValue = prompt("Enter new value for id:");
            if (newValue !== null) {
              d.id = newValue;
              d3.select(this).text(newValue);
              idValue = newValue; // Store the value in the exported variable
              //code to update the nodesData array with new id value where old value is oldValue
                console.log(nodesData,'nodesData');
            }
          });


    if (graphType == "directed") {
        const marker = svg.append("defs")
            .append("marker")
            .attr("id", "arrowhead")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", radius * 4.5)
            .attr("refY", 0)
            .attr("markerWidth", 8)
            .attr("markerHeight", 8)
            .attr("orient", "auto")
            .attr("fill", "white");
        marker.append("path")
            .attr("d", "M0,-5L10,0L0,5");
    }

    //appending hOfN value to the node
    node.append("text")
        .text(d => d.hOfN)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("fill", "white")
        .attr("font-size", "large")
        .attr("dy", -28)
        .on("click", function(d) {
            var newValue = prompt("Enter new value for hOfN:");
            if (newValue !== null) {
              d.hOfN = newValue;
              d3.select(this).text(newValue);
              hOfNValue = newValue; // Store the value in the exported variable
            }
          });


    function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(1).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }

    function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }
    

    simulation.on("tick", () => {
        simulation.alpha(0.5);
        


        link
            .attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });

        node
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

            link.attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
        
        linkLabels.attr("x", d => (d.source.x + d.target.x) / 2)
                  .attr("y", d => (d.source.y + d.target.y) / 2 - 10);

        d3.selectAll("g.links line")
            .classed("selecting", d => d.selecting);
        d3.selectAll("g.nodes g")
            .classed("start", d => d.startNode);
        d3.selectAll("g.nodes g")
            .classed("found", d => d.targetNode);
        d3.selectAll("g.nodes g")
            .classed("deadEnd", d => d.deadEnd);
        d3.selectAll("g.nodes g")
            .classed("activated", d => d.active);
        d3.selectAll("g.links line")
            .classed("selected", d => d.selected);
    });

    return {
        destroy: () => {
            simulation.stop();
        },
        nodes: () => {
            return svg.node();
        }
    };
}
export const getExportedValue = () => exportedValue;
