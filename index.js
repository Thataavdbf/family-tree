
const Graph = require('graphology');
const { dijkstra } = require('graphology-shortest-path');

const louvain = require('graphology-communities-louvain');
const metrics = require('graphology-metrics');

class ConnectionFinder {
  constructor() {
    this.graph = new Graph();
    this.timestamps = new Map();
  }

  // Add nodes and their properties
  addNode(id, properties) {
    if (!this.graph.hasNode(id)) {
      this.graph.addNode(id, properties);
    }
  }

  // Add relationships between nodes with weights
  addRelationship(source, target, weight = 1) {
    if (!this.graph.hasEdge(source, target)) {
      this.graph.addEdge(source, target, { weight });
    }
  }

  // Find shortest path between two nodes
  findShortestPath(start, end) {
    return dijkstra.findPath(this.graph, start, end);
  }

  // Find common neighbors between nodes
  findCommonConnections(node1, node2) {
    const neighbors1 = this.graph.neighbors(node1);
    const neighbors2 = this.graph.neighbors(node2);
    return neighbors1.filter(n => neighbors2.includes(n));
  }

  // Find nodes with similar properties
  findSimilarNodes(nodeId, threshold = 0.5) {
    const nodeProps = this.graph.getNodeAttributes(nodeId);
    const similar = [];
    
    this.graph.forEachNode((node) => {
      if (node === nodeId) return;
      
      const currentProps = this.graph.getNodeAttributes(node);
      const similarity = this.calculateSimilarity(nodeProps, currentProps);
      
      if (similarity >= threshold) {
        similar.push({ node, similarity });
      }
    });

    return similar.sort((a, b) => b.similarity - a.similarity);
  }

  // Simple Jaccard similarity implementation
  calculateSimilarity(props1, props2) {
    const keys1 = Object.keys(props1);
    const keys2 = Object.keys(props2);
    const intersection = keys1.filter(k => keys2.includes(k) && props1[k] === props2[k]);
    const union = new Set([...keys1, ...keys2]);
    return intersection.length / union.size;
  }

  // Detect communities using Louvain algorithm
  detectCommunities() {
    return louvain(this.graph);
  }

  // Calculate node centrality
  calculateCentrality(type = 'degree') {
    switch(type) {
      case 'degree':
        return metrics.degree(this.graph);
      case 'betweenness':
        return metrics.betweenness(this.graph);
      case 'closeness':
        return metrics.closeness(this.graph);
      default:
        throw new Error('Unsupported centrality type');
    }
  }

  // Add temporal data to relationships
  addTimedRelationship(source, target, weight = 1, timestamp = Date.now()) {
    this.addRelationship(source, target, weight);
    this.timestamps.set(`${source}-${target}`, timestamp);
  }

  // Get temporal path analysis
  getTemporalPath(start, end) {
    const path = this.findShortestPath(start, end);
    if (!path) return null;
    
    const temporalData = [];
    for (let i = 0; i < path.length - 1; i++) {
      const timestamp = this.timestamps.get(`${path[i]}-${path[i + 1]}`);
      temporalData.push({
        from: path[i],
        to: path[i + 1],
        timestamp: timestamp
      });
    }
    return temporalData;
  }

  // Get node influence score
  getInfluenceScore(nodeId) {
    const centrality = this.calculateCentrality('degree');
    const communities = this.detectCommunities();
    const nodeCommunity = communities[nodeId];
    
    let communityInfluence = 0;
    this.graph.forEachNode(node => {
      if (communities[node] === nodeCommunity) {
        communityInfluence += centrality[node];
      }
    });
    
    return {
      centralityScore: centrality[nodeId],
      communityInfluence: communityInfluence
    };
  }
}

// Example usage
const finder = new ConnectionFinder();

// Add sample data
finder.addNode('person1', { name: 'Alice', interests: ['tech', 'art'] });
finder.addNode('person2', { name: 'Bob', interests: ['tech', 'music'] });
finder.addNode('person3', { name: 'Charlie', interests: ['art', 'music'] });
finder.addNode('person4', { name: 'David', interests: ['tech', 'music'] });
finder.addNode('person5', { name: 'Eve', interests: ['art', 'tech'] });

// Add relationships with timestamps
finder.addTimedRelationship('person1', 'person2', 0.5);
finder.addTimedRelationship('person2', 'person3', 0.3);
finder.addTimedRelationship('person1', 'person3', 0.7);
finder.addTimedRelationship('person3', 'person4', 0.4);
finder.addTimedRelationship('person4', 'person5', 0.6);

// Analyze network
console.log('Communities:', finder.detectCommunities());
console.log('Centrality Scores:', finder.calculateCentrality('degree'));
console.log('Temporal Path:', finder.getTemporalPath('person1', 'person5'));
console.log('Influence Score (person3):', finder.getInfluenceScore('person3'));
