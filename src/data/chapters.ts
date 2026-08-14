import type { Chapter } from '../types/playbook';

export const PLAYBOOK_CHAPTERS: Chapter[] = [
  {
    id: 'earnestness',
    number: '01',
    title: 'Founder Psychology & Earnestness',
    subtitle: 'Direct Experience Over Mainstream Orthodoxy',
    timestamp: '00:26 – 10:59',
    startSeconds: 26,
    duration: '10 min 33 sec',
    quote: "Earnestness is the courage to follow your own direct, unmediated experience rather than consensus orthodoxy. The biggest opportunities look completely unsexy or contrarian to the crowd.",
    quoteContext: "Garry recounting early career decisions, Palantir's formative years, and why consensus thinking consistently misses generational tech waves.",
    summary: "The greatest failure mode of high-IQ founders is chasing 'what is hot' instead of pursuing areas where they possess authentic obsession and direct experiential truth. When you follow orthodoxy, you build derivative software for saturated markets.",
    deepDive: [
      "Orthodoxy Trap: Elite institutions condition founders to seek external validation. When you rely on consensus approval, your competitive moat drops to zero because everyone else has the same mental model.",
      "The Palantir Lesson: Early on, working on complex unglamorous data pipelines and defense infrastructure seemed completely out of favor with standard Silicon Valley consumer app trends. It required raw conviction.",
      "Authentic Obsession: If you don't genuinely care about the problem at 2:00 AM on a Sunday when everything is broken, you will capitulate to competitors who do.",
      "The Earnest Advantage: Earnest founders listen directly to reality (customer friction, telemetry, hard physics) rather than Twitter/X hype cycles."
    ],
    tacticalRules: [
      "Reject ideas you can only justify through peer validation or market hype.",
      "Ask: 'What do I believe from personal, painful direct experience that 95% of tech commentators disagree with?'",
      "Do not pivot to the buzzword-of-the-month unless your core architecture genuinely demands it.",
      "Measure your founder conviction by your willingness to work on the problem in total obscurity for 5 years."
    ],
    mentalModel: {
      name: "The Earnestness Asymmetry",
      equation: "Alpha = Direct Experiential Truth - Consensus Orthodoxy",
      description: "Excess venture returns occur strictly in the delta between what is actually true in the trenches and what the consensus believes."
    },
    metrics: [
      { label: "Conviction Horizon", value: "5-10 yrs", sub: "Required timeline" },
      { label: "Consensus Correlation", value: "0.00", sub: "Target alpha goal" },
      { label: "Validation Delay", value: "24-36 mo", sub: "Until market realizes" }
    ],
    tags: ["Psychology", "Conviction", "Contrarian", "Founder DNA"]
  },
  {
    id: 'startup-playbook',
    number: '02',
    title: 'The New Startup Playbook',
    subtitle: 'Skillifying Business Operations into Markdown',
    timestamp: '13:54 – 21:05',
    startSeconds: 834,
    duration: '7 min 11 sec',
    quote: "Instead of building 200-person SaaS companies with massive overhead, 3-to-5 person hyper-leveraged teams will orchestrate hundreds of specialized agentic systems. Every business process can be 'skillified' into an executable markdown file.",
    quoteContext: "Explaining how software economics have shifted from manual headcount scaling to programmatic skill encapsulation.",
    summary: "The traditional SaaS headcount playbook is dead. The new unit of operational leverage is the 'Skillified Workflow'—a precise, version-controlled markdown specification (`SKILL.md`) that executes autonomously via agentic runtime loops.",
    deepDive: [
      "Headcount Decoupling: In 2015, adding $10M in ARR required adding 60 employees. In 2026, adding $10M in ARR requires adding 300 well-orchestrated background agent loops and zero middle managers.",
      "Skillification of Work: If a task can be described in an SOP (Standard Operating Procedure), it can be written as a high-fidelity Markdown skill with deterministic inputs, fuzzy agentic reasoning, and verifiable tool calls.",
      "Compound Organizational Memory: Unlike employees who leave and take tacit knowledge with them, markdown skills live in git, undergo peer review, and get continuously optimized.",
      "Zero-Marginal-Cost Operations: Customer intelligence, competitor tracking, PR review synthesis, and growth loops run continuously for pennies in token costs."
    ],
    tacticalRules: [
      "Never hire a human for a repeatable operational role until you have attempted to encode the process into a SKILL.md specification.",
      "Treat your company's prompt/skill repository as your primary operational capital.",
      "Keep core engineering teams under 8 people; scale throughput by multiplying agentic background loops.",
      "Run automated nightly benchmark runs on your operational skills just like unit tests."
    ],
    mentalModel: {
      name: "The Skillification Law",
      equation: "Output = (Core Team Quality) × (Active Skills)^1.8",
      description: "Organizational output scales superlinearly with well-defined markdown skill loops rather than linear headcount addition."
    },
    metrics: [
      { label: "Team Size", value: "3 - 8", sub: "Peak leverage scale" },
      { label: "OpEx Reduction", value: "85%", sub: "Vs traditional SaaS" },
      { label: "Execution Speed", value: "100x", sub: "Loop cycle velocity" }
    ],
    tags: ["Agentic AI", "Skill.md", "Lean Ops", "Software 3.0"]
  },
  {
    id: 'agentic-company',
    number: '03',
    title: 'The Era of Agentic Companies',
    subtitle: 'Field of Vision & Zero-Friction Governance',
    timestamp: '28:09 – 33:10',
    startSeconds: 1689,
    duration: '5 min 01 sec',
    quote: "With meeting-transcript agents and real-time telemetry loops, the entire company can fit within a single founder's field of vision. Bureaucracy was merely a lossy compression algorithm for information.",
    quoteContext: "Visualizing the eradication of corporate politics, status meetings, and middle-management information distortion.",
    summary: "Bureaucracy emerged historically because human communication degrades across hierarchy layers. By running ambient transcript agents, continuous telemetry, and synthesis loops, founders gain omniscient, unvarnished visibility into ground-truth customer and product reality.",
    deepDive: [
      "The Broken Telephone Trap: In a 200-person org, customer pain points get filtered through 4 layers of managers, each smoothing out bad news to protect their turf. By the time it hits the CEO, it is unrecognizable.",
      "Transcript & Ambient Agents: Autonomous background agents ingest raw customer call recordings, git commits, discord community sentiment, and bug logs to produce unvarnished executive truth vectors.",
      "Elimination of Status Meetings: When every agentic loop updates a shared state machine, no human needs to attend a 'standup' or 'alignment meeting' ever again.",
      "Single Vision Field: A single technical founder can steer product direction, customer success, and architecture simultaneously without losing tactile feel."
    ],
    tacticalRules: [
      "Deploy meeting transcript summarizers that flag divergence between customer feature requests and sprint commits.",
      "Abolish status-update meetings; replace them with automated agentic ledger updates.",
      "Ensure all raw operational telemetry is queryable by executive agents without middle-management filtering.",
      "Empower every engineer to spawn autonomous sub-agents for rapid prototyping."
    ],
    mentalModel: {
      name: "The Optical Field Law",
      equation: "Truth Fidelity = 1 / (Management Layers)^2",
      description: "Information truth degrades with the square of organizational distance. Ambient agents reduce distance to zero."
    },
    metrics: [
      { label: "Meeting Overhead", value: "-90%", sub: "Status sync elimination" },
      { label: "Truth Latency", value: "< 5 min", sub: "Real-time feedback" },
      { label: "Signal Fidelity", value: "99.4%", sub: "Direct telemetry" }
    ],
    tags: ["Org Design", "Telemetry", "No Bureaucracy", "Founder Vision"]
  },
  {
    id: 'white-pill',
    number: '04',
    title: 'The "White Pill" on Adoption',
    subtitle: 'Institutional Inertia as a Structural Moat',
    timestamp: '39:08 – 41:33',
    startSeconds: 2348,
    duration: '2 min 25 sec',
    quote: "The slow pace of enterprise and societal adoption isn't a failure—it's the 'white pill.' Existing legacy structures have massive moats, and the transition will be a gradual, multi-decade wave. That gives true builders time to create enduring value.",
    quoteContext: "Countering AI hype bubble doomerism by explaining real-world corporate procurement, regulatory friction, and organizational inertia.",
    summary: "While tech Twitter expects the entire global economy to be rewritten in 6 months, real-world institutions adopt technology over 20-30 year horizons. This friction is a massive gift to founders: it prevents instant commoditization and rewards deep, earnest workflow integration.",
    deepDive: [
      "The Hype Disconnect: Technologists confuse algorithmic capability with institutional deployment. Banks, healthcare providers, and governments require compliance, security audits, and behavioral change.",
      "The Structural Moat: If AI adoption were instantaneous, everything built today would be obsolete tomorrow. The gradual rollout allows earnest founders to deeply entrench themselves in high-value workflows.",
      "Patience as Alpha: The winners of this era will not be flash-in-the-pan wrapper apps, but companies that pair cutting-edge agentic capabilities with deep enterprise empathy and integration moats.",
      "The Multi-Decade Wave: Just as the internet took from 1994 to 2024 to fully penetrate retail, finance, and logistics, the agentic revolution is a 25-year compounding compounding cycle."
    ],
    tacticalRules: [
      "Don't panic about competing with model updates; build moat around enterprise integration and workflow lock-in.",
      "Target high-friction, regulated, or unsexy vertical workflows where incumbents move slowly.",
      "Sell the outcome (e.g., $500k in cost reduction or 10x faster auditing) rather than 'AI magic'.",
      "Plan for 10-year compounding rather than 6-month flips."
    ],
    mentalModel: {
      name: "The Adoption Horizon Matrix",
      equation: "Enduring Enterprise Value = (Agentic Leverage) × (Enterprise Inertia Moat)",
      description: "Value accrues to companies that bridge algorithmic speed with slow-moving institutional trust."
    },
    metrics: [
      { label: "Adoption Cycle", value: "20+ yrs", sub: "Institutional rollout" },
      { label: "Moat Longevity", value: "High", sub: "Workflow integration" },
      { label: "Enterprise Churn", value: "< 2%", sub: "Once embedded" }
    ],
    tags: ["Market Strategy", "White Pill", "Defensibility", "Enterprise Moats"]
  },
  {
    id: 'local-governance',
    number: '05',
    title: 'Local Governance & Community',
    subtitle: 'The Physical Flywheel of Tech Ecosystems',
    timestamp: '44:44 – 51:28',
    startSeconds: 2684,
    duration: '6 min 44 sec',
    quote: "You cannot build the digital future if the physical world outside your front door is decaying. Fixing local governance, public safety, and housing in San Francisco isn't a distraction—it is the foundation of human progress.",
    quoteContext: "Discussing civic engagement in San Francisco, local political activism, and why founders must care about physical civilization.",
    summary: "High-density tech clusters like Silicon Valley produce compounding intellectual output only when basic physical fundamentals (safe streets, abundant housing, pragmatic governance) are maintained. Founders must act locally to protect the physical environment that enables digital miracles.",
    deepDive: [
      "The Physical Bedrock: Software cannot escape physical reality. If your city is dysfunctional, talented engineers leave, serendipity evaporates, and community trust collapses.",
      "The 'Act Local' Ethos: Rather than complaining on social media, Garry advocates for direct local civic participation: voting, supporting pragmatic candidates, demanding school board accountability, and fixing municipal bloat.",
      "Talent Density Flywheel: When a physical city feels safe, vibrant, and optimistic, it attracts the world's most earnest builders, creating high-bandwidth spontaneous collaboration that Zoom cannot replicate.",
      "Civic Responsibility: Elite founders have a moral duty to give back to the municipalities that enabled their prosperity."
    ],
    tacticalRules: [
      "Participate actively in your local municipal elections and school board policies.",
      "Foster physical in-person salons, co-working spaces, and earnest builder dinners.",
      "Reject cynicism; treat local municipal governance as a solvable systems engineering problem.",
      "Anchor your digital ambitions with deep physical world responsibility."
    ],
    mentalModel: {
      name: "The Silicon Physical Flywheel",
      equation: "Innovation Velocity = (Talent Density) × (Civic Stability) / (Municipal Friction)",
      description: "Technological output thrives when physical safety and civic pragmatism minimize human drag."
    },
    metrics: [
      { label: "Talent Density", value: "10x", sub: "In-person clustering" },
      { label: "Serendipity Rate", value: "High", sub: "Physical co-location" },
      { label: "Civic Impact", value: "Direct", sub: "Local participation" }
    ],
    tags: ["Civics", "San Francisco", "Physical World", "Community"]
  }
];
