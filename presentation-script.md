# SIR Disease Spread Simulation - Presentation Script (2-3 minutes)

## SLIDE 1: Title Slide
**[Duration: 10 seconds]**

**Say:**
"Hello everyone! Today I'll be presenting the SIR Disease Spread Model - a mathematical framework for understanding how diseases spread through populations using network theory."

---

## SLIDE 2: What is the SIR Model?
**[Duration: 30 seconds]**

**Content on slide:**
- **S = Susceptible** (Healthy, can get infected) 🔵
- **I = Infected** (Sick, can spread disease) 🔴
- **R = Recovered** (Immune, cannot get infected again) 🟢

**Say:**
"The SIR model divides a population into three compartments. Susceptible individuals are healthy but can catch the disease. Infected individuals are sick and can transmit to others. Recovered individuals have gained immunity and cannot be reinfected. This creates a flow: S → I → R."

---

## SLIDE 3: The Mathematics Behind SIR
**[Duration: 40 seconds]**

**Content on slide:**
```
Key Parameters:
• β (beta) = Infection probability per contact
• γ (gamma) = Recovery probability per time step

Effective Reproduction Number:
R_eff = β × λ_max / γ

where λ_max = spectral radius (network connectivity)
```

**Say:**
"Two key parameters control the model. Beta represents the probability that an infected person transmits the disease during contact. Gamma is the probability of recovery per time step.

The critical metric is R-effective - the effective reproduction number. It's calculated as beta times the spectral radius divided by gamma. The spectral radius measures how well-connected the network is.

If R-effective is greater than 1, we get an epidemic. If it's less than 1, the disease dies out."

---

## SLIDE 4: Network-Based Approach
**[Duration: 30 seconds]**

**Content on slide:**
- People = Nodes in a network
- Social connections = Edges
- Disease spreads along network connections
- We use Barabási-Albert scale-free networks
  - Some people have many connections (hubs)
  - Most people have few connections

**Say:**
"Instead of assuming everyone mixes uniformly, we model society as a network. People are nodes, and social connections are edges. Disease can only spread between connected individuals.

We use a Barabási-Albert network which creates realistic social structures where a few people have many connections - like influencers on social media - while most have fewer connections."

---

## SLIDE 5: Vaccination Strategies
**[Duration: 30 seconds]**

**Content on slide:**
**Comparing 4 strategies:**
1. **Random** - Baseline
2. **High-Degree** - Target social hubs
3. **Betweenness** - Target network bridges
4. **PageRank** - Target influential nodes

**Result:** Targeted strategies prevent 2-3x more infections than random!

**Say:**
"A key application is optimizing vaccination strategies with limited doses. We compared four approaches: random vaccination as baseline, targeting high-degree nodes who have many connections, targeting betweenness nodes who bridge communities, and using PageRank to find influential spreaders.

Our simulations show targeted strategies can prevent two to three times more infections than random vaccination - demonstrating how network science informs public health policy."

---

## SLIDE 6: Key Takeaways
**[Duration: 20 seconds]**

**Content on slide:**
✓ SIR models predict epidemic spread mathematically
✓ Network structure critically affects disease dynamics
✓ Spectral radius determines epidemic potential
✓ Smart vaccination saves lives

**Say:**
"In summary: The SIR model provides mathematical insight into epidemics. Network structure matters - not everyone interacts equally. The spectral radius tells us if an outbreak will become an epidemic. And targeted interventions based on network analysis can dramatically reduce disease burden. Thank you!"

---

## TIMING BREAKDOWN:
- Slide 1: 10 sec
- Slide 2: 30 sec
- Slide 3: 40 sec
- Slide 4: 30 sec
- Slide 5: 30 sec
- Slide 6: 20 sec
**Total: 2 minutes 40 seconds**

---

## TIPS FOR DELIVERY:
1. Speak clearly and at moderate pace
2. Make eye contact with audience
3. Point to key equations/graphs as you mention them
4. Use hand gestures to illustrate flow (S → I → R)
5. Emphasize the real-world impact (2-3x more effective)
