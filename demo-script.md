# Interactive Demo Script (2-3 minutes)

## SETUP (Before presenting)
- Open the React app in browser (localhost:5173)
- Set parameters to:
  - Number of People: 50
  - Infection Probability: 0.3
  - Recovery Probability: 0.1
  - Initially Infected: 3
- Have the simulation ready but NOT started

---

## DEMO WALKTHROUGH

### PART 1: Introduction (20 seconds)
**[Show the initial state with blue and red nodes]**

**Say:**
"Now let me demonstrate this with an interactive simulation. Here we have a network of 50 people. Each circle represents a person, and the lines show their social connections. 

Blue nodes are susceptible - healthy people who can get sick. Red nodes are infected - currently only 3 people. And green will be recovered individuals who've gained immunity."

**Action:** Point to the network visualization and legend.

---

### PART 2: Controls Explanation (20 seconds)
**[Highlight the control panel]**

**Say:**
"We can control several parameters in real-time:
- The infection probability beta is currently 30% - meaning each contact has a 30% chance of transmission
- Recovery probability gamma is 10% per time step
- And we started with 3 infected individuals in this population of 50"

**Action:** Hover over or point to each slider as you mention it.

---

### PART 3: Run the Simulation (60 seconds)
**[Click PLAY button]**

**Say:**
"Let's watch the disease spread. I'll hit play..."

**[Watch for 5-7 seconds as infection spreads]**

"Notice how the infection spreads along the network connections - only neighbors of infected individuals can catch it. See the red nodes appearing where blue nodes are connected to infected individuals.

**[Point to the statistics panel]**

The statistics show the counts in real-time. We started with 47 susceptible and 3 infected. Now watch as infected individuals recover and turn green...

**[Watch until some recovery happens - around 10-15 seconds total]**

**Action:** Pause the simulation

"Notice the infection follows the network structure - it spreads faster through highly connected individuals. The timeline graph shows how all three populations change over time."

---

### PART 4: Parameter Adjustment (30 seconds)
**[Click RESET, then adjust infection probability]**

**Say:**
"Let me demonstrate the impact of changing parameters. I'll reset and increase the infection probability to 80%..."

**Action:** 
- Click RESET
- Drag infection probability to 0.8
- Click PLAY

**Say:**
"With higher transmission, watch how much faster the disease spreads! Nearly everyone gets infected quickly. This shows why interventions like masks and social distancing that reduce beta are so effective."

**[Let it run for 5-10 seconds]**

---

### PART 5: Network Effects (20 seconds)
**[Reset and increase number of people or point out network features]**

**Say:**
"The network structure itself matters too. Notice some nodes have many connections - these are 'super-spreaders.' If we vaccinate these highly-connected individuals, we can break transmission chains and protect the entire network."

**Action:** Point to a highly connected node in the center.

---

### PART 6: Conclusion (10 seconds)
**[Pause or stop simulation]**

**Say:**
"This visualization shows how mathematical models combined with network science help us understand epidemic dynamics and design better public health interventions. Questions?"

---

## TIMING BREAKDOWN:
- Part 1 (Intro): 20 sec
- Part 2 (Controls): 20 sec
- Part 3 (Run Simulation): 60 sec
- Part 4 (Parameter Change): 30 sec
- Part 5 (Network Effects): 20 sec
- Part 6 (Conclusion): 10 sec
**Total: 2 minutes 40 seconds**

---

## PRO TIPS:

### If you have EXTRA time:
- Show the difference between low infection probability (0.1) vs high (0.8)
- Demonstrate the Step button to go frame-by-frame
- Point out specific infection paths in the network

### If you're RUNNING SHORT on time:
- Skip Part 4 (parameter adjustment)
- Keep Part 3 shorter (30 seconds instead of 60)
- Combine Parts 5 and 6

### Technical Tips:
1. **Practice the demo beforehand** - know where nodes will spread
2. **Don't let simulation run too long** - pause at interesting moments
3. **Keep your mouse movements deliberate** - don't wave around
4. **Narrate what's happening** - don't just let it run silently
5. **Have a backup** - if simulation freezes, have slides ready

### Key Phrases to Use:
- "Notice how..."
- "Watch what happens when..."
- "This demonstrates that..."
- "The key insight here is..."
- "In real-world terms, this means..."

### What to Emphasize:
✓ Disease spreads along CONNECTIONS, not randomly
✓ Network structure MATTERS
✓ Parameters directly affect OUTCOMES
✓ This applies to COVID, flu, social media virality, etc.
