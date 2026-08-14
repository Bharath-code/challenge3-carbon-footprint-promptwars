import React, { useState } from 'react';
import { SKILL_TEMPLATES } from '../data/skillTemplates';
import type { SkillTemplate } from '../types/playbook';
import { 
  Cpu, 
  Copy, 
  Check, 
  DownloadSimple, 
  Clock, 
  Sparkle,
  TerminalWindow
} from '@phosphor-icons/react';

export const SkillifyEngine: React.FC = () => {
  const [skills, setSkills] = useState<SkillTemplate[]>(SKILL_TEMPLATES);
  const [selectedSkillId, setSelectedSkillId] = useState<string>(SKILL_TEMPLATES[0].id);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'markdown' | 'dag' | 'meta'>('markdown');
  
  // Custom generator state
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const selectedSkill = skills.find((s) => s.id === selectedSkillId) || skills[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedSkill.rawMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([selectedSkill.rawMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedSkill.id}.SKILL.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCreateCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;

    setIsGenerating(true);

    setTimeout(() => {
      const sanitizedName = customPrompt.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30);
      const newSkill: SkillTemplate = {
        id: `custom-${sanitizedName}`,
        title: customPrompt,
        category: 'Operations',
        department: 'Autonomous Operations',
        description: `Autonomous skill loop generated for: ${customPrompt}. Automates unstructured inputs and enforces verifiable output invariants.`,
        executionFrequency: 'Event Triggered / Periodic',
        humanLaborHoursSaved: 16,
        agenticLoopRate: '60s per loop',
        triggerEvent: 'system.event.custom_trigger',
        inputs: ['Raw operational logs', 'Context vector index', 'SOP Guidelines'],
        toolsRequired: ['vector_search', 'llm_evaluator', 'webhook_dispatcher'],
        dagSteps: [
          {
            step: 1,
            agent: 'Ingestion & Normalizer',
            action: `Parses incoming payload for ${customPrompt} context.`,
            output: 'Structured Context Vector'
          },
          {
            step: 2,
            agent: 'Autonomous Reasoning Core',
            action: 'Executes domain rules and evaluates heuristic invariants.',
            output: 'Synthesized Action Plan'
          },
          {
            step: 3,
            agent: 'Verifier & Dispatcher',
            action: 'Validates safety constraints and triggers downstream actions.',
            output: 'Final Verified Artifact'
          }
        ],
        rawMarkdown: `---
name: ${sanitizedName}
description: Skillified autonomous workflow for ${customPrompt}.
version: 1.0.0
triggers:
  - event: system.custom_trigger
---

# SKILL: ${customPrompt}

> Encoded as a Garry Tan Agentic Markdown Specification.

## 01. Objective & Invariants
- Execute ${customPrompt} with zero human-in-the-loop intervention for standard flows.
- Escalate to human founder only if anomaly score > 0.85.

## 02. Ingestion & Pre-Flight
- Ingest raw telemetry and context vector.
- Verify environment variables and API tool health.

## 03. Execution Protocol
\`\`\`markdown
1. Ingest input stream.
2. Apply operational heuristics:
   - Check against established safety rules.
   - Synthesize decision matrix.
3. Commit action log to git repository.
\`\`\`

## 04. Verification Schema
\`\`\`json
{
  "status": "SUCCESS",
  "execution_time_ms": 1420,
  "confidence_score": 0.98
}
\`\`\`
`
      };

      setSkills([newSkill, ...skills]);
      setSelectedSkillId(newSkill.id);
      setCustomPrompt('');
      setIsGenerating(false);
    }, 600);
  };

  return (
    <section id="skillify" className="py-20 bg-[#070709] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-2">
            <Cpu size={15} weight="bold" />
            <span>Section 02 // The Skillification Protocol</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            THE "SKILLIFY" ENGINE
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-400 font-sans max-w-2xl">
            Garry Tan's core operational thesis: transform any human SOP or business workflow into an executable, version-controlled <span className="font-mono text-amber-400">SKILL.md</span> file.
          </p>
        </div>

        {/* Live Skill Generator Prompt Bar */}
        <div className="mb-8 p-4 rounded-2xl bg-zinc-950/80 border border-amber-500/30 shadow-[0_0_25px_rgba(245,158,11,0.08)]">
          <form onSubmit={handleCreateCustomSkill} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Enter any business SOP to Skillify (e.g. 'SOC2 Audit Evidence Collector', 'Investor Update Drafter')..."
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white placeholder-zinc-400 text-sm font-sans focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              />
            </div>
            <button
              type="submit"
              disabled={isGenerating || !customPrompt.trim()}
              className="flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black font-semibold text-xs font-mono transition-all shrink-0"
            >
              <Sparkle size={16} weight="fill" />
              <span>{isGenerating ? 'Skillifying Process...' : 'Generate SKILL.md'}</span>
            </button>
          </form>
        </div>

        {/* Two-Column Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Skill Selector Library */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider px-1 mb-2">
              Active Skill Repository ({skills.length} Loaded)
            </div>

            {skills.map((skill) => {
              const isSelected = skill.id === selectedSkill.id;
              return (
                <div
                  key={skill.id}
                  onClick={() => setSelectedSkillId(skill.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-900 border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/20'
                      : 'bg-zinc-950/60 border-white/5 hover:bg-zinc-900/40 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                    <span className="px-2 py-0.5 rounded bg-white/5 text-amber-400 font-bold border border-white/10">
                      {skill.category}
                    </span>
                    <span className="text-zinc-400 font-mono text-[10px]">{skill.department}</span>
                  </div>

                  <h3 className={`text-sm font-semibold tracking-tight ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                    {skill.title}
                  </h3>

                  <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                    <span className="flex items-center space-x-1 text-emerald-400">
                      <Clock size={12} />
                      <span>~{skill.humanLaborHoursSaved}h/mo saved</span>
                    </span>
                    <span className="text-zinc-400">{skill.agenticLoopRate}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Code & DAG Workbench */}
          <div className="lg:col-span-8">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 relative">
              
              {/* Header inside workbench */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 mb-1">
                    <TerminalWindow size={14} />
                    <span>SKILL IDENTIFIER // {selectedSkill.id}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-black text-white">
                    {selectedSkill.title}
                  </h3>
                  <p className="text-xs font-sans text-zinc-400 mt-1 max-w-xl">
                    {selectedSkill.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-zinc-900 border border-white/10 hover:border-amber-500/40 text-xs font-mono text-zinc-200 hover:text-white transition-all"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    <span>{copied ? 'Copied' : 'Copy .md'}</span>
                  </button>

                  <button
                    onClick={handleDownload}
                    className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs font-mono transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                  >
                    <DownloadSimple size={14} weight="bold" />
                    <span>Export SKILL.md</span>
                  </button>
                </div>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex items-center space-x-2 my-4 p-1 bg-zinc-950 rounded-xl border border-white/5 w-fit">
                <button
                  onClick={() => setActiveTab('markdown')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    activeTab === 'markdown' ? 'bg-amber-400 text-black font-semibold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Markdown Definition
                </button>
                <button
                  onClick={() => setActiveTab('dag')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    activeTab === 'dag' ? 'bg-amber-400 text-black font-semibold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Agent Execution DAG ({selectedSkill.dagSteps.length} Steps)
                </button>
                <button
                  onClick={() => setActiveTab('meta')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    activeTab === 'meta' ? 'bg-amber-400 text-black font-semibold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Tooling & Triggers
                </button>
              </div>

              {/* Tab 1: Markdown Syntax Viewer */}
              {activeTab === 'markdown' && (
                <div className="relative">
                  <div className="rounded-xl bg-[#09090d] border border-white/10 p-4 font-mono text-xs text-zinc-300 overflow-x-auto max-h-[420px] scanlines">
                    <pre className="whitespace-pre-wrap">{selectedSkill.rawMarkdown}</pre>
                  </div>
                </div>
              )}

              {/* Tab 2: Agent DAG Steps */}
              {activeTab === 'dag' && (
                <div className="space-y-4 my-2">
                  <div className="text-xs font-mono text-zinc-400 mb-2">
                    Autonomous Multi-Agent Orchestration Flow:
                  </div>

                  {selectedSkill.dagSteps.map((step) => (
                    <div key={step.step} className="p-4 rounded-xl bg-zinc-950 border border-white/10 relative">
                      <div className="flex items-center justify-between text-xs font-mono mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="w-5 h-5 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold text-[10px]">
                            {step.step}
                          </span>
                          <span className="font-bold text-amber-400">{step.agent}</span>
                        </div>
                        <span className="text-emerald-400 text-[11px] font-mono">Output: {step.output}</span>
                      </div>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        {step.action}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Metadata & Tools */}
              {activeTab === 'meta' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
                  <div className="p-4 rounded-xl bg-zinc-950 border border-white/10">
                    <div className="text-xs font-mono text-amber-400 mb-2 font-bold uppercase">Required Tools</div>
                    <ul className="space-y-1.5">
                      {selectedSkill.toolsRequired.map((tool, idx) => (
                        <li key={idx} className="text-xs font-mono text-zinc-300 flex items-center space-x-2">
                          <span className="text-amber-400">›</span>
                          <code>{tool}</code>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-950 border border-white/10">
                    <div className="text-xs font-mono text-emerald-400 mb-2 font-bold uppercase">Inputs & Triggers</div>
                    <div className="text-xs font-mono text-zinc-400 mb-2">
                      Trigger: <span className="text-white font-bold">{selectedSkill.triggerEvent}</span>
                    </div>
                    <ul className="space-y-1.5">
                      {selectedSkill.inputs.map((inp, idx) => (
                        <li key={idx} className="text-xs font-mono text-zinc-300 flex items-center space-x-2">
                          <span className="text-emerald-400">›</span>
                          <span>{inp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Bottom Telemetry Card */}
              <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-center">
                  <div className="text-[11px] font-mono text-zinc-400">Labor Saved</div>
                  <div className="text-base font-bold font-mono text-emerald-400">~{selectedSkill.humanLaborHoursSaved} hrs/mo</div>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-center">
                  <div className="text-[11px] font-mono text-zinc-400">Loop Frequency</div>
                  <div className="text-base font-bold font-mono text-amber-400">{selectedSkill.executionFrequency}</div>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-center col-span-2 sm:col-span-1">
                  <div className="text-[11px] font-mono text-zinc-400">Execution Rate</div>
                  <div className="text-base font-bold font-mono text-white">{selectedSkill.agenticLoopRate}</div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
