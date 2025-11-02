import React from 'react';
import './Controls.css';

function Controls({
  numNodes,
  setNumNodes,
  infectionProb,
  setInfectionProb,
  recoveryProb,
  setRecoveryProb,
  initialInfected,
  setInitialInfected,
  vaccineCount,
  setVaccineCount,
  vaccineStrategy,
  setVaccineStrategy,
  isRunning,
  isVaccinated,
  onToggle,
  onReset,
  onStep,
  onVaccinate,
  disabled
}) {
  return (
    <div className="controls-panel">
      <h2>⚙️ Simulation Controls</h2>

      <div className="control-group">
        <label>
          Number of People: <strong>{numNodes}</strong>
        </label>
        <input
          type="range"
          min="10"
          max="100"
          value={numNodes}
          onChange={(e) => setNumNodes(Number(e.target.value))}
          disabled={isRunning}
        />
      </div>

      <div className="control-group">
        <label>
          Infection Probability (β): <strong>{infectionProb.toFixed(2)}</strong>
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={infectionProb}
          onChange={(e) => setInfectionProb(Number(e.target.value))}
        />
      </div>

      <div className="control-group">
        <label>
          Recovery Probability (γ): <strong>{recoveryProb.toFixed(2)}</strong>
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={recoveryProb}
          onChange={(e) => setRecoveryProb(Number(e.target.value))}
        />
      </div>

      <div className="control-group">
        <label>
          Initially Infected: <strong>{initialInfected}</strong>
        </label>
        <input
          type="range"
          min="1"
          max={Math.min(20, numNodes)}
          value={initialInfected}
          onChange={(e) => setInitialInfected(Number(e.target.value))}
          disabled={isRunning || isVaccinated}
        />
      </div>

      <div className="vaccination-section">
        <h3>💉 Vaccination Strategy</h3>
        
        <div className="control-group">
          <label>
            Vaccine Doses: <strong>{vaccineCount}</strong>
          </label>
          <input
            type="range"
            min="0"
            max={Math.min(30, numNodes)}
            value={vaccineCount}
            onChange={(e) => setVaccineCount(Number(e.target.value))}
            disabled={isRunning || isVaccinated}
          />
        </div>

        <div className="control-group">
          <label>Strategy:</label>
          <select 
            value={vaccineStrategy} 
            onChange={(e) => setVaccineStrategy(e.target.value)}
            disabled={isRunning || isVaccinated}
            className="strategy-select"
          >
            <option value="none">No Vaccination</option>
            <option value="random">🎲 Random</option>
            <option value="degree">🌟 High-Degree (Hubs)</option>
            <option value="betweenness">🌉 Betweenness (Bridges)</option>
            <option value="pagerank">📊 PageRank</option>
          </select>
        </div>

        <button
          className="btn btn-vaccinate"
          onClick={onVaccinate}
          disabled={isRunning || isVaccinated || vaccineCount === 0 || vaccineStrategy === 'none'}
        >
          {isVaccinated ? '✓ Vaccinated' : '💉 Apply Vaccination'}
        </button>
      </div>

      <div className="button-group">
        <button
          className={`btn ${isRunning ? 'btn-pause' : 'btn-play'}`}
          onClick={onToggle}
          disabled={disabled && !isRunning}
        >
          {isRunning ? '⏸ Pause' : '▶ Play'}
        </button>
        
        <button
          className="btn btn-step"
          onClick={onStep}
          disabled={isRunning || disabled}
        >
          ⏭ Step
        </button>
        
        <button
          className="btn btn-reset"
          onClick={onReset}
        >
          🔄 Reset
        </button>
      </div>

      <div className="legend">
        <h3>Legend</h3>
        <div className="legend-item">
          <span className="color-box susceptible"></span>
          <span>Susceptible (S)</span>
        </div>
        <div className="legend-item">
          <span className="color-box infected"></span>
          <span>Infected (I)</span>
        </div>
        <div className="legend-item">
          <span className="color-box recovered"></span>
          <span>Recovered / Vaccinated (R)</span>
        </div>
      </div>
    </div>
  );
}

export default Controls;
