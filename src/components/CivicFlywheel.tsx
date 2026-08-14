import React, { useState } from 'react';
import { 
  Buildings, 
  ShieldCheck, 
  UsersThree, 
  RocketLaunch, 
  ArrowRight, 
  Quotes,
  MapPin
} from '@phosphor-icons/react';

export const CivicFlywheel: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const STEPS = [
    {
      id: 0,
      title: '01. Pragmatic Civic Governance & Safety',
      icon: ShieldCheck,
      color: 'text-amber-400',
      description: 'Functional municipal governance, sensible law enforcement, and zero corruption ensure that founders, researchers, and families feel physically safe walking streets at night.',
      tanQuote: 'You cannot build the digital future if the physical world outside your front door is decaying. Software engineers must vote and engage locally.'
    },
    {
      id: 1,
      title: '02. Abundant Housing & Clean Infrastructure',
      icon: Buildings,
      color: 'text-cyan-400',
      description: 'Deregulating housing construction and investing in clean, reliable public transit lowers the cost of living, allowing young, hungry builders to move to tech hubs without immediate corporate sponsorship.',
      tanQuote: 'When cities make it illegal to build housing, they artificially suffocate their own talent pipeline.'
    },
    {
      id: 2,
      title: '03. Extreme In-Person Talent Density',
      icon: UsersThree,
      color: 'text-emerald-400',
      description: 'Physical proximity creates high-bandwidth serendipity: late-night hacking sessions, whiteboard architecture debates, and founder dinners that cannot be replicated across Zoom.',
      tanQuote: 'The world\'s most ambitious founders will always cluster physically where they can find their peers.'
    },
    {
      id: 3,
      title: '04. Generational Breakthrough Companies',
      icon: RocketLaunch,
      color: 'text-purple-400',
      description: 'The flywheel completes: high-density clusters produce trillion-dollar breakthroughs (OpenAI, Anthropic, Stripe, YC ecosystem), which then re-invest civic capital back into the city.',
      tanQuote: 'Silicon Valley is not a geography—it is a self-renewing, high-trust physical community.'
    }
  ];

  return (
    <section id="civic" className="py-20 bg-[#070709] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-2">
            <MapPin size={15} weight="bold" />
            <span>Section 06 // The Physical World</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            THE CIVIC & PHYSICAL FLYWHEEL
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-400 font-sans max-w-2xl">
            Why Garry Tan fights for San Francisco local politics: digital miracles cannot survive without a thriving, safe, and pragmatic physical civilization.
          </p>
        </div>

        {/* 4-Step Interactive Horizontal Cascade */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isSelected = activeStep === step.id;
            return (
              <div
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-900 border-amber-400/80 shadow-[0_0_20px_rgba(245,158,11,0.2)] ring-1 ring-amber-400/30'
                    : 'bg-zinc-950/60 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                  <Icon size={20} className={step.color} weight={isSelected ? 'fill' : 'regular'} />
                </div>

                <h3 className="text-sm font-bold text-white mb-1">
                  {step.title}
                </h3>

                <p className="text-xs text-zinc-400 line-clamp-2">
                  {step.description}
                </p>

                <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-amber-400">
                  <span>{isSelected ? 'Active Node' : 'Inspect'}</span>
                  <ArrowRight size={12} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Node Detail Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="text-xs font-mono text-amber-400 uppercase">
                Active Flywheel Stage: Node 0{STEPS[activeStep].id + 1}
              </div>
              <h3 className="text-2xl font-display font-black text-white mt-1">
                {STEPS[activeStep].title}
              </h3>
            </div>

            <div className="px-3 py-1.5 rounded-lg bg-amber-400/10 border border-amber-400/20 text-xs font-mono text-amber-300 font-bold">
              The "Act Local" Imperative
            </div>
          </div>

          <div className="my-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <p className="text-sm font-sans text-zinc-300 leading-relaxed">
              {STEPS[activeStep].description}
            </p>

            <div className="p-4 rounded-xl bg-zinc-950 border border-amber-500/20 relative">
              <div className="flex items-start space-x-2 text-xs font-mono text-zinc-300 italic">
                <Quotes size={20} weight="fill" className="text-amber-400 shrink-0 mt-0.5" />
                <span>"{STEPS[activeStep].tanQuote}"</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
