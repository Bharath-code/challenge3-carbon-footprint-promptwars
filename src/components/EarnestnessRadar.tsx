import React, { useState } from 'react';
import { DIAGNOSTIC_QUESTIONS, FOUNDER_ARCHETYPES } from '../data/diagnosticQuestions';
import { 
  Sparkle, 
  CheckCircle, 
  ArrowsClockwise, 
  ShareNetwork,
  Check,
  Target
} from '@phosphor-icons/react';

export const EarnestnessRadar: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, number>>({
    1: 4,
    2: 4,
    3: 4,
    4: 4,
    5: 4
  });
  const [copied, setCopied] = useState(false);

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);

  // Compute Archetype
  let activeArchetypeKey = 'earnest-pragmatist';
  if (totalScore >= 21) activeArchetypeKey = 'hyper-builder';
  else if (totalScore >= 15) activeArchetypeKey = 'earnest-pragmatist';
  else if (totalScore >= 9) activeArchetypeKey = 'consensus-chaser';
  else activeArchetypeKey = 'bureaucracy-bound';

  const archetype = FOUNDER_ARCHETYPES[activeArchetypeKey];

  const handleSelectOption = (questionId: number, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const handleShareReport = () => {
    const text = `🎯 My Founder Earnestness Score: ${totalScore}/25 (${archetype.title})\nEvaluated with Garry Tan's Agentic Startup Playbook.\nCheck yours: ${window.location.href}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setAnswers({ 1: 3, 2: 3, 3: 3, 4: 3, 5: 3 });
  };

  return (
    <section id="diagnostic" className="py-20 bg-[#08080a] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-2">
            <Sparkle size={15} weight="fill" />
            <span>Section 05 // Tactical Self-Assessment</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            THE EARNESTNESS RADAR
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-400 font-sans max-w-2xl">
            Evaluate your operational instinct against Garry Tan's 5 core axes: Experiential Truth, Agentic Leverage, Field of Vision, Adoption Patience, and Civic Grounding.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 5 Interactive Diagnostic Questions */}
          <div className="lg:col-span-7 space-y-6">
            {DIAGNOSTIC_QUESTIONS.map((q) => {
              const currentVal = answers[q.id] || 3;
              return (
                <div key={q.id} className="p-5 rounded-2xl bg-zinc-950 border border-white/10">
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-amber-400 font-bold uppercase">AXIS 0{q.id}: {q.dimension}</span>
                    <span className="text-zinc-400">Score: {currentVal}/5</span>
                  </div>

                  <h3 className="text-base font-semibold text-white mb-1">
                    {q.question}
                  </h3>

                  <p className="text-xs text-zinc-400 mb-4">
                    {q.context}
                  </p>

                  {/* Option Choices */}
                  <div className="space-y-2">
                    {q.options.map((opt, idx) => {
                      const isSelected = currentVal === opt.score;
                      return (
                        <div
                          key={idx}
                          onClick={() => handleSelectOption(q.id, opt.score)}
                          className={`p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-400/10 border-amber-400/80 text-white shadow-[0_0_12px_rgba(245,158,11,0.15)] ring-1 ring-amber-400/30'
                              : 'bg-zinc-900/60 border-white/5 text-zinc-300 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-start space-x-2.5">
                            <span className={`w-4 h-4 rounded-full flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5 ${
                              isSelected ? 'bg-amber-400 text-black font-bold' : 'bg-white/10 text-zinc-400'
                            }`}>
                              {opt.score}
                            </span>
                            <div>
                              <div className="font-medium text-zinc-200">{opt.label}</div>
                              <div className="text-[11px] text-zinc-400 mt-0.5">{opt.description}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Live Founder Archetype Dossier */}
          <div className="lg:col-span-5 sticky top-24 space-y-6">
            
            <div className="glass-panel-amber p-6 sm:p-7 rounded-2xl border border-amber-500/30 relative">
              
              <div className="flex items-center justify-between text-xs font-mono mb-3">
                <span className="text-amber-400 font-bold uppercase tracking-wider">
                  Diagnostic Result
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  Total Score: <strong className="text-amber-400 text-sm font-black">{totalScore}</strong> / 25
                </span>
              </div>

              {/* Archetype Badge */}
              <div className="inline-block px-2.5 py-1 rounded-md bg-amber-400/15 border border-amber-400/40 text-amber-300 font-mono text-[11px] font-bold mb-3">
                {archetype.badge}
              </div>

              <h3 className="text-2xl font-display font-black text-white tracking-tight">
                {archetype.title}
              </h3>

              <p className="text-xs font-mono text-amber-200 mt-1 italic">
                "{archetype.tagline}"
              </p>

              <p className="text-xs sm:text-sm font-sans text-zinc-300 leading-relaxed mt-4">
                {archetype.description}
              </p>

              {/* Superpowers */}
              <div className="mt-5 pt-4 border-t border-white/10">
                <div className="text-xs font-mono text-emerald-400 uppercase font-bold mb-2 flex items-center space-x-1.5">
                  <CheckCircle size={14} weight="fill" />
                  <span>Core Superpowers</span>
                </div>
                <ul className="space-y-1.5">
                  {archetype.superpowers.map((sp, idx) => (
                    <li key={idx} className="text-xs text-zinc-200 flex items-start space-x-2">
                      <span className="text-emerald-400 font-bold">›</span>
                      <span>{sp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Garry Tan Directives */}
              <div className="mt-5 pt-4 border-t border-white/10">
                <div className="text-xs font-mono text-amber-400 uppercase font-bold mb-2 flex items-center space-x-1.5">
                  <Target size={14} weight="bold" />
                  <span>Garry Tan Action Directives</span>
                </div>
                <ul className="space-y-1.5">
                  {archetype.tanDirectives.map((dir, idx) => (
                    <li key={idx} className="text-xs text-zinc-200 flex items-start space-x-2">
                      <span className="text-amber-400 font-bold">›</span>
                      <span>{dir}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action buttons */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center space-x-3">
                <button
                  onClick={handleShareReport}
                  className="flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs font-mono transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                >
                  {copied ? <Check size={16} /> : <ShareNetwork size={16} />}
                  <span>{copied ? 'Report Copied!' : 'Copy Assessment Card'}</span>
                </button>

                <button
                  onClick={handleReset}
                  className="p-2.5 rounded-xl bg-zinc-900 border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white transition-all text-xs"
                  title="Reset Scores"
                >
                  <ArrowsClockwise size={16} />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
