import type { SkillTemplate } from '../types/playbook';

export const SKILL_TEMPLATES: SkillTemplate[] = [
  {
    id: 'meeting-transcript-synthesis',
    title: 'Executive Transcript & Ground-Truth Synthesis',
    category: 'Executive',
    department: 'Founder / Operations',
    description: 'Autonomous agentic loop that ingests customer call transcripts, team standups, and Discord chats to extract unfiltered customer friction vectors and detect roadmap divergence.',
    executionFrequency: 'Triggered after every Zoom/GMeet recording',
    humanLaborHoursSaved: 14,
    agenticLoopRate: '180s per meeting',
    triggerEvent: 'webhook.meeting.recorded',
    inputs: [
      'Raw audio transcript (.vtt / .json)',
      'Current Sprint Jira / Linear Roadmap snapshot',
      'Historical customer tag index'
    ],
    toolsRequired: [
      'deepgram_transcribe',
      'linear_roadmap_diff',
      'sentiment_vector_store',
      'slack_executive_digest'
    ],
    dagSteps: [
      {
        step: 1,
        agent: 'Transcript Cleaner Agent',
        action: 'Strips conversational filler, extracts speaker identities, and indexes customer statements with timestamp offsets.',
        output: 'Structured Semantic Transcript'
      },
      {
        step: 2,
        agent: 'Unfiltered Truth Extractor',
        action: 'Identifies raw pain points, competitive mentions, objections, and price elasticity friction points without middle-management sanitization.',
        output: 'Raw Friction Vector'
      },
      {
        step: 3,
        agent: 'Roadmap Divergence Auditor',
        action: 'Compares customer complaints against current engineering pull requests to flag ignored product bugs.',
        output: 'Discrepancy Matrix'
      },
      {
        step: 4,
        agent: 'Executive Digest Dispatcher',
        action: 'Pushes 3-bullet ground-truth brief directly to Founder Field of Vision dashboard and flags critical tickets in Linear.',
        output: 'Actionable Ticket Batch'
      }
    ],
    rawMarkdown: `---
name: executive-transcript-synthesis
description: Autonomous loop ingesting raw customer/team transcripts to extract unfiltered ground-truth friction and roadmap divergence.
version: 1.2.0
triggers:
  - webhook: meeting.recorded
  - cron: "0 18 * * 1-5" # Daily 6pm synthesis
---

# SKILL: Executive Ground-Truth Synthesis

> **Objective:** Maintain founder field-of-vision by eliminating intermediary communication filtering. Ingest raw customer recordings and produce unvarnished truth vectors.

## 01. Context & Ingestion
- Ingest raw transcript from webhook payload.
- Query active Linear sprint milestones via \`linear_roadmap_diff\`.
- Query past 90-day churn reasons from \`sentiment_vector_store\`.

## 02. Execution Protocol

### Step A: Semantic Extraction
\`\`\`markdown
1. Extract every explicit customer statement expressing:
   - Confusion ("I didn't understand why X happened...")
   - Friction ("It took our team 3 weeks to configure...")
   - Competitor Comparison ("Vendor Y does this out of the box...")
   - Commercial Intent ("We would upgrade if X was supported...")
2. Assign a Severity Weight [1.0 - 5.0] to each statement based on ARR tier.
\`\`\`

### Step B: Roadmap Divergence Check
- Cross-reference extracted friction against active Git PRs.
- IF friction severity >= 4.0 AND no active PR addresses it:
  - Auto-generate high-priority issue tagged \`[Ground-Truth-Alert]\`.
  - Notify Founder immediately via Telegram/Slack executive channel.

## 03. Output Schema
\`\`\`json
{
  "meeting_id": "call_9824_enterprise",
  "truth_fidelity_score": 0.94,
  "top_friction_vectors": [
    { "feature": "SSO SAML Auto-Provisioning", "urgency": 4.8, "quote": "We cannot rollout to 400 seats without Okta SCIM." }
  ],
  "roadmap_alignment": "DIVERGENT",
  "auto_ticket_created": "ENG-4109"
}
\`\`\`
`
  },
  {
    id: 'competitive-moat-intelligence',
    title: 'Autonomous Competitor & Vector Moat Radar',
    category: 'Intelligence',
    department: 'Strategy / Product',
    description: 'Continuous intelligence loop scraping competitor documentation changelogs, pricing pages, customer sentiment, and patent filings to maintain competitive alpha.',
    executionFrequency: 'Nightly at 02:00 UTC',
    humanLaborHoursSaved: 20,
    agenticLoopRate: '12 min per full sector scan',
    triggerEvent: 'cron.schedule.nightly',
    inputs: [
      'Competitor URL watch list',
      'Target buyer ICP personas',
      'Subreddit & Twitter sentiment streams'
    ],
    toolsRequired: [
      'playwright_diff_scraper',
      'changelog_semantic_parser',
      'pricing_matrix_evaluator',
      'telegram_briefing_bot'
    ],
    dagSteps: [
      {
        step: 1,
        agent: 'DOM Diffing Agent',
        action: 'Detects structural, copy, and pricing changes across all monitored competitor websites.',
        output: 'DOM Change Delta'
      },
      {
        step: 2,
        agent: 'Strategic Threat Classifier',
        action: 'Evaluates if competitor updates represent genuine structural moats or cosmetic marketing fluff.',
        output: 'Threat Categorization'
      },
      {
        step: 3,
        agent: 'Counter-Positioning Generator',
        action: 'Drafts battle cards and talk tracks for sales agents highlighting our unique earnest architecture.',
        output: 'Battle Card Updates'
      }
    ],
    rawMarkdown: `---
name: competitive-moat-intelligence
description: Nightly autonomous competitive intelligence radar tracking changelogs, pricing pivots, and counter-positioning.
version: 2.0.0
---

# SKILL: Competitor Moat Radar

## 01. Scrape & Diff Target Matrix
- Execute \`playwright_diff_scraper\` on competitor public endpoints:
  - Pricing, API Documentation, Enterprise Security, Careers/Hiring.

## 02. Heuristic Filter
- Filter out standard cosmetic marketing copy.
- Isolate:
  - New API endpoints (signals upcoming platform shift)
  - Enterprise compliance certifications (SOC2, FedRAMP)
  - Key executive hiring patterns (signals new geographic expansion)

## 03. Counter-Positioning Synthesis
- Generate automated battle-card diffs for sales loops.
- Deliver executive 1-page memo every Monday 07:00 AM.
`
  },
  {
    id: 'customer-churn-triage',
    title: 'Real-Time Churn Triage & Rescue Loop',
    category: 'Operations',
    department: 'Customer Success / Revenue',
    description: 'Real-time telemetry observer that catches drop-offs in API volume or UI session anomalies, drafts hyper-personalized diagnostic interventions, and alerts engineering.',
    executionFrequency: 'Real-time event stream',
    humanLaborHoursSaved: 25,
    agenticLoopRate: '< 45s from anomaly detection',
    triggerEvent: 'event.telemetry.usage_drop_detected',
    inputs: [
      'Segment / PostHog telemetry event stream',
      'Account ARR & contract renewal date',
      'Past support ticket history'
    ],
    toolsRequired: [
      'timescale_query_anomaly',
      'llm_context_enricher',
      'personalized_email_drafter',
      'founder_intervention_ping'
    ],
    dagSteps: [
      {
        step: 1,
        agent: 'Telemetry Monitor Agent',
        action: 'Detects 35%+ week-over-week drop in active API calls or key dashboard flows.',
        output: 'Anomaly Alert'
      },
      {
        step: 2,
        agent: 'Root Cause Investigator',
        action: 'Inspects error logs, 5xx server responses, and recent user queries to isolate exact friction root cause.',
        output: 'Root Cause Diagnosis'
      },
      {
        step: 3,
        agent: 'Personalized Solution Architect',
        action: 'Generates a ready-to-send technical fix, custom code snippet, or calendly invite from the founder.',
        output: 'Rescue Package'
      }
    ],
    rawMarkdown: `---
name: customer-churn-triage
description: Real-time telemetry watcher detecting usage anomalies and triggering automated technical rescue workflows.
version: 1.4.1
---

# SKILL: Customer Churn Triage Loop

## 01. Telemetry Trigger
- Listen on Kafka topic \`telemetry.account.metrics\`.
- Threshold: 7-day rolling volume < 65% of 30-day baseline.

## 02. Autonomous Investigation
- Query Datadog logs for \`account_id\` to identify any recent unhandled exceptions.
- Check if user encountered billing card decline or rate-limit saturation.

## 03. Rescue Dispatch
- If technical failure: Automatically provision 2-week unlimited quota bypass and notify engineering.
- If product friction: Draft direct note from Founder with specific architectural advice based on customer logs.
`
  },
  {
    id: 'autonomous-pr-auditor',
    title: 'Earnest Code Quality & Architecture Auditor',
    category: 'Engineering',
    department: 'Core Engineering',
    description: 'Autonomous CI/CD bot that audits every pull request for anti-patterns, unnecessary third-party dependencies, bloated abstractions, and latency regressions.',
    executionFrequency: 'Triggered on GitHub PR open / update',
    humanLaborHoursSaved: 18,
    agenticLoopRate: '90s per pull request',
    triggerEvent: 'github.pull_request.opened',
    inputs: [
      'Git diff with line context',
      'AST dependency graph',
      'Lighthouse / Vitest performance benchmark metrics'
    ],
    toolsRequired: [
      'ast_parser',
      'bundle_analyzer',
      'security_vulnerability_scanner',
      'github_pr_commenter'
    ],
    dagSteps: [
      {
        step: 1,
        agent: 'Complexity & Slop Detector',
        action: 'Flags redundant abstraction layers, unused state variables, and bloated npm imports.',
        output: 'Simplicity Score'
      },
      {
        step: 2,
        agent: 'Perf Regression Profiler',
        action: 'Runs headless benchmark comparing render cycle duration and bundle size against main branch.',
        output: 'Performance Delta'
      },
      {
        step: 3,
        agent: 'Architectural Reviewer',
        action: 'Leaves precise inline refactor proposals with copy-pasteable diff blocks.',
        output: 'GitHub Review Comment'
      }
    ],
    rawMarkdown: `---
name: autonomous-pr-auditor
description: Anti-slop engineering auditor enforcing intentional minimalism and zero bloat on every PR.
version: 3.1.0
---

# SKILL: Autonomous PR Architect

## 01. Core Directives
- Reject any PR that adds > 3 external dependencies without architectural justification.
- Enforce strict typing (no \`any\` or unverified JSON casts).
- Measure bundle size delta: fail build if +15KB without asset justification.

## 02. Action
- Post concise, constructive markdown reviews with actionable diffs.
`
  }
];
