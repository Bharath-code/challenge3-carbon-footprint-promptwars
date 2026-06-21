import { ArrowDown, ChartBar } from '@phosphor-icons/react';

export function Hero() {
  return (
    <section className="w-full min-h-[calc(100dvh-80px)] flex flex-col md:flex-row brutalist-border-thin bg-white overflow-hidden">
      {/* Left Column: Text Content */}
      <div className="flex-1 flex flex-col justify-center p-8 md:p-16 border-b-4 md:border-b-0 md:border-r-4 border-black bg-white">
        <div className="max-w-xl flex flex-col gap-6">
          <div className="font-mono text-xs uppercase tracking-widest font-black text-black">
            [ SEC.00 // ACCOUNTING CORE ]
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-black uppercase leading-[0.9] tracking-tighter text-black">
            Track your output.<br />
            Offset the ledger.
          </h1>
          
          <p className="text-lg md:text-xl font-mono text-brutalist-gray leading-relaxed max-w-[45ch]">
            Calculate emissions from transport, energy, and diet. Target reductions using active logs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <a
              href="#calculator"
              className="brutalist-btn px-8 py-4 text-base flex items-center justify-center gap-2 font-bold"
            >
              <ChartBar size={20} weight="bold" />
              <span>Start calculation</span>
            </a>
            
            <a
              href="#ledger"
              className="brutalist-btn-secondary px-8 py-4 text-base flex items-center justify-center gap-2 font-bold"
            >
              <span>View actions</span>
              <ArrowDown size={20} weight="bold" />
            </a>
          </div>
        </div>
      </div>

      {/* Right Column: Industrial Brutalist Graphic */}
      <div className="flex-1 bg-brutalist-bg flex items-center justify-center p-6 md:p-12 relative overflow-hidden min-h-[350px] md:min-h-0">
        <div className="w-full h-full max-w-[500px] max-h-[500px] brutalist-border bg-white brutalist-shadow-lg relative overflow-hidden flex items-center justify-center">
          <img
            src="/hero_brutalist_grid.png"
            alt="Global Carbon Matrix Blueprint"
            className="w-full h-full object-cover filter grayscale contrast-125"
          />
          <div className="absolute bottom-4 left-4 bg-black text-brutalist-accent text-[10px] font-mono px-2.5 py-1 brutalist-border-thin font-bold uppercase tracking-wider">
            GRID.REF: 48.8566 / 2.3522
          </div>
        </div>
      </div>
    </section>
  );
}
