import React, { useState } from 'react';
import { PLAYBOOK_CHAPTERS } from '../data/chapters';
import { 
  Play, 
  Quotes, 
  CheckCircle, 
  Function, 
  Tag, 
  CaretRight, 
  Lightbulb
} from '@phosphor-icons/react';

interface ChapterViewerProps {
  onOpenVideo: (seconds: number) => void;
}

export const ChapterViewer: React.FC<ChapterViewerProps> = ({ onOpenVideo }) => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>(PLAYBOOK_CHAPTERS[0].id);

  const currentChapter = PLAYBOOK_CHAPTERS.find((c) => c.id === selectedChapterId) || PLAYBOOK_CHAPTERS[0];

  return (
    <section id="chapters" className="py-20 bg-[#08080a] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-2">
              <span>Section 01</span>
              <span>//</span>
              <span>The Five Strategic Pillars</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
              DEEP TRANSCRIPT & THEMES
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-400 font-sans max-w-xl">
              Unfiltered analysis and tactical mental models derived from Garry Tan's 51-minute masterclass.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <span className="text-xs font-mono text-zinc-400">Total Runtime:</span>
            <span className="text-xs font-mono px-2 py-1 bg-white/5 rounded border border-white/10 text-white font-bold">
              51:28
            </span>
          </div>
        </div>

        {/* Two-Column Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Chapter List / Selector */}
          <div className="lg:col-span-4 space-y-3">
            {PLAYBOOK_CHAPTERS.map((chapter) => {
              const isSelected = chapter.id === currentChapter.id;
              return (
                <div
                  key={chapter.id}
                  onClick={() => setSelectedChapterId(chapter.id)}
                  className={`p-4 rounded-xl transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-zinc-900 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/20'
                      : 'bg-zinc-950/60 border-white/5 hover:bg-zinc-900/60 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className={`font-bold ${isSelected ? 'text-amber-400' : 'text-zinc-400'}`}>
                      CHAPTER {chapter.number}
                    </span>
                    <span className="text-zinc-400">{chapter.timestamp.split('–')[0]}</span>
                  </div>

                  <h3 className={`text-sm font-semibold tracking-tight ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                    {chapter.title}
                  </h3>

                  <p className="text-xs text-zinc-400 mt-1 line-clamp-1">
                    {chapter.subtitle}
                  </p>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/5 text-[11px] font-mono">
                    <span className="text-zinc-400">{chapter.duration}</span>
                    <div className="flex items-center space-x-1 text-amber-400 font-medium">
                      <span>Inspect</span>
                      <CaretRight size={12} weight="bold" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Deep Chapter Dossier */}
          <div className="lg:col-span-8">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 relative">
              
              {/* Header inside dossier */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 mb-1">
                    <span>PILLAR {currentChapter.number}</span>
                    <span>•</span>
                    <span>TIMESTAMP: {currentChapter.timestamp}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
                    {currentChapter.title}
                  </h3>
                  <p className="text-sm font-mono text-zinc-400 mt-1">
                    {currentChapter.subtitle}
                  </p>
                </div>

                <button
                  onClick={() => onOpenVideo(currentChapter.startSeconds)}
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs font-mono transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] active:scale-95"
                >
                  <Play size={14} weight="fill" />
                  <span>Play at {currentChapter.timestamp.split('–')[0].trim()}</span>
                </button>
              </div>

              {/* Direct Quote Block */}
              <div className="my-6 p-5 rounded-xl bg-amber-500/[0.04] border border-amber-500/20 relative">
                <div className="flex items-start space-x-3">
                  <Quotes size={28} weight="fill" className="text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <blockquote className="text-sm sm:text-base font-sans text-zinc-100 italic leading-relaxed">
                      "{currentChapter.quote}"
                    </blockquote>
                    <p className="mt-2 text-xs font-mono text-zinc-400">
                      Context: {currentChapter.quoteContext}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mental Model Formula Box */}
              <div className="my-6 p-5 rounded-xl bg-zinc-950 border border-white/10">
                <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 mb-2">
                  <Function size={16} weight="bold" />
                  <span className="font-bold uppercase tracking-wider">
                    Mental Model // {currentChapter.mentalModel.name}
                  </span>
                </div>
                
                <div className="p-3 rounded bg-zinc-900/90 font-mono text-xs sm:text-sm text-amber-300 font-bold border border-amber-500/20 my-2 overflow-x-auto">
                  {currentChapter.mentalModel.equation}
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {currentChapter.mentalModel.description}
                </p>
              </div>

              {/* Deep Dive Breakdown */}
              <div className="my-6">
                <h4 className="text-xs font-mono text-zinc-300 uppercase tracking-widest mb-3 flex items-center space-x-2">
                  <Lightbulb size={16} className="text-amber-400" />
                  <span>Strategic Analysis & Trench Truths</span>
                </h4>
                
                <div className="space-y-3">
                  {currentChapter.deepDive.map((point, idx) => {
                    const [head, ...rest] = point.split(':');
                    return (
                      <div key={idx} className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 text-sm text-zinc-300">
                        <strong className="text-white font-semibold">{head}:</strong>
                        <span className="text-zinc-400 ml-1">{rest.join(':')}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tactical Rules Grid */}
              <div className="my-6">
                <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3 flex items-center space-x-2">
                  <CheckCircle size={16} weight="fill" />
                  <span>Actionable Execution Rules</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentChapter.tacticalRules.map((rule, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-emerald-950/10 border border-emerald-500/20 text-xs text-zinc-200 flex items-start space-x-2">
                      <span className="text-emerald-400 font-mono font-bold mt-0.5">0{idx + 1}.</span>
                      <span className="leading-relaxed">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Metrics Strip */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-3">
                {currentChapter.metrics.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-zinc-950 border border-white/10 text-center">
                    <div className="text-xs font-mono text-zinc-400">{m.label}</div>
                    <div className="text-lg font-bold font-mono text-white mt-0.5">{m.value}</div>
                    <div className="text-[10px] text-zinc-400">{m.sub}</div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {currentChapter.tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 text-zinc-300 border border-white/10 flex items-center space-x-1">
                    <Tag size={10} />
                    <span>#{tag}</span>
                  </span>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
