/**
 * Generate a Barabási-Albert scale-free network
 * Simpler version for browser simulation
 */
export function generateNetwork(numNodes, initialInfected) {
  const nodes = [];
  const edges = [];
  
  // Create nodes - don't set x,y here, let D3 handle initial layout
  for (let i = 0; i < numNodes; i++) {
    nodes.push({
      id: i,
      state: 'S', // Start as Susceptible
    });
  }

  // Generate edges using a simple preferential attachment model
  // Start with a small complete graph
  const m = 2; // Number of edges to attach from new node
  
  // Create initial complete graph with m+1 nodes
  for (let i = 0; i <= m; i++) {
    for (let j = i + 1; j <= m; j++) {
      edges.push({ source: i, target: j });
    }
  }

  // Add remaining nodes with preferential attachment
  const degrees = new Array(numNodes).fill(0);
  
  // Count initial degrees
  edges.forEach(edge => {
    degrees[edge.source]++;
    degrees[edge.target]++;
  });

  for (let i = m + 1; i < numNodes; i++) {
    const targets = new Set();
    const totalDegree = degrees.reduce((sum, d) => sum + d, 0);
    
    while (targets.size < m && targets.size < i) {
      // Preferential attachment: probability proportional to degree
      let rand = Math.random() * totalDegree;
      let sum = 0;
      
      for (let j = 0; j < i; j++) {
        sum += degrees[j];
        if (rand <= sum && !targets.has(j)) {
          targets.add(j);
          break;
        }
      }
    }
    
    // Add edges
    targets.forEach(target => {
      edges.push({ source: i, target });
      degrees[i]++;
      degrees[target]++;
    });
  }

  // Set initial infected nodes (random selection)
  const infectedIndices = new Set();
  while (infectedIndices.size < Math.min(initialInfected, numNodes)) {
    infectedIndices.add(Math.floor(Math.random() * numNodes));
  }
  
  infectedIndices.forEach(idx => {
    nodes[idx].state = 'I';
  });

  // Calculate statistics
  const stats = calculateStats(nodes);

  return { nodes, edges, stats };
}

/**
 * Simulate one step of the SIR model
 */
export function simulateSIRStep(network, beta, gamma) {
  const { nodes, edges } = network;
  
  // Don't create new node objects - just modify the state property
  // This preserves D3's x, y, vx, vy and keeps edge references intact
  
  // Build adjacency list for quick neighbor lookup
  const neighbors = {};
  nodes.forEach(node => {
    neighbors[node.id] = [];
  });
  
  edges.forEach(edge => {
    const sourceId = typeof edge.source === 'object' ? edge.source.id : edge.source;
    const targetId = typeof edge.target === 'object' ? edge.target.id : edge.target;
    neighbors[sourceId].push(targetId);
    neighbors[targetId].push(sourceId);
  });

  // Process infections
  const newInfections = new Set();
  
  nodes.forEach(node => {
    if (node.state === 'I') {
      // Try to infect neighbors
      if (neighbors[node.id]) {
        neighbors[node.id].forEach(neighborId => {
          const neighbor = nodes.find(n => n.id === neighborId);
          if (neighbor && neighbor.state === 'S' && Math.random() < beta) {
            newInfections.add(neighborId);
          }
        });
      }
    }
  });

  // Apply new infections
  newInfections.forEach(id => {
    const node = nodes.find(n => n.id === id);
    if (node) node.state = 'I';
  });

  // Process recoveries
  nodes.forEach(node => {
    if (node.state === 'I' && Math.random() < gamma) {
      node.state = 'R';
    }
  });

  const stats = calculateStats(nodes);

  // Return the same network object with updated states
  return {
    nodes: nodes,
    edges: edges,
    stats
  };
}

/**
 * Calculate statistics for current state
 */
function calculateStats(nodes) {
  const stats = {
    susceptible: 0,
    infected: 0,
    recovered: 0
  };

  nodes.forEach(node => {
    if (node.state === 'S') stats.susceptible++;
    else if (node.state === 'I') stats.infected++;
    else if (node.state === 'R') stats.recovered++;
  });

  return stats;
}

/**
 * Vaccination Strategies
 */

// Random vaccination
export function selectRandomNodes(nodes, k) {
  const available = nodes.filter(n => n.state === 'S');
  const selected = [];
  const indices = new Set();
  
  while (selected.length < Math.min(k, available.length)) {
    const idx = Math.floor(Math.random() * available.length);
    if (!indices.has(idx)) {
      indices.add(idx);
      selected.push(available[idx].id);
    }
  }
  
  return selected;
}

// High-degree vaccination (target hubs)
export function selectHighDegreeNodes(nodes, edges, k) {
  // Calculate degree for each node
  const degrees = {};
  nodes.forEach(n => degrees[n.id] = 0);
  
  edges.forEach(edge => {
    const sourceId = typeof edge.source === 'object' ? edge.source.id : edge.source;
    const targetId = typeof edge.target === 'object' ? edge.target.id : edge.target;
    degrees[sourceId]++;
    degrees[targetId]++;
  });
  
  // Sort by degree and select top k susceptible nodes
  const available = nodes.filter(n => n.state === 'S');
  const sorted = available
    .map(n => ({ id: n.id, degree: degrees[n.id] }))
    .sort((a, b) => b.degree - a.degree);
  
  return sorted.slice(0, k).map(n => n.id);
}

// Betweenness centrality vaccination
export function selectBetweennessNodes(nodes, edges, k) {
  // Simplified betweenness calculation (approximate for performance)
  const betweenness = {};
  nodes.forEach(n => betweenness[n.id] = 0);
  
  // Build adjacency list
  const adj = {};
  nodes.forEach(n => adj[n.id] = []);
  edges.forEach(edge => {
    const sourceId = typeof edge.source === 'object' ? edge.source.id : edge.source;
    const targetId = typeof edge.target === 'object' ? edge.target.id : edge.target;
    adj[sourceId].push(targetId);
    adj[targetId].push(sourceId);
  });
  
  // Sample-based betweenness (for performance)
  const samples = Math.min(nodes.length, 20);
  for (let i = 0; i < samples; i++) {
    const source = nodes[Math.floor(Math.random() * nodes.length)].id;
    const distances = {};
    const paths = {};
    const queue = [source];
    
    nodes.forEach(n => {
      distances[n.id] = Infinity;
      paths[n.id] = 0;
    });
    distances[source] = 0;
    paths[source] = 1;
    
    // BFS
    while (queue.length > 0) {
      const u = queue.shift();
      adj[u].forEach(v => {
        if (distances[v] === Infinity) {
          distances[v] = distances[u] + 1;
          queue.push(v);
        }
        if (distances[v] === distances[u] + 1) {
          paths[v] += paths[u];
        }
      });
    }
    
    // Accumulate betweenness
    nodes.forEach(n => {
      if (n.id !== source && paths[n.id] > 0) {
        betweenness[n.id] += paths[n.id];
      }
    });
  }
  
  // Select top k
  const available = nodes.filter(n => n.state === 'S');
  const sorted = available
    .map(n => ({ id: n.id, betweenness: betweenness[n.id] }))
    .sort((a, b) => b.betweenness - a.betweenness);
  
  return sorted.slice(0, k).map(n => n.id);
}

// PageRank vaccination
export function selectPageRankNodes(nodes, edges, k) {
  const damping = 0.85;
  const iterations = 20;
  
  // Build adjacency
  const adj = {};
  const outDegree = {};
  nodes.forEach(n => {
    adj[n.id] = [];
    outDegree[n.id] = 0;
  });
  
  edges.forEach(edge => {
    const sourceId = typeof edge.source === 'object' ? edge.source.id : edge.source;
    const targetId = typeof edge.target === 'object' ? edge.target.id : edge.target;
    adj[sourceId].push(targetId);
    adj[targetId].push(sourceId);
    outDegree[sourceId]++;
    outDegree[targetId]++;
  });
  
  // Initialize PageRank
  let pagerank = {};
  nodes.forEach(n => pagerank[n.id] = 1.0 / nodes.length);
  
  // Power iteration
  for (let iter = 0; iter < iterations; iter++) {
    const newPagerank = {};
    nodes.forEach(n => newPagerank[n.id] = (1 - damping) / nodes.length);
    
    nodes.forEach(n => {
      if (outDegree[n.id] > 0) {
        const contribution = damping * pagerank[n.id] / outDegree[n.id];
        adj[n.id].forEach(neighbor => {
          newPagerank[neighbor] += contribution;
        });
      }
    });
    
    pagerank = newPagerank;
  }
  
  // Select top k
  const available = nodes.filter(n => n.state === 'S');
  const sorted = available
    .map(n => ({ id: n.id, pagerank: pagerank[n.id] }))
    .sort((a, b) => b.pagerank - a.pagerank);
  
  return sorted.slice(0, k).map(n => n.id);
}

/**
 * Apply vaccination to network
 */
export function vaccinateNodes(network, nodeIds) {
  nodeIds.forEach(id => {
    const node = network.nodes.find(n => n.id === id);
    if (node && node.state === 'S') {
      node.state = 'R'; // Vaccinated = Immune (Recovered state)
    }
  });
  
  const stats = calculateStats(network.nodes);
  return { ...network, stats };
}

/**
 * Reset simulation
 */
export function resetSimulation(network, initialInfected) {
  const newNodes = network.nodes.map(node => ({
    ...node,
    state: 'S'
  }));

  // Set initial infected
  const infectedIndices = new Set();
  while (infectedIndices.size < Math.min(initialInfected, newNodes.length)) {
    infectedIndices.add(Math.floor(Math.random() * newNodes.length));
  }
  
  infectedIndices.forEach(idx => {
    newNodes[idx].state = 'I';
  });

  const stats = calculateStats(newNodes);

  return {
    nodes: newNodes,
    edges: network.edges,
    stats
  };
}
