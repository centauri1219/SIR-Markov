import React, { useState, useEffect, useRef } from 'react';
import NetworkGraph from './components/NetworkGraph';
import Controls from './components/Controls';
import Statistics from './components/Statistics';
import { 
  generateNetwork, 
  simulateSIRStep, 
  selectRandomNodes,
  selectHighDegreeNodes,
  selectBetweennessNodes,
  selectPageRankNodes,
  vaccinateNodes
} from './utils/simulation';
import './App.css';

function App() {
  // Simulation parameters
  const [numNodes, setNumNodes] = useState(50);
  const [infectionProb, setInfectionProb] = useState(0.3);
  const [recoveryProb, setRecoveryProb] = useState(0.1);
  const [initialInfected, setInitialInfected] = useState(3);
  
  // Vaccination parameters
  const [vaccineCount, setVaccineCount] = useState(0);
  const [vaccineStrategy, setVaccineStrategy] = useState('none');
  
  // Simulation state
  const [network, setNetwork] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [history, setHistory] = useState([]);
  const [isVaccinated, setIsVaccinated] = useState(false);
  
  const intervalRef = useRef(null);

  // Initialize network
  useEffect(() => {
    const net = generateNetwork(numNodes, initialInfected);
    setNetwork(net);
    setHistory([{ ...net.stats }]);
    setStep(0);
  }, []);

  // Reset simulation
  const handleReset = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    const net = generateNetwork(numNodes, initialInfected);
    setNetwork(net);
    setHistory([{ ...net.stats }]);
    setStep(0);
    setIsVaccinated(false);
  };

  // Apply vaccination
  const handleVaccinate = () => {
    if (!network || vaccineCount === 0 || vaccineStrategy === 'none') return;
    
    let selectedNodes = [];
    
    switch (vaccineStrategy) {
      case 'random':
        selectedNodes = selectRandomNodes(network.nodes, vaccineCount);
        break;
      case 'degree':
        selectedNodes = selectHighDegreeNodes(network.nodes, network.edges, vaccineCount);
        break;
      case 'betweenness':
        selectedNodes = selectBetweennessNodes(network.nodes, network.edges, vaccineCount);
        break;
      case 'pagerank':
        selectedNodes = selectPageRankNodes(network.nodes, network.edges, vaccineCount);
        break;
      default:
        return;
    }
    
    const vaccinated = vaccinateNodes(network, selectedNodes);
    setNetwork(vaccinated);
    setHistory([{ ...vaccinated.stats }]);
    setIsVaccinated(true);
  };

  // Start/Pause simulation
  const toggleSimulation = () => {
    if (isRunning) {
      setIsRunning(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    } else {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setNetwork(prevNetwork => {
          if (!prevNetwork) return prevNetwork;
          
          const newNetwork = simulateSIRStep(prevNetwork, infectionProb, recoveryProb);
          
          // Stop if no more infected
          if (newNetwork.stats.infected === 0) {
            setIsRunning(false);
            clearInterval(intervalRef.current);
          }
          
          setHistory(prev => [...prev, { ...newNetwork.stats }]);
          setStep(s => s + 1);
          
          return newNetwork;
        });
      }, 500);
    }
  };

  // Step forward manually
  const handleStep = () => {
    if (!network) return;
    // Pass the current network to preserve node/edge references
    setNetwork(prevNetwork => {
      const newNetwork = simulateSIRStep(prevNetwork, infectionProb, recoveryProb);
      setHistory(prev => [...prev, { ...newNetwork.stats }]);
      setStep(s => s + 1);
      return newNetwork;
    });
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🦠 SIR Disease Spread Simulation</h1>
        <p>Interactive network-based epidemic modeling</p>
      </header>

      <div className="app-content">
        <div className="left-panel">
          <Controls
            numNodes={numNodes}
            setNumNodes={setNumNodes}
            infectionProb={infectionProb}
            setInfectionProb={setInfectionProb}
            recoveryProb={recoveryProb}
            setRecoveryProb={setRecoveryProb}
            initialInfected={initialInfected}
            setInitialInfected={setInitialInfected}
            vaccineCount={vaccineCount}
            setVaccineCount={setVaccineCount}
            vaccineStrategy={vaccineStrategy}
            setVaccineStrategy={setVaccineStrategy}
            isRunning={isRunning}
            isVaccinated={isVaccinated}
            onToggle={toggleSimulation}
            onReset={handleReset}
            onStep={handleStep}
            onVaccinate={handleVaccinate}
            disabled={network?.stats.infected === 0}
          />
          
          <Statistics
            step={step}
            stats={network?.stats}
            history={history}
          />
        </div>

        <div className="right-panel">
          <NetworkGraph network={network} />
        </div>
      </div>
    </div>
  );
}

export default App;
