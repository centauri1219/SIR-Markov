import networkx as nx
import matplotlib.pyplot as plt

# --- Step 1: Create a custom connected graph ---
# This graph is designed so that different algorithms select different nodes
G = nx.Graph()

# Create a graph with three distinct communities connected by bridges
# Community 1: Star pattern (A is hub)
edges = [
    ("A", "B"), ("A", "C"), ("A", "D"), ("A", "E"),
    # Community 2: Star pattern (F is hub)
    ("F", "G"), ("F", "H"), ("F", "I"), ("F", "J"),
    # Community 3: Chain
    ("K", "L"), ("L", "M"), ("M", "N"),
    # Bridge nodes connecting communities
    ("E", "O"),  # O connects community 1 to 2
    ("O", "G"),
    ("J", "P"),  # P connects community 2 to 3
    ("P", "K"),
]
G.add_edges_from(edges)

# --- Step 2: Compute centrality metrics ---
degree_centrality = nx.degree_centrality(G)
betweenness_centrality = nx.betweenness_centrality(G)
pagerank = nx.pagerank(G, alpha=0.85)

# --- Step 3: Identify top nodes (k = 3) ---
k = 3
top_degree = sorted(degree_centrality.items(), key=lambda x: x[1], reverse=True)[:k]
top_betweenness = sorted(betweenness_centrality.items(), key=lambda x: x[1], reverse=True)[:k]
top_pagerank = sorted(pagerank.items(), key=lambda x: x[1], reverse=True)[:k]

print("Top 3 nodes by Degree Centrality:", [(n, f"{v:.3f}") for n, v in top_degree])
print("Top 3 nodes by Betweenness Centrality:", [(n, f"{v:.3f}") for n, v in top_betweenness])
print("Top 3 nodes by PageRank:", [(n, f"{v:.3f}") for n, v in top_pagerank])

# Show which nodes are unique to each algorithm
degree_nodes = set([n for n, _ in top_degree])
betweenness_nodes = set([n for n, _ in top_betweenness])
pagerank_nodes = set([n for n, _ in top_pagerank])

print("\n--- Analysis ---")
print(f"Degree selects: {degree_nodes}")
print(f"Betweenness selects: {betweenness_nodes}")
print(f"PageRank selects: {pagerank_nodes}")
print(f"All same? {degree_nodes == betweenness_nodes == pagerank_nodes}")
print(f"Common nodes: {degree_nodes & betweenness_nodes & pagerank_nodes}")
print(f"Unique to Degree: {degree_nodes - betweenness_nodes - pagerank_nodes}")
print(f"Unique to Betweenness: {betweenness_nodes - degree_nodes - pagerank_nodes}")
print(f"Unique to PageRank: {pagerank_nodes - degree_nodes - betweenness_nodes}")

# --- Step 4: Common layout for all plots ---
pos = nx.spring_layout(G, seed=10)

# --- Step 5: Create subplots side by side ---
fig, axes = plt.subplots(1, 3, figsize=(15, 5))
titles = [
    "Top 3 by Degree Centrality",
    "Top 3 by Betweenness Centrality",
    "Top 3 by PageRank"
]
top_nodes_list = [top_degree, top_betweenness, top_pagerank]

for ax, title, top_nodes in zip(axes, titles, top_nodes_list):
    top_set = [n for n, _ in top_nodes]
    node_colors = ['red' if n in top_set else 'skyblue' for n in G.nodes()]
    nx.draw_networkx_nodes(G, pos, node_color=node_colors, node_size=700, ax=ax)
    nx.draw_networkx_edges(G, pos, edge_color='white', alpha=0.8, width=2, ax=ax)
    nx.draw_networkx_labels(G, pos, font_color="white", font_weight="bold", ax=ax)
    ax.set_title(title, color='white', fontsize=12, fontweight='bold')
    ax.axis("off")

# Set transparent background
fig.patch.set_alpha(0.0)
for ax in axes:
    ax.patch.set_alpha(0.0)

plt.tight_layout()

# Save as PNG with transparent background
plt.savefig('vaccination_strategies.png', 
            transparent=True, 
            bbox_inches='tight', 
            dpi=300,
            facecolor='none',
            edgecolor='none')
print("\n✅ Graph saved as 'vaccination_strategies.png' with transparent background")

plt.show()
