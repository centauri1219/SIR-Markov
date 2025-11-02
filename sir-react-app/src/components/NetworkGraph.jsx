import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './NetworkGraph.css';

function NetworkGraph({ network }) {
  const svgRef = useRef(null);
  const simulationRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!network) return;

    const width = 800;
    const height = 600;

    // Clear and setup SVG on first render or reset
    const svg = d3.select(svgRef.current);
    
    // Check if this is a fresh network (no positions set yet)
    const isNewNetwork = network.nodes.every(n => !n.x && !n.y);
    
    if (isNewNetwork || !simulationRef.current) {
      // Clear everything for a new network
      svg.selectAll('*').remove();
      svg.attr('width', width)
         .attr('height', height)
         .attr('viewBox', [0, 0, width, height]);

      // Stop old simulation if exists
      if (simulationRef.current) {
        simulationRef.current.stop();
      }

      // Initialize positions
      network.nodes.forEach(node => {
        node.x = width / 2 + (Math.random() - 0.5) * 100;
        node.y = height / 2 + (Math.random() - 0.5) * 100;
      });

      // Create new force simulation
      const simulation = d3.forceSimulation(network.nodes)
        .force('link', d3.forceLink(network.edges).id(d => d.id).distance(50))
        .force('charge', d3.forceManyBody().strength(-200))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(15));

      simulationRef.current = simulation;

      // Draw edges
      const link = svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(network.edges)
        .join('line')
        .attr('stroke', '#999')
        .attr('stroke-opacity', 0.3)
        .attr('stroke-width', 1.5);

      // Draw nodes
      const node = svg.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(network.nodes)
        .join('circle')
        .attr('r', 8)
        .attr('fill', d => {
          if (d.state === 'S') return '#4285f4';
          if (d.state === 'I') return '#ea4335';
          if (d.state === 'R') return '#34a853';
        })
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .call(drag(simulation));

      // Add tooltips
      node.append('title')
        .text(d => `Node ${d.id}\nState: ${d.state === 'S' ? 'Susceptible' : d.state === 'I' ? 'Infected' : 'Recovered'}`);

      // Update positions on tick
      simulation.on('tick', () => {
        link
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);

        node
          .attr('cx', d => d.x)
          .attr('cy', d => d.y);
      });
      
      isFirstRender.current = false;
    } else {
      // Just update node colors for existing network
      svg.select('g.nodes')
        .selectAll('circle')
        .attr('fill', d => {
          if (d.state === 'S') return '#4285f4';
          if (d.state === 'I') return '#ea4335';
          if (d.state === 'R') return '#34a853';
        })
        .select('title')
        .text(d => `Node ${d.id}\nState: ${d.state === 'S' ? 'Susceptible' : d.state === 'I' ? 'Infected' : 'Recovered'}`);
    }

    return () => {
      // Don't stop simulation on cleanup
    };
  }, [network]);

  // Drag behavior
  function drag(simulation) {
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
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

    return d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);
  }

  return (
    <div className="network-graph">
      <h2>🌐 Network Visualization</h2>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default NetworkGraph;
