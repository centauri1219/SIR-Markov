# ===============================================
# 📘 Modeling Disease Spread and Vaccination Strategies
# using Graph Theory and Markov Chains + GIF Animation
# ===============================================



import numpy as np
import networkx as nx
import matplotlib.pyplot as plt
import random
from tqdm import tqdm
from collections import defaultdict
from matplotlib.animation import FuncAnimation, PillowWriter

# ---------------------------
# 1️⃣ Graph generation
# ---------------------------

def generate_graph(graph_type="ba", n=60, p=0.05, m=2, seed=42):
    """
    Generate different types of graphs:
    - 'er': Erdos–Renyi
    - 'ba': Barabasi–Albert
    - 'ws': Watts–Strogatz
    """
    random.seed(seed)
    np.random.seed(seed)
    if graph_type == "er":
        G = nx.erdos_renyi_graph(n, p, seed=seed)
    elif graph_type == "ba":
        G = nx.barabasi_albert_graph(n, m, seed=seed)
    elif graph_type == "ws":
        G = nx.watts_strogatz_graph(n, k=4, p=0.2, seed=seed)
    else:
        raise ValueError("Invalid graph_type. Choose from ['er', 'ba', 'ws']")
    G.remove_nodes_from(list(nx.isolates(G)))
    return G


# ---------------------------
# 2️⃣ Spectral radius utility
# ---------------------------

def spectral_radius(G):
    A = nx.to_numpy_array(G)
    vals = np.linalg.eigvals(A)
    return max(np.real(vals))


# ---------------------------
# 3️⃣ SIR simulation (stochastic)
# ---------------------------

def simulate_SIR(G, beta=0.3, gamma=0.1, initial_infected=None, max_steps=1000):
    """
    Simulate the SIR model (Susceptible-Infected-Recovered)
    on graph G with given infection and recovery probabilities.
    """
    state = {i: 'S' for i in G.nodes()}
    if initial_infected is None:
        initial_infected = [random.choice(list(G.nodes()))]
    for i in initial_infected:
        state[i] = 'I'

    infected_set = set(initial_infected)
    recovered = set()
    history = [state.copy()]
    step = 0

    while infected_set and step < max_steps:
        new_infected = set()
        new_recovered = set()

        for u in infected_set:
            for v in G.neighbors(u):
                if state[v] == 'S' and random.random() < beta:
                    new_infected.add(v)
            if random.random() < gamma:
                new_recovered.add(u)

        for v in new_infected:
            state[v] = 'I'
        for u in new_recovered:
            state[u] = 'R'
            infected_set.discard(u)
            recovered.add(u)

        infected_set.update(new_infected)
        history.append(state.copy())
        step += 1

    final_size = len([x for x in state.values() if x == 'R'])
    return final_size / len(G), history


# ---------------------------
# 4️⃣ Vaccination strategies
# ---------------------------

def vaccinate_nodes(G, nodes_to_remove):
    Gv = G.copy()
    Gv.remove_nodes_from(nodes_to_remove)
    Gv.remove_nodes_from(list(nx.isolates(Gv)))
    return Gv

def strategy_random(G, k):
    return random.sample(list(G.nodes()), min(k, len(G)))

def strategy_high_degree(G, k):
    return [node for node, _ in sorted(G.degree, key=lambda x: x[1], reverse=True)[:k]]

def strategy_betweenness(G, k):
    bw = nx.betweenness_centrality(G)
    return [node for node, _ in sorted(bw.items(), key=lambda x: x[1], reverse=True)[:k]]

def strategy_pagerank(G, k):
    pr = nx.pagerank(G)
    return [node for node, _ in sorted(pr.items(), key=lambda x: x[1], reverse=True)[:k]]


# ---------------------------
# 5️⃣ Run vaccination experiments
# ---------------------------

def run_experiment(G, beta=0.3, gamma=0.1, k_values=None, trials=20):
    if k_values is None:
        k_values = [0, 2, 4, 6, 8, 10]

    strategies = {
        "Random": strategy_random,
        "High-Degree": strategy_high_degree,
        "Betweenness": strategy_betweenness,
        "PageRank": strategy_pagerank,
    }

    results = defaultdict(list)
    spectral_values = defaultdict(list)

    for k in tqdm(k_values, desc="Vaccination levels"):
        for name, func in strategies.items():
            removed = func(G, k)
            Gv = vaccinate_nodes(G, removed)
            rho = spectral_radius(Gv)
            spectral_values[name].append(rho)

            total = 0
            for _ in range(trials):
                final_size, _ = simulate_SIR(Gv, beta, gamma)
                total += final_size
            avg_infected = total / trials
            results[name].append(avg_infected)
    return results, spectral_values


# ---------------------------
# 6️⃣ Plot results
# ---------------------------

def plot_results(k_values, results, spectral_values, G, beta, gamma):
    plt.figure(figsize=(8, 5))
    for strategy, values in results.items():
        plt.plot(k_values, values, marker='o', label=strategy)
    plt.xlabel("Number of Vaccinated Nodes (k)")
    plt.ylabel("Average Final Infected Fraction")
    plt.title(f"Vaccination Strategy Comparison (β={beta}, γ={gamma})")
    plt.legend()
    plt.grid(True)
    plt.show()

    plt.figure(figsize=(8, 5))
    for strategy, values in spectral_values.items():
        plt.plot(k_values, values, marker='s', label=strategy)
    plt.xlabel("Number of Vaccinated Nodes (k)")
    plt.ylabel("Spectral Radius λ_max(A')")
    plt.title("Spectral Radius vs Vaccination (Lower = Better)")
    plt.legend()
    plt.grid(True)
    plt.show()

    rho0 = spectral_radius(G)
    R_eff = beta * rho0 / gamma
    print(f"\nBase spectral radius λ_max(A): {rho0:.3f}")
    print(f"Effective reproduction number 𝓡_eff = βλ_max/γ = {R_eff:.2f}")


# ---------------------------
# 7️⃣ Animate SIR spread & save as GIF
# ---------------------------

def animate_SIR(G, history, save_path="sir_simulation.gif", interval_ms=400):
    """
    Create an animation of the SIR spread and save it as a GIF.
    """
    pos = nx.spring_layout(G, seed=42)
    fig, ax = plt.subplots(figsize=(6, 6))

    def update(frame):
        ax.clear()
        states = history[frame]
        colors = [
            "red" if states[n] == 'I' else "green" if states[n] == 'R' else "blue"
            for n in G.nodes()
        ]
        nx.draw(G, pos, node_color=colors, node_size=80, with_labels=False, ax=ax)
        ax.set_title(f"SIR Simulation – Step {frame+1}/{len(history)}", fontsize=12)

    anim = FuncAnimation(fig, update, frames=len(history), interval=interval_ms, repeat=False)

    # ✅ Save GIF using PillowWriter
    writer = PillowWriter(fps=2)
    anim.save(save_path, writer=writer)
    print(f"✅ Animation saved as {save_path}")
    plt.close(fig)
    return anim


# ---------------------------
# 8️⃣ Main execution
# ---------------------------

if __name__ == "__main__":
    n = 60 
    beta = 0.3
    gamma = 0.1
    k_values = [0, 2, 4, 6, 8, 10]

    print("Generating graph...")
    G = generate_graph("ba", n=n, m=2)
    print(f"Nodes: {len(G.nodes())}, Edges: {len(G.edges())}")

    print("Running experiments... (this might take a few minutes)")
    results, spectral_values = run_experiment(G, beta, gamma, k_values, trials=10)

    print("Plotting results...")
    plot_results(k_values, results, spectral_values, G, beta, gamma)

    # 🧩 Visualize infection spread for one run
    print("Simulating infection spread for animation...")
    _, history = simulate_SIR(G, beta, gamma)
    animate_SIR(G, history, save_path="sir_simulation.gif", interval_ms=400)

    # Optional: show graph structure
    plt.figure(figsize=(6, 6))
    nx.draw(G, node_size=80, with_labels=False)
    plt.title("Network Graph G")
    plt.show()