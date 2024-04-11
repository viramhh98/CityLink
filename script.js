class Graph {
    constructor() {
        this.nodes = new Map();
    }

    addNode(node) {
        this.nodes.set(node, []);
    }

    addEdge(node1, node2, weight) {
        this.nodes.get(node1).push({ node: node2, weight });
        this.nodes.get(node2).push({ node: node1, weight });
    }
}

class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(item, priority) {
        this.items.push({ item, priority });
        this.items.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.items.shift().item;
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

class Dijkstra {
    constructor(graph) {
        this.graph = graph;
    }

    findShortestPath(startNode, endNode) {
        const distances = new Map();
        const previous = new Map();
        const priorityQueue = new PriorityQueue();

        for (const node of this.graph.nodes.keys()) {
            distances.set(node, node === startNode ? 0 : Infinity);
            priorityQueue.enqueue(node, distances.get(node));
            previous.set(node, null);
        }

        while (!priorityQueue.isEmpty()) {
            const currentNode = priorityQueue.dequeue();

            if (currentNode === endNode) {
                const path = [];
                let current = endNode;
                while (current !== null) {
                    path.unshift(current);
                    current = previous.get(current);
                }
                return path;
            }

            const neighbors = this.graph.nodes.get(currentNode);
            for (const neighbor of neighbors) {
                const newDistance = distances.get(currentNode) + neighbor.weight;
                if (newDistance < distances.get(neighbor.node)) {
                    distances.set(neighbor.node, newDistance);
                    previous.set(neighbor.node, currentNode);
                    priorityQueue.enqueue(neighbor.node, newDistance);
                }
            }
        }

        return null; // No path found
    }
}

// Example usage:
const graph = new Graph();
graph.addNode(1);
graph.addNode(2);
graph.addNode(3);
graph.addNode(4);
graph.addNode(5);
graph.addNode(6);
graph.addEdge(1, 2, 7);
graph.addEdge(1, 3, 9);
graph.addEdge(1, 6, 14);
//   graph.addEdge(1, 1, 0);
graph.addEdge(2, 3, 10);
graph.addEdge(2, 4, 15);
graph.addEdge(3, 4, 11);
graph.addEdge(3, 6, 2);
graph.addEdge(4, 5, 6);
graph.addEdge(5, 6, 9);



function numberToLetter(number) {
    if (number < 1 || number > 26) {
        return null; // Return null for numbers outside the range 1-26
    }
    return String.fromCharCode(64 + number);
}


function sortString(str) {
    // Split the string into an array of characters
    var sortedArray = str.split('');

    // Sort the array of characters
    sortedArray.sort();

    // Join the sorted array back into a string
    var sortedString = sortedArray.join('');

    return sortedString;
}
function promptUser() {
    let startNode, endNode;

    // Prompt the user to enter the start node until a valid value is entered
    do {
        startNode = window.prompt("Enter the start node (A to F):");
    } while (!startNode || !/^[A-F]$/.test(startNode.toUpperCase()));

    // Prompt the user to enter the end node until a valid value is entered
    do {
        endNode = window.prompt("Enter the end node (A to F):");
    } while (!endNode || !/^[A-F]$/.test(endNode.toUpperCase()));

    document.getElementById("find").innerText="shortest path between "+startNode+ " and "+ endNode;
    // Convert the node names to corresponding numerical values (e.g., 'A' -> 1, 'B' -> 2, etc.)
    startNode = startNode.toUpperCase().charCodeAt(0) - 64; // ASCII code of 'A' is 65
    endNode = endNode.toUpperCase().charCodeAt(0) - 64; // ASCII code of 'A' is 65
    // Perform further actions with startNode and endNode values
    console.log("Start Node:", startNode);
    console.log("End Node:", endNode);

    const dijkstra = new Dijkstra(graph);
    const shortestPath = dijkstra.findShortestPath(startNode, endNode);
    console.log('Shortest path:', shortestPath);



    for (let i = 0; i < shortestPath.length; i++) {
        console.log(shortestPath[i] = numberToLetter(shortestPath[i]));
    }

    var entry = []
    for (let i = 1; i < shortestPath.length; i++) {
        entry[i - 1] = sortString(shortestPath[i] + shortestPath[i - 1]);
    }
    console.log(entry)

    for (let i = 0; i < entry.length; i++) {
        document.getElementById(entry[i]).setAttribute("stroke", "red");
    }
    for (let i = 0; i < shortestPath.length; i++) {
        document.getElementById(shortestPath[i]).setAttribute("fill", "red");
    }

}





window.onload = promptUser;