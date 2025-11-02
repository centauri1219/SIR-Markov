# 🦠 SIR Disease Spread Simulation - React App

An interactive web application for simulating disease spread through social networks using the SIR (Susceptible-Infected-Recovered) epidemiological model.

## Features

- **Interactive Controls**: Adjust simulation parameters in real-time
  - Number of people in the network
  - Infection probability (β)
  - Recovery probability (γ)
  - Initially infected individuals

- **Network Visualization**: 
  - Interactive force-directed graph showing the social network
  - Color-coded nodes (Blue=Susceptible, Red=Infected, Green=Recovered)
  - Draggable nodes for better visualization

- **Live Statistics**:
  - Real-time counts and percentages
  - Timeline chart showing S, I, R populations over time
  - Step-by-step or continuous simulation

## Installation

1. Navigate to the project directory:
   ```bash
   cd sir-react-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## How to Use

1. **Adjust Parameters**: Use the sliders to set:
   - Number of people (10-100)
   - Infection probability (0-1)
   - Recovery probability (0-1)
   - Initially infected people

2. **Control Simulation**:
   - Click **Play** to run the simulation automatically
   - Click **Step** to advance one time step
   - Click **Reset** to start over with new parameters

3. **Interact with Graph**:
   - Drag nodes to rearrange the network
   - Hover over nodes to see their state
   - Watch the disease spread in real-time

## Technology Stack

- **React** - UI framework
- **Vite** - Build tool
- **D3.js** - Data visualization and force simulation
- **CSS3** - Styling with gradients and animations

## How It Works

The simulation implements a stochastic SIR model on a Barabási-Albert scale-free network:

1. **Network Generation**: Creates a realistic social network where some individuals have many more connections than others
2. **Disease Spread**: At each step, infected individuals can transmit to susceptible neighbors with probability β
3. **Recovery**: Infected individuals recover with probability γ and become immune

## License

MIT License - Feel free to use and modify!
