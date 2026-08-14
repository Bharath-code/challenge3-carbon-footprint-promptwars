export interface Chapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  timestamp: string;
  startSeconds: number;
  duration: string;
  quote: string;
  quoteContext: string;
  summary: string;
  deepDive: string[];
  tacticalRules: string[];
  mentalModel: {
    name: string;
    equation: string;
    description: string;
  };
  metrics: {
    label: string;
    value: string;
    sub: string;
  }[];
  tags: string[];
}

export interface SkillTemplate {
  id: string;
  title: string;
  category: 'Intelligence' | 'Operations' | 'Growth' | 'Engineering' | 'Executive';
  department: string;
  description: string;
  executionFrequency: string;
  humanLaborHoursSaved: number;
  agenticLoopRate: string;
  triggerEvent: string;
  inputs: string[];
  toolsRequired: string[];
  dagSteps: {
    step: number;
    agent: string;
    action: string;
    output: string;
  }[];
  rawMarkdown: string;
}

export interface DiagnosticQuestion {
  id: number;
  dimension: 'Earnestness vs Orthodoxy' | 'Agentic Leverage' | 'Field of Vision' | 'Adoption Patience' | 'Civic Grounding';
  question: string;
  context: string;
  options: {
    label: string;
    score: number; // 1 to 5
    description: string;
    archetypeBias: 'hyper-builder' | 'earnest-pragmatist' | 'consensus-chaser' | 'bureaucracy-bound';
  }[];
}

export interface FounderArchetype {
  title: string;
  scoreRange: [number, number];
  badge: string;
  tagline: string;
  description: string;
  superpowers: string[];
  blindspots: string[];
  tanDirectives: string[];
}
