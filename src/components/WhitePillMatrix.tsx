import React, { useState } from 'react';
import { 
  Lightning, 
  ShieldCheck, 
  ClockCountdown, 
  TrendUp, 
  Buildings, 
  WarningCircle, 
  LockKey
} from '@phosphor-icons/react';

export const WhitePillMatrix: React.FC = () => {
  const [selectedEra, setSelectedEra] = useState<'internet' | 'cloud' | 'agentic'>('agentic');

  const ERAS = {
    internet: {
      title: 'The Internet Wave (1994 – 2015)',
      span: '21 Years to Mainstream Enterprise Maturity',
      narrative: 'When Netscape launched in 1994, tech enthusiasts predicted instant extinction of brick-and-mortar retail and paper banking. In reality, Walmart, JPMorgan, and healthcare systems took two decades to fully migrate. The builders who endured built trillion-dollar compounding platforms.',
      moatFactor: 'Protocol Standard & Data Infrastructure',
      hypeVsRealityRatio: '15x Hype Lead Time'
    },
    cloud: {
      title: 'The SaaS & Cloud Wave (2006 – 2022)',
      span: '16 Years from AWS S3 to Fortune 500 Hybrid Cloud',
      narrative: 'Cloud computing was dismissed by enterprise CIOs for years due to data residency and security fears. That friction gave Salesforce, ServiceNow, and Datadog the runway to entrench themselves into enterprise workflows before legacy vendors caught on.',
      moatFactor: 'System of Record & Multi-Tenant Data Lock-in',
      hypeVsRealityRatio: '10x Hype Lead Time'
    },
    agentic: {
      title: 'The Agentic AI Wave (2024 – 2045)',
      span: '20+ Year Multi-Decade Institutional Rollout',
      narrative: 'While social media expects the global economy to be rewritten overnight, real institutions (banks, hospitals, defense, logistics) operate under strict legal, compliance, and cultural friction. This is the "White Pill": it gives earnest founders time to build deep, unassailable workflow moats.',
      moatFactor: 'Agentic Skill Repositories, Telemetry Loops & Enterprise Integrations',
      hypeVsRealityRatio: '25x Hype Lead Time'
    }
  };

  return (
    <section id="white-pill" className="py-20 bg-[#070709] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-2">
            <Lightning size={15} weight="fill" />
            <span>Section 04 // Market Dynamics</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            THE "WHITE PILL" MATRIX
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-400 font-sans max-w-2xl">
            Garry Tan's antidote to AI panic: societal and enterprise adoption is a gradual, multi-decade wave. Institutional friction protects true builders from instant commoditization.
          </p>
        </div>

        {/* Era Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-zinc-950 rounded-2xl border border-white/10 w-fit">
          <button
            onClick={() => setSelectedEra('internet')}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
              selectedEra === 'internet' ? 'bg-amber-400 text-black font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Wave 1: The Internet (1994-2015)
          </button>
          <button
            onClick={() => setSelectedEra('cloud')}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
              selectedEra === 'cloud' ? 'bg-amber-400 text-black font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Wave 2: Cloud & SaaS (2006-2022)
          </button>
          <button
            onClick={() => setSelectedEra('agentic')}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
              selectedEra === 'agentic' ? 'bg-amber-400 text-black font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Wave 3: The Agentic Wave (2024-2045)
          </button>
        </div>

        {/* Deep Era Dossier Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-2xl border border-white/10">
            <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 mb-2">
              <ClockCountdown size={14} />
              <span>{ERAS[selectedEra].span}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-black text-white mb-4">
              {ERAS[selectedEra].title}
            </h3>

            <p className="text-sm sm:text-base font-sans text-zinc-300 leading-relaxed mb-6">
              {ERAS[selectedEra].narrative}
            </p>

            <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-[11px] font-mono text-zinc-400 uppercase">Primary Structural Moat</div>
                <div className="text-xs font-mono text-emerald-400 font-bold mt-1">
                  {ERAS[selectedEra].moatFactor}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-mono text-zinc-400 uppercase">Hype vs Actual Adoption Gap</div>
                <div className="text-xs font-mono text-amber-400 font-bold mt-1">
                  {ERAS[selectedEra].hypeVsRealityRatio}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contrast Box (Wrapper App vs Earnest Moat) */}
          <div className="lg:col-span-4 space-y-4">
            
            <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/30">
              <div className="flex items-center space-x-2 text-red-400 text-xs font-mono font-bold mb-2">
                <WarningCircle size={16} />
                <span>The Hype Doom Trap (Thin Wrappers)</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Thin wrapper tools with no deep workflow integration get commoditized with every foundation model release. Zero structural moat.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-mono font-bold mb-2">
                <ShieldCheck size={16} />
                <span>The "White Pill" Moat (Earnest Architecture)</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Companies embedding complex multi-agent loops into enterprise compliance, security, and internal telemetry compound for 10-20 years.
              </p>
            </div>

          </div>

        </div>

        {/* 4 Pillars of the White Pill */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-zinc-950 border border-white/10">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
              <Buildings size={18} />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Institutional Inertia</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Real enterprises require SOC2, HIPAA, procurement reviews, and change management. This slows down incumbents, giving startups time to build deep relationships.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-950 border border-white/10">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
              <LockKey size={18} />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Workflow Entrenchment</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Once an enterprise skillifies its proprietary business processes into your agentic loops, switching costs approach infinity.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-950 border border-white/10">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
              <TrendUp size={18} />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Superlinear Compounding</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              As foundation models improve, your agentic markdown skills automatically execute faster and cheaper without rewriting your application code.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
