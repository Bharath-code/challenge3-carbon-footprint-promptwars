import type { DiagnosticQuestion, FounderArchetype } from '../types/playbook';

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 1,
    dimension: 'Earnestness vs Orthodoxy',
    question: 'How do you choose which core problem to build software for?',
    context: 'Garry Tan stresses that pursuing consensus ideas leaves you with zero moat, while direct painful experience reveals true alpha.',
    options: [
      {
        label: 'I build what tech influencers and trending venture themes say is hot right now.',
        score: 1,
        description: 'High vulnerability to hype cycle collapse and consensus saturation.',
        archetypeBias: 'consensus-chaser'
      },
      {
        label: 'I look at successful SaaS models and build a slightly cheaper clone with AI features.',
        score: 2,
        description: 'Derivative product strategy with low structural defensibility.',
        archetypeBias: 'bureaucracy-bound'
      },
      {
        label: 'I interview target customers and solve their top workflow bottlenecks with pragmatic code.',
        score: 4,
        description: 'Solid market-grounded builder with high execution reliability.',
        archetypeBias: 'earnest-pragmatist'
      },
      {
        label: 'I solve an intensely painful problem I have lived through personally that consensus thinks is crazy or unsexy.',
        score: 5,
        description: 'Peak Earnestness: Grounded in direct experiential truth with maximum conviction.',
        archetypeBias: 'hyper-builder'
      }
    ]
  },
  {
    id: 2,
    dimension: 'Agentic Leverage',
    question: 'When your company faces an operational bottleneck (e.g. support, scraping, research), what is your first instinct?',
    context: 'In the new startup playbook, adding headcount is a last resort; skillifying processes into markdown files is primary.',
    options: [
      {
        label: 'Immediately draft job descriptions and hire 5 mid-level operations managers.',
        score: 1,
        description: '2015 Legacy scaling mindset; rapidly inflates burn and slows decision loops.',
        archetypeBias: 'bureaucracy-bound'
      },
      {
        label: 'Hire contractors or an overseas agency to manually click buttons.',
        score: 2,
        description: 'Temporary patch without accumulating compounding software capital.',
        archetypeBias: 'consensus-chaser'
      },
      {
        label: 'Write custom Python/Node scripts and integrate Zapier/Make automations.',
        score: 4,
        description: 'Strong technical leverage, high efficiency.',
        archetypeBias: 'earnest-pragmatist'
      },
      {
        label: 'Encode the SOP into a version-controlled SKILL.md specification executed by autonomous agentic loops.',
        score: 5,
        description: 'Peak Agentic Leverage: Zero-marginal cost, self-improving operational infrastructure.',
        archetypeBias: 'hyper-builder'
      }
    ]
  },
  {
    id: 3,
    dimension: 'Field of Vision',
    question: 'How do you maintain ground-truth visibility on customer friction and product reality?',
    context: 'Bureaucracy acts as a lossy compression filter. Founders need direct unmediated telemetry.',
    options: [
      {
        label: 'I wait for quarterly PowerPoint decks prepared by department leads.',
        score: 1,
        description: 'Maximum information degradation; you are operating on obsolete sanitized data.',
        archetypeBias: 'bureaucracy-bound'
      },
      {
        label: 'I attend weekly 1-hour standup meetings with team managers.',
        score: 2,
        description: 'High meeting tax with moderate political filtering.',
        archetypeBias: 'consensus-chaser'
      },
      {
        label: 'I spend 5 hours a week in customer Discord channels and reply to support tickets.',
        score: 4,
        description: 'Hands-on direct founder feel; preserves customer empathy.',
        archetypeBias: 'earnest-pragmatist'
      },
      {
        label: 'I run ambient meeting-transcript agents and live telemetry that synthesizes friction into a real-time HUD.',
        score: 5,
        description: 'Single Vision Field: Complete optical clarity without bureaucratic latency.',
        archetypeBias: 'hyper-builder'
      }
    ]
  },
  {
    id: 4,
    dimension: 'Adoption Patience',
    question: 'How do you view enterprise resistance and slow societal AI adoption?',
    context: 'The "White Pill" view recognizes enterprise inertia as a structural moat that protects deep compounders.',
    options: [
      {
        label: 'I panic that every foundation model update will put my startup out of business next week.',
        score: 1,
        description: 'Doomer mentality; treating software as a commoditized lottery ticket.',
        archetypeBias: 'consensus-chaser'
      },
      {
        label: 'I try to pivot my company every 3 weeks to match whatever demo went viral on Twitter.',
        score: 2,
        description: 'Lack of conviction; no compounding moat.',
        archetypeBias: 'consensus-chaser'
      },
      {
        label: 'I focus on solving unsexy enterprise compliance, integration, and security requirements.',
        score: 4,
        description: 'Pragmatic commercial focus, building durable B2B lock-in.',
        archetypeBias: 'earnest-pragmatist'
      },
      {
        label: 'I embrace the 20-year adoption wave as a "White Pill"—building deep structural workflow moats while incumbents crawl.',
        score: 5,
        description: 'Generational Horizon: Converting enterprise inertia into unassailable compounding moats.',
        archetypeBias: 'hyper-builder'
      }
    ]
  },
  {
    id: 5,
    dimension: 'Civic Grounding',
    question: 'What is your relationship to your local physical community and civic environment?',
    context: 'Garry Tan emphasizes that digital breakthroughs require physical civic health and active local involvement.',
    options: [
      {
        label: 'I stay completely isolated online, ignore local politics, and complain on social media.',
        score: 1,
        description: 'Detached cynicism; ignores the physical foundations of human talent.',
        archetypeBias: 'consensus-chaser'
      },
      {
        label: 'I believe tech can completely ignore municipal governance and physical infrastructure.',
        score: 2,
        description: 'Ivory tower blindness; vulnerable to physical ecosystem breakdown.',
        archetypeBias: 'bureaucracy-bound'
      },
      {
        label: 'I attend local tech meetups and support fellow founders in my city.',
        score: 4,
        description: 'Active community participant, fostering physical serendipity.',
        archetypeBias: 'earnest-pragmatist'
      },
      {
        label: 'I actively participate in local civic governance, organize builder salons, and invest in the physical health of my city.',
        score: 5,
        description: 'Complete Flywheel: Merging cutting-edge digital ambition with grounded civic responsibility.',
        archetypeBias: 'hyper-builder'
      }
    ]
  }
];

export const FOUNDER_ARCHETYPES: Record<string, FounderArchetype> = {
  'hyper-builder': {
    title: 'The Hyper-Leveraged Agentic Founder',
    scoreRange: [21, 25],
    badge: 'PEAK EARNESTNESS // ALPHA SCORE: 95+',
    tagline: 'Orchestrating autonomous markdown loops with unvarnished optical clarity.',
    description: 'You embody Garry Tan\'s ideal archetype: relentless conviction derived from direct personal truth, near-zero bureaucratic tolerance, and an instinct to encode operational workflows into executable agentic skills.',
    superpowers: [
      'Operates with 10x the output of traditional 50-person startups',
      'Zero loss of ground-truth fidelity through meeting-transcript loops',
      'Unfazed by short-term hype; plays 10-year compounding games',
      'High civic agency and in-person serendipity cultivation'
    ],
    blindspots: [
      'Risk of over-automating processes before achieving product-market fit',
      'Impatience with slow-moving enterprise procurement cycles'
    ],
    tanDirectives: [
      'Codify your core product intuition into reusable SKILL.md templates.',
      'Maintain your small, elite core team; do not dilute with unnecessary management layers.',
      'Double down on physical builder dinners in your local city.'
    ]
  },
  'earnest-pragmatist': {
    title: 'The Earnest Pragmatist',
    scoreRange: [15, 20],
    badge: 'HIGH CONVICTION // ALPHA SCORE: 70-90',
    tagline: 'Deep customer empathy with strong operational pragmatism.',
    description: 'You possess authentic passion for your problem space and listen closely to customer pain. You have begun automating operational workflows and now need to transition from ad-hoc scripts to fully skillified autonomous agent loops.',
    superpowers: [
      'Grounded in customer reality and direct product usage',
      'High resilience against market hype cycles',
      'Strong physical community ties'
    ],
    blindspots: [
      'Still relying on manual meetings where transcript agents could extract truth automatically',
      'Hesitation to hand off complex workflows to multi-agent loops'
    ],
    tanDirectives: [
      'Audit your weekly calendar: eliminate 3 recurring status meetings and replace with automated agent digests.',
      'Convert your team\'s top 3 SOP documents into executable Markdown skills.',
      'Treat enterprise adoption friction as your greatest structural moat.'
    ]
  },
  'consensus-chaser': {
    title: 'The Orthodoxy Captive',
    scoreRange: [9, 14],
    badge: 'MODERATE RISK // ALPHA SCORE: 40-65',
    tagline: 'Vulnerable to tech hype cycles and external peer validation.',
    description: 'You are spending excessive mental bandwidth reacting to Twitter trends, viral demos, and consensus venture themes rather than mining your own authentic direct experience.',
    superpowers: [
      'Fast awareness of emerging technological tools and models',
      'High enthusiasm and ambition'
    ],
    blindspots: [
      'Pivoting too quickly before accumulating compounding product moats',
      'Building derivative wrapper products with low enterprise defensibility',
      'Cynical detachment from physical world civic responsibility'
    ],
    tanDirectives: [
      'Perform a 30-day hype detox: disconnect from venture Twitter and talk exclusively to 20 customers.',
      'Find the unsexiest, most complex bottleneck in your vertical and solve it deeply.',
      'Engage with your physical city: host an in-person builder dinner this week.'
    ]
  },
  'bureaucracy-bound': {
    title: 'The Legacy 2015 Operator',
    scoreRange: [5, 8],
    badge: 'CRITICAL INEFFICIENCY // ALPHA SCORE: < 40',
    tagline: 'Scaling headcount and management layers in an agentic era.',
    description: 'You are applying outdated 2015 SaaS scaling playbooks: hiring middle management, holding endless alignment meetings, and filtering customer truth through layers of bureaucracy.',
    superpowers: [
      'Familiarity with traditional corporate structure and governance'
    ],
    blindspots: [
      'Crushing operational overhead and high burn rate',
      'Complete loss of ground-truth visibility on customer friction',
      'Vulnerability to 3-person AI-native startups building 10x faster'
    ],
    tanDirectives: [
      'Immediately freeze operational headcount and institute the "Skillify First" rule.',
      'Deploy ambient transcript agents to bypass middle-management reporting filters.',
      'Embrace radical simplicity: reduce your organizational distance to zero.'
    ]
  }
};
