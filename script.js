let graph = {};

function createGraph() {
    graph = {};
    const vertices = document.getElementById('vertices').value.split(',');
    const edges = document.getElementById('edges').value.split(',');

    vertices.forEach(vertex => {
        graph[vertex.trim()] = [];
    });

    edges.forEach(edge => {
        const [v1, v2] = edge.split('-').map(v => v.trim());
        if (graph[v1] && graph[v2]) {
            graph[v1].push(v2);
            graph[v2].push(v1);
        }
    });

    displayGraph();
}

function displayGraph() {
    const graphDiv = document.getElementById('graph');
    graphDiv.innerHTML = '';

    for (const vertex in graph) {
        const neighbors = graph[vertex].join(', ');
        graphDiv.innerHTML += `<p>${vertex}: [${neighbors}]</p>`;
    }
}

function checkAdjacency() {
    const vertex1 = document.getElementById('vertex1').value.trim();
    const vertex2 = document.getElementById('vertex2').value.trim();

    const resultDiv = document.getElementById('adjacencyResult');
    if (graph[vertex1] && graph[vertex1].includes(vertex2)) {
        resultDiv.textContent = `${vertex1} e ${vertex2} são adjacentes.`;
    } else {
        resultDiv.textContent = `${vertex1} e ${vertex2} não são adjacentes.`;
    }
}

function getVertexDegree() {
    const vertex = document.getElementById('vertexDegree').value.trim();
    const resultDiv = document.getElementById('vertexDegreeResult');
    
    if (graph[vertex]) {
        resultDiv.textContent = `O grau de ${vertex} é ${graph[vertex].length}.`;
    } else {
        resultDiv.textContent = `O vértice ${vertex} não existe no grafo.`;
    }
}

function getGraphDegrees() {
    let maxDegree = -Infinity;
    let minDegree = Infinity;

    for (const vertex in graph) {
        const degree = graph[vertex].length;
        if (degree > maxDegree) maxDegree = degree;
        if (degree < minDegree) minDegree = degree;
    }

    const resultDiv = document.getElementById('graphDegreesResult');
    resultDiv.innerHTML = `<p>Grau Máximo: ${maxDegree}</p>`;
    resultDiv.innerHTML += `<p>Grau Mínimo: ${minDegree}</p>`;
}
