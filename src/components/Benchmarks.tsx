import type { SectorBreakdown } from '../utils/carbonCalculator';
import { AirplaneTilt, Users, Tree } from '@phosphor-icons/react';

interface BenchmarksProps {
  breakdown: SectorBreakdown;
}

export function Benchmarks({ breakdown }: BenchmarksProps) {
  const userTons = breakdown.total / 1000;
  
  // Benchmark values in metric tons per year
  const BENCHMARKS = [
    { id: 'un', name: 'UN Paris Target', val: 2.0, color: 'bg-brutalist-accent' },
    { id: 'global', name: 'Global Average', val: 4.7, color: 'bg-zinc-300' },
    { id: 'user', name: 'Your Footprint', val: userTons, color: 'bg-black text-white border-brutalist-accent' },
    { id: 'us', name: 'US Average', val: 16.0, color: 'bg-zinc-400' },
  ];

  // Sort benchmarks by value for the visual leaderboard
  const sortedBenchmarks = [...BENCHMARKS].sort((a, b) => a.val - b.val);

  // Maximum value for linear scaling in the normal comparison (16.0 tons is US average)
  const maxScaleVal = 20.0;
  const getWidthPercent = (val: number) => {
    return Math.min(100, (val / maxScaleVal) * 100);
  };

  // Taylor Swift Private Jet calculation (approx 8,290 tons CO2e per year)
  const TS_JET_EMISSIONS = 8290.0;
  const yearsToMatchTS = userTons > 0 ? Math.round(TS_JET_EMISSIONS / userTons) : 9999;

  return (
    <section id="benchmarks" className="w-full py-16 px-6 max-w-7xl mx-auto border-t-4 border-black">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <div className="bg-black text-white p-2.5 brutalist-border-thin">
            <span className="font-mono text-sm font-black">[ 05 ]</span>
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight">
            Emissions comparison ledger
          </h2>
        </div>

        <p className="font-mono text-sm text-brutalist-gray max-w-[65ch]">
          Contextualize your footprint. See how your net annual emissions stack up against climate thresholds, global baselines, and extreme carbon outliers.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Visual Leaderboard Card */}
          <div className="lg:col-span-2 brutalist-card p-6 bg-white flex flex-col gap-6">
            <h3 className="font-mono font-black uppercase text-sm border-b-2 border-black pb-2 flex items-center gap-2">
              <Users size={18} weight="bold" />
              <span>Normal range comparative visualizer</span>
            </h3>

            <div className="flex flex-col gap-6 pt-2">
              {sortedBenchmarks.map((bench) => {
                const isUser = bench.id === 'user';
                
                return (
                  <div key={bench.id} className="flex flex-col gap-2">
                    <div className="flex justify-between font-mono text-xs font-black uppercase">
                      <span className={isUser ? 'text-black font-black' : 'text-brutalist-gray'}>
                        {isUser ? '[ YOU ] ' : ''}{bench.name}
                      </span>
                      <span className="font-bold">{bench.val.toFixed(1)} t CO2e/yr</span>
                    </div>

                    <div className="w-full h-8 bg-zinc-100 brutalist-border-thin border-black rounded-none overflow-hidden relative">
                      <div
                        className={`h-full brutalist-border-thin border-y-0 border-l-0 border-r-4 border-black transition-all duration-300 ${bench.color}`}
                        style={{ width: `${getWidthPercent(bench.val)}%` }}
                      >
                        {isUser && (
                          <div className="absolute right-2 top-1.5 font-mono text-[9px] font-black uppercase px-1.5 py-0.5 bg-black text-brutalist-accent">
                            Active
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Visualizer Scale Label */}
            <div className="flex justify-between font-mono text-[9px] text-brutalist-gray border-t border-black pt-2 uppercase">
              <span>0.0 t</span>
              <span>5.0 t</span>
              <span>10.0 t</span>
              <span>15.0 t</span>
              <span>20.0 t (Scale Max)</span>
            </div>
          </div>

          {/* Extreme Outlier Comparator Card */}
          <div className="brutalist-card p-6 bg-black text-white flex flex-col gap-6">
            <h3 className="font-mono font-black uppercase text-sm border-b border-zinc-800 pb-2 text-brutalist-accent flex items-center gap-2">
              <AirplaneTilt size={18} weight="bold" />
              <span>Extreme carbon comparisons</span>
            </h3>

            <div className="flex-1 flex flex-col justify-center gap-4 py-4">
              <div className="border border-zinc-800 p-4 bg-zinc-950/40">
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block">
                  TAYLOR SWIFT PRIVATE JET OUTPUT:
                </span>
                <span className="text-3xl font-black font-mono text-white block mt-1">
                  8,290.0 t CO2e
                </span>
                <span className="font-mono text-[9px] text-zinc-500 block mt-0.5">
                  Est. annual emissions from aviation transit
                </span>
              </div>

              <div className="font-mono text-xs leading-relaxed uppercase">
                At your current rate of <span className="text-brutalist-accent font-bold">{(breakdown.total / 1000).toFixed(2)} t</span> emissions per year:
                <div className="text-4xl font-black text-white my-3 font-sans border-y border-zinc-800 py-3 tracking-tighter">
                  {yearsToMatchTS.toLocaleString()} <span className="text-sm font-mono text-brutalist-accent block mt-1">YEARS TO MATCH ONE YEAR OF HER JET</span>
                </div>
                It would take you over {yearsToMatchTS.toLocaleString()} years to match her private jet emissions.
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-4 font-mono text-[9px] text-zinc-400 flex items-start gap-2">
              <Tree size={16} className="text-brutalist-accent flex-shrink-0" />
              <span>
                Comparisons emphasize structural carbon inequality. Direct policy changes and carbon offsets are vital alongside individual pledges.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
