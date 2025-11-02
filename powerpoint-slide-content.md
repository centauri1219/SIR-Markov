# PowerPoint Slide Content
## Copy this content into PowerPoint

---

## SLIDE 1: Title Slide
**Title:**
# SIR Disease Spread Simulation
## Network-Based Epidemic Modeling

**Subtitle:**
Using Graph Theory and Stochastic Processes

**Your Name**
**Date**

**Design suggestion:** 
- Background: Gradient blue/purple
- Add icon: 🦠 or network diagram graphic

---

## SLIDE 2: The SIR Model
**Title:** What is the SIR Model?

**Content:**
### Three States:

🔵 **S = Susceptible**
- Healthy individuals
- Can catch the disease
- Start state for most people

🔴 **I = Infected**
- Currently sick
- Can transmit to others
- Contagious period

🟢 **R = Recovered**
- Gained immunity
- Cannot be reinfected
- Removed from transmission

**Flow Diagram:**
```
S  →  I  →  R
   β     γ
```

---

## SLIDE 3: The Mathematics
**Title:** Mathematical Framework

**Content:**

### Key Parameters:

**β (Beta) - Infection Rate**
- Probability of transmission per contact
- Range: 0 to 1
- Example: β = 0.3 means 30% chance per contact

**γ (Gamma) - Recovery Rate**
- Probability of recovery per time step
- Range: 0 to 1
- Example: γ = 0.1 means 10% recover each step

### Critical Equation:

$$R_{eff} = \frac{\beta \times \lambda_{max}}{\gamma}$$

Where:
- **R_eff** = Effective reproduction number
- **λ_max** = Spectral radius (largest eigenvalue of adjacency matrix)

### Epidemic Threshold:
- **R_eff > 1** → Epidemic spreads 📈
- **R_eff < 1** → Disease dies out 📉

---

## SLIDE 4: Network-Based Approach
**Title:** Why Networks Matter

**Content:**

### Traditional Model:
❌ Assumes uniform mixing (everyone interacts equally)
❌ Unrealistic for real populations

### Network Model:
✅ **Nodes** = People
✅ **Edges** = Social connections
✅ Disease spreads along connections

### Barabási-Albert Networks:
- **Scale-free** distribution
- Few **hubs** (many connections)
- Most nodes have **few connections**
- Mirrors real social networks

**Visual:** Include a small network diagram showing:
- Dense central cluster (hubs)
- Sparse peripheral nodes

### Spectral Radius (λ_max):
- Measures network connectivity
- Higher → Disease spreads faster
- Removing hubs → Reduces λ_max dramatically

---

## SLIDE 5: Vaccination Strategies
**Title:** Optimizing Limited Vaccine Distribution

**Content:**

### The Challenge:
Limited vaccine doses → Who to vaccinate?

### Four Strategies Compared:

**1. 🎲 Random**
- Baseline strategy
- No targeting
- Inefficient

**2. 🌟 High-Degree**
- Target nodes with most connections
- Removes "super-spreaders"
- Very effective

**3. 🌉 Betweenness Centrality**
- Target nodes bridging communities
- Breaks transmission chains
- Prevents spread between groups

**4. 📊 PageRank**
- Google's algorithm adapted
- Finds influential spreaders
- Considers connection quality

### Results:
**Targeted strategies prevent 2-3× more infections!**

**Graph suggestion:** Bar chart showing:
- X-axis: Strategy
- Y-axis: Average infections
- Show random highest, targeted strategies much lower

---

## SLIDE 6: Key Takeaways
**Title:** What We Learned

**Content:**

### ✓ Mathematical Insight
The SIR model predicts epidemic dynamics using probability and network theory

### ✓ Network Structure Matters
Disease spreads along connections - topology determines outcomes

### ✓ Spectral Radius is Key
λ_max predicts epidemic potential better than average degree

### ✓ Smart Interventions Work
Network-based vaccination is 2-3× more effective than random

### 📌 Real-World Applications:
- COVID-19 vaccination strategies
- Influenza outbreak control
- Information/misinformation spread
- Computer virus propagation

**Call to Action:**
**"Network science saves lives!"**

---

## DESIGN RECOMMENDATIONS:

### Color Scheme:
- **Primary:** #667eea (Purple-blue)
- **Accent:** #764ba2 (Purple)
- **Susceptible:** #4285f4 (Blue)
- **Infected:** #ea4335 (Red)
- **Recovered:** #34a853 (Green)

### Fonts:
- **Headings:** Bold, sans-serif (Arial, Calibri, Helvetica)
- **Body:** Regular sans-serif
- **Code/Math:** Monospace (Courier New, Consolas)

### Visual Elements:
- Use icons and emojis for visual interest
- Include network diagrams on slides 4-5
- Add bar chart on slide 5
- Keep text concise - use bullet points
- Use animations sparingly (fade-in for bullets)

### Layout:
- Title on each slide
- Max 5-6 bullet points per slide
- Use white space
- Consistent footer with slide numbers
