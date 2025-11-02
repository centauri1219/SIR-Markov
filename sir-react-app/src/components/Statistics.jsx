import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './Statistics.css';

function Statistics({ step, stats, history }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!history || history.length === 0) return;

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 360 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    // Clear previous chart
    d3.select(chartRef.current).selectAll('*').remove();

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const x = d3.scaleLinear()
      .domain([0, history.length - 1])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(history, d => d.susceptible + d.infected + d.recovered)])
      .range([height, 0]);

    // Line generators
    const lineSusceptible = d3.line()
      .x((d, i) => x(i))
      .y(d => y(d.susceptible));

    const lineInfected = d3.line()
      .x((d, i) => x(i))
      .y(d => y(d.infected));

    const lineRecovered = d3.line()
      .x((d, i) => x(i))
      .y(d => y(d.recovered));

    // Add axes
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5))
      .style('color', '#999');

    svg.append('g')
      .call(d3.axisLeft(y).ticks(5))
      .style('color', '#999');

    // Add lines
    svg.append('path')
      .datum(history)
      .attr('fill', 'none')
      .attr('stroke', '#4285f4')
      .attr('stroke-width', 2)
      .attr('d', lineSusceptible);

    svg.append('path')
      .datum(history)
      .attr('fill', 'none')
      .attr('stroke', '#ea4335')
      .attr('stroke-width', 2)
      .attr('d', lineInfected);

    svg.append('path')
      .datum(history)
      .attr('fill', 'none')
      .attr('stroke', '#34a853')
      .attr('stroke-width', 2)
      .attr('d', lineRecovered);

  }, [history]);

  if (!stats) return null;

  const total = stats.susceptible + stats.infected + stats.recovered;
  const susceptiblePercent = ((stats.susceptible / total) * 100).toFixed(1);
  const infectedPercent = ((stats.infected / total) * 100).toFixed(1);
  const recoveredPercent = ((stats.recovered / total) * 100).toFixed(1);

  return (
    <div className="statistics-panel">
      <h2>📊 Statistics</h2>
      
      <div className="stat-item">
        <span className="stat-label">Step:</span>
        <span className="stat-value">{step}</span>
      </div>

      <div className="stat-grid">
        <div className="stat-card susceptible-card">
          <div className="stat-number">{stats.susceptible}</div>
          <div className="stat-percent">{susceptiblePercent}%</div>
          <div className="stat-title">Susceptible</div>
        </div>

        <div className="stat-card infected-card">
          <div className="stat-number">{stats.infected}</div>
          <div className="stat-percent">{infectedPercent}%</div>
          <div className="stat-title">Infected</div>
        </div>

        <div className="stat-card recovered-card">
          <div className="stat-number">{stats.recovered}</div>
          <div className="stat-percent">{recoveredPercent}%</div>
          <div className="stat-title">Recovered</div>
        </div>
      </div>

      <div className="chart-container">
        <h3>Timeline</h3>
        <div ref={chartRef}></div>
      </div>
    </div>
  );
}

export default Statistics;
