import React from 'react';
import { 
  Play, 
  ArrowRight, 
  Cpu, 
  Quotes,
  Lightning,
  ArrowsClockwise
} from '@phosphor-icons/react';

interface HeroProps {
  onOpenVideo: (seconds?: number) => void;
  onExploreThemes: () => void;
  onLaunchSkillify: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenVideo,
  onExploreThemes,
  onLaunchSkillify
}) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top telemetry badge */}
        <div className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-amber-500/30 mb-8 backdrop-blur-md">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="text-xs font-mono text-amber-300 font-medium tracking-wide">
            GARRY TAN // EXECUTIVE BLUEPRINT // YC PERSPECTIVE
          </span>
          <span className="text-zinc-500">|</span>
          <span className="text-[11px] font-mono text-zinc-400">
            51 MIN MASTERCLASS
          </span>
        </div>

        {/* Main Asymmetrical Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          <div className="lg:col-span-8">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight leading-[1.05] text-white uppercase">
              EARNESTNESS <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
                OVER ORTHODOXY.
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-zinc-300 font-sans leading-relaxed max-w-2xl">
              The economics of company building have permanently shifted. Small 3-person teams now orchestrate hundreds of autonomous agentic loops. Every business process is turning into a version-controlled <span className="font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">SKILL.md</span> file.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onLaunchSkillify}
                className="flex items-center space-x-2.5 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-sm transition-all shadow-[0_0_25px_rgba(245,158,11,0.35)] active:scale-98"
              >
                <Cpu size={18} weight="bold" />
                <span>Launch "Skillify" Playground</span>
                <ArrowRight size={16} weight="bold" />
              </button>

              <button
                onClick={() => onOpenVideo(0)}
                className="flex items-center space-x-2.5 px-5 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-amber-500/40 text-white font-medium text-sm transition-all"
              >
                <Play size={16} weight="fill" className="text-amber-400" />
                <span>Watch Interview Video (0:00 - 51:28)</span>
              </button>

              <button
                onClick={onExploreThemes}
                className="flex items-center space-x-1.5 text-xs font-mono text-zinc-400 hover:text-white px-3 py-2 transition-colors"
              >
                <span>Read 5 Core Chapters</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* Right Side Tactical Manifesto Card */}
          <div className="lg:col-span-4">
            <div className="glass-panel-amber p-6 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3 opacity-10 pointer-events-none">
                <Quotes size={120} weight="fill" className="text-amber-400" />
              </div>

              <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 mb-3">
                <Quotes size={16} weight="fill" />
                <span className="font-bold tracking-wider uppercase">Direct Quote // Garry Tan</span>
              </div>

              <blockquote className="text-sm font-sans text-zinc-200 leading-relaxed italic mb-4">
                "Earnestness is the courage to follow your own direct, unmediated experience rather than consensus orthodoxy. With meeting-transcript agents and agentic loops, an entire company now fits in a single founder's field of vision."
              </blockquote>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Garry Tan</div>
                  <div className="text-[11px] font-mono text-zinc-400">President & CEO, Y Combinator</div>
                </div>
                <div className="text-[10px] font-mono px-2 py-1 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
                  YC Playbook
                </div>
              </div>
            </div>

            {/* Quick Live Stats Ticker */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-white/10">
                <div className="flex items-center space-x-1.5 text-emerald-400 text-xs font-mono mb-1">
                  <Lightning size={14} weight="fill" />
                  <span>Cycle Latency</span>
                </div>
                <div className="text-lg font-bold font-mono text-white">4 Minutes</div>
                <div className="text-[10px] text-zinc-400">vs 14-day 2015 corp loops</div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-white/10">
                <div className="flex items-center space-x-1.5 text-amber-400 text-xs font-mono mb-1">
                  <ArrowsClockwise size={14} weight="fill" />
                  <span>Adoption Horizon</span>
                </div>
                <div className="text-lg font-bold font-mono text-white">20+ Years</div>
                <div className="text-[10px] text-zinc-400">"The White Pill" moat</div>
              </div>
            </div>

          </div>

        </div>

        {/* 5-Theme Quick Jump Strip */}
        <div className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { num: '01', title: 'Founder Psychology', time: '00:26', tag: 'Earnestness' },
            { num: '02', title: 'The New Playbook', time: '13:54', tag: 'Skill.md' },
            { num: '03', title: 'The Agentic Company', time: '28:09', tag: 'Field of Vision' },
            { num: '04', title: 'The "White Pill"', time: '39:08', tag: 'Enterprise Moats' },
            { num: '05', title: 'Local Governance', time: '44:44', tag: 'Civic Flywheel' },
          ].map((ch, idx) => (
            <div
              key={idx}
              onClick={onExploreThemes}
              className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-amber-500/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1">
                <span className="text-amber-400 font-bold group-hover:glow-amber">{ch.num} //</span>
                <span>{ch.time}</span>
              </div>
              <div className="text-xs font-semibold text-zinc-200 group-hover:text-white truncate">
                {ch.title}
              </div>
              <div className="text-[10px] font-mono text-zinc-400 mt-1">
                {ch.tag}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
