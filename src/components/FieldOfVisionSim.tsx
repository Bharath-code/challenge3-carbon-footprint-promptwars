import React, { useState } from 'react';
import { 
  TreeStructure, 
  Eye, 
  Users, 
  Cpu, 
  ChatTeardropDots
} from '@phosphor-icons/react';

export const FieldOfVisionSim: React.FC = () => {
  const [mode, setMode] = useState<'agentic' | 'bureaucracy'>('agentic');
  const [headcount, setHeadcount] = useState(mode === 'agentic' ? 3 : 60);
  const [agentCount, setAgentCount] = useState(mode === 'agentic' ? 45 : 0);
  const [mgmtLayers, setMgmtLayers] = useState(mode === 'agentic' ? 1 : 4);
  const [meetingHours, setMeetingHours] = useState(mode === 'agentic' ? 2 : 18);

  const handleSetMode = (newMode: 'agentic' | 'bureaucracy') => {
    setMode(newMode);
    if (newMode === 'agentic') {
      setHeadcount(3);
      setAgentCount(45);
      setMgmtLayers(1);
      setMeetingHours(2);
    } else {
      setHeadcount(60);
      setAgentCount(2);
      setMgmtLayers(4);
      setMeetingHours(18);
    }
  };

  // Mathematical modeling of information fidelity & latency
  const truthFidelity = Math.max(12, Math.min(99.4, 100 - (mgmtLayers - 1) * 22 - (meetingHours * 0.8) + (agentCount * 0.3)));
  const monthlyBurn = (headcount * 15000) + (agentCount * 45); // $15k per employee vs $45 per agent loop
  const feedbackLatencyHours = mode === 'agentic' ? 0.08 : (mgmtLayers * 72) + (meetingHours * 4);
  const fieldOfVisionScore = mode === 'agentic' ? 98 : Math.max(15, 100 - (headcount * 1.2) - (mgmtLayers * 15));

  return (
    <section id="field-of-vision" className="py-20 bg-[#08080a] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-2">
            <TreeStructure size={15} weight="bold" />
            <span>Section 03 // Organizational Physics</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            FIELD OF VISION SIMULATOR
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-400 font-sans max-w-2xl">
            Compare traditional 2015 hierarchical lossy compression against the 2026 AI-native company where everything fits inside a single founder's field of vision.
          </p>
        </div>

        {/* Mode Selector Switch */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-3 rounded-2xl bg-zinc-950 border border-white/10">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleSetMode('agentic')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                mode === 'agentic'
                  ? 'bg-amber-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Cpu size={16} weight="bold" />
              <span>2026 Agentic Loop (3-8 People + Agents)</span>
            </button>

            <button
              onClick={() => handleSetMode('bureaucracy')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                mode === 'bureaucracy'
                  ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Users size={16} weight="bold" />
              <span>2015 Legacy SaaS Hierarchy (60+ People)</span>
            </button>
          </div>

          <div className="text-xs font-mono text-zinc-400 px-2">
            Live Model Status: <span className={mode === 'agentic' ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>Active</span>
          </div>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-5 space-y-6 glass-panel p-6 rounded-2xl border border-white/10">
            <div className="text-xs font-mono text-amber-400 uppercase tracking-wider font-bold">
              Adjust Organizational Variables
            </div>

            {/* Slider 1: Headcount */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-zinc-300">Human Headcount</span>
                <span className="text-white font-bold">{headcount} people</span>
              </div>
              <input
                type="range"
                min={2}
                max={150}
                value={headcount}
                onChange={(e) => setHeadcount(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-400 mt-1">
                <span>2 (Lean Core)</span>
                <span>150 (Bureaucratic Bloat)</span>
              </div>
            </div>

            {/* Slider 2: Active Agent Loops */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-zinc-300">Active Background Agent Loops</span>
                <span className="text-amber-400 font-bold">{agentCount} agents</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={agentCount}
                onChange={(e) => setAgentCount(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-400 mt-1">
                <span>0 (Manual Ops)</span>
                <span>100 (Full Skillification)</span>
              </div>
            </div>

            {/* Slider 3: Management Layers */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-zinc-300">Management Hierarchy Layers</span>
                <span className="text-white font-bold">{mgmtLayers} layers</span>
              </div>
              <input
                type="range"
                min={1}
                max={5}
                value={mgmtLayers}
                onChange={(e) => setMgmtLayers(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-400 mt-1">
                <span>1 (Flat Founder HUD)</span>
                <span>5 (Broken Telephone)</span>
              </div>
            </div>

            {/* Slider 4: Meeting Hours */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-zinc-300">Status Sync Meetings / Week</span>
                <span className="text-white font-bold">{meetingHours} hrs / person</span>
              </div>
              <input
                type="range"
                min={0}
                max={30}
                value={meetingHours}
                onChange={(e) => setMeetingHours(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-white/5 text-xs text-zinc-400 font-mono leading-relaxed">
              <span className="text-amber-400 font-bold">Garry Tan Insight:</span> Bureaucracy is not malicious; it is the natural consequence of human memory limits. Ambient agents replace memory filters with exact vector state.
            </div>
          </div>

          {/* Right Column: Live Telemetry Output */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Scorecards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              
              <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 text-center">
                <div className="text-[11px] font-mono text-zinc-400">Truth Fidelity</div>
                <div className={`text-2xl font-black font-mono mt-1 ${
                  truthFidelity > 80 ? 'text-emerald-400 glow-emerald' : 'text-red-400'
                }`}>
                  {truthFidelity.toFixed(1)}%
                </div>
                <div className="text-[10px] text-zinc-400 mt-1">Signal vs noise</div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 text-center">
                <div className="text-[11px] font-mono text-zinc-400">Monthly Burn</div>
                <div className="text-2xl font-black font-mono text-white mt-1">
                  ${(monthlyBurn / 1000).toFixed(0)}k
                </div>
                <div className="text-[10px] text-zinc-400 mt-1">OpEx / month</div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 text-center">
                <div className="text-[11px] font-mono text-zinc-400">Feedback Loop</div>
                <div className="text-2xl font-black font-mono text-amber-400 mt-1">
                  {feedbackLatencyHours < 1 ? '< 5 mins' : `${Math.round(feedbackLatencyHours / 24)} days`}
                </div>
                <div className="text-[10px] text-zinc-400 mt-1">Customer to code</div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 text-center">
                <div className="text-[11px] font-mono text-zinc-400">Field of Vision</div>
                <div className="text-2xl font-black font-mono text-cyan-400 mt-1">
                  {fieldOfVisionScore.toFixed(0)}%
                </div>
                <div className="text-[10px] text-zinc-400 mt-1">Single founder HUD</div>
              </div>

            </div>

            {/* Information Flow Diagram Box */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between text-xs font-mono mb-4">
                <span className="text-zinc-400 font-bold uppercase">
                  Information Transmission Topology: {mode === 'agentic' ? 'Direct Ambient Mesh' : 'Hierarchical Silo Cascade'}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  mode === 'agentic' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'
                }`}>
                  {mode === 'agentic' ? 'Zero Loss' : 'Severe Distortion'}
                </span>
              </div>

              {mode === 'agentic' ? (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center space-x-2 text-emerald-400">
                      <ChatTeardropDots size={18} />
                      <span className="font-bold">Raw Customer Voice & Discord Telemetry</span>
                    </div>
                    <span className="text-zinc-400">Instant Event Stream</span>
                  </div>

                  <div className="text-center text-amber-400 text-xs font-mono font-bold">
                    ▼ Ambient Meeting-Transcript & Log Agents (Zero Filtering) ▼
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-900 border border-amber-500/40 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center space-x-2 text-white">
                      <Eye size={18} className="text-amber-400" />
                      <span className="font-bold">Founder Field of Vision Dashboard</span>
                    </div>
                    <span className="text-emerald-400 font-bold">99.4% Truth Fidelity</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300">
                    01. Raw Customer Friction in Sales Call (100% Truth)
                  </div>
                  <div className="text-center text-zinc-500 text-[10px] font-mono">▼ Filtered through Account Executive (80% Truth) ▼</div>
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-400">
                    02. Sales Manager Pipeline Review (55% Truth, bad news softened)
                  </div>
                  <div className="text-center text-zinc-500 text-[10px] font-mono">▼ Filtered through VP Product Monthly Sync (30% Truth) ▼</div>
                  <div className="p-2.5 rounded-lg bg-red-950/20 border border-red-500/30 text-xs font-mono text-red-300">
                    03. CEO Quarterly Strategy Deck (15% Truth, cosmetic vanity metrics)
                  </div>
                </div>
              )}
            </div>

            {/* Strategic Summary Callout */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 text-xs font-sans text-zinc-300 leading-relaxed">
              <span className="text-white font-bold">The Takeaway:</span> By replacing middle-management reporting chains with automated agentic transcript synthesis, a 4-person startup moves with 100x the agility and 1/10th the burn of a 100-person incumbent.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
