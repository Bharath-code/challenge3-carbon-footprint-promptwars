import { useEffect, useState } from 'react';
import type { SectorBreakdown, CarbonInputs } from '../utils/carbonCalculator';
import { TerminalWindow, Warning, CheckCircle } from '@phosphor-icons/react';

interface InsightsProps {
  inputs: CarbonInputs;
  breakdown: SectorBreakdown;
  activeActionsCount: number;
}

export function Insights({ inputs, breakdown, activeActionsCount }: InsightsProps) {
  const [terminalText, setTerminalText] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      // Analyze sectors to find highest contributor
      const sectors = [
        { name: 'TRANSPORTATION', val: breakdown.transport },
        { name: 'HOUSEHOLD ENERGY', val: breakdown.energy },
        { name: 'FOOD DIET', val: breakdown.diet },
        { name: 'CONSUMPTION & WASTE', val: breakdown.waste },
      ];
      
      const highest = sectors.reduce((prev, current) => (prev.val > current.val ? prev : current));
      
      const lines = [
        `Initializing Carbon Ledger Analyzer v1.4.2...`,
        `Analyzing user configuration profile...`,
        `[OK] Total Carbon Footprint Calculated: ${(breakdown.total / 1000).toFixed(2)} t CO2e/year`,
        ` `,
        `[SECTOR ANALYSIS ANALYSIS]`,
        `- Transport Sector Output: ${breakdown.transport} kg/yr`,
        `- Household Energy Output: ${breakdown.energy} kg/yr`,
        `- Diet Pathway Output: ${breakdown.diet} kg/yr`,
        `- Waste/Shopping Output: ${breakdown.waste} kg/yr`,
        ` `,
        `[PRIMARY DRIVER DETECTED: ${highest.name}]`,
      ];

      // Personalized insight text based on highest contributor
      if (highest.name === 'TRANSPORTATION') {
        lines.push(
          `Transport accounts for ${Math.round((breakdown.transport / breakdown.total) * 100)}% of total emissions.`,
          `Primary drivers: Vehicle mileage (${inputs.carMilesPerYear} mi/yr) & flight time (${inputs.flightHoursShort + inputs.flightHoursLong}h).`,
          ` `,
          `[ACTION PLAN SUGGESTED]`,
          `1. Switch to public transit or bike commute to reduce miles.`,
          `2. Consider hybrid/electric transition for vehicle powertrain.`,
          `3. Consolidate short-haul flights to minimize radiative forcing.`
        );
      } else if (highest.name === 'HOUSEHOLD ENERGY') {
        lines.push(
          `Energy accounts for ${Math.round((breakdown.energy / breakdown.total) * 100)}% of total emissions.`,
          `Household size: ${inputs.householdSize} occupants. Average sharing ratio active.`,
          ` `,
          `[ACTION PLAN SUGGESTED]`,
          `1. Shift to a 100% renewable energy grid option or solar.`,
          `2. Configure smart thermostats to adjust thermal load cycles.`,
          `3. Line-dry clothes to bypass high-draw dryer appliance usage.`
        );
      } else if (highest.name === 'FOOD DIET') {
        lines.push(
          `Diet accounts for ${Math.round((breakdown.diet / breakdown.total) * 100)}% of total emissions.`,
          `Current diet configuration: ${inputs.dietType.toUpperCase()}.`,
          ` `,
          `[ACTION PLAN SUGGESTED]`,
          `1. Transition to plant-based days (Meatless Mondays minimum).`,
          `2. Reduce red meat purchases, shifting towards lower-carbon proteins.`,
          `3. Prioritize local food hubs to limit transit packaging.`
        );
      } else {
        lines.push(
          `Waste accounts for ${Math.round((breakdown.waste / breakdown.total) * 100)}% of total emissions.`,
          `Current consumption status: ${inputs.shoppingLevel.toUpperCase()} consumer.`,
          ` `,
          `[ACTION PLAN SUGGESTED]`,
          `1. Integrate composting and plastic/paper sorting immediately.`,
          `2. Restrict shopping velocity, specifically fast-fashion purchases.`,
          `3. Focus on modular, repairable electronic goods.`
        );
      }

      lines.push(
        ` `,
        `[STATUS]: ${breakdown.total > 10000 ? 'OUT_OF_COMPLIANCE' : breakdown.total > 5000 ? 'WARNING_LEVEL' : 'COMPLIANT_TARGET'}`,
        `Ledger holds ${activeActionsCount} active pledged actions.`
      );

      setTerminalText(lines);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [inputs, breakdown, activeActionsCount]);

  const getSystemStatus = () => {
    if (breakdown.total > 10000) {
      return {
        text: 'System Warning: High Footprint',
        color: 'text-red-500 bg-red-950/20 border-red-500',
        icon: <Warning size={18} className="text-red-500" />,
      };
    }
    if (breakdown.total > 5000) {
      return {
        text: 'System Alert: Moderate Footprint',
        color: 'text-yellow-600 bg-yellow-50 border-yellow-600',
        icon: <Warning size={18} className="text-yellow-600" />,
      };
    }
    return {
      text: 'System Compliant: Optimal Footprint',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-600',
      icon: <CheckCircle size={18} className="text-emerald-600" />,
    };
  };

  const status = getSystemStatus();

  return (
    <section id="insights" className="w-full py-16 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <div className="bg-black text-white p-2.5 brutalist-border-thin">
            <span className="font-mono text-sm font-black">[ 03 ]</span>
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight">
            Personalized insights & audits
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Diagnostic status cards */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <div className="brutalist-card p-6 bg-white flex flex-col gap-4">
              <h3 className="font-mono font-black uppercase text-sm border-b-2 border-black pb-2">
                Ledger Diagnostic Status
              </h3>
              
              <div className={`brutalist-border-thin p-4 flex items-center gap-3 font-mono text-xs font-black uppercase ${status.color}`}>
                {status.icon}
                <span>{status.text}</span>
              </div>

              <div className="flex flex-col gap-1.5 font-mono text-xs text-brutalist-gray">
                <span className="font-black text-black">DIAGNOSTIC TELEMETRY:</span>
                <span>- Net carbon footprint: ${(breakdown.total / 1000).toFixed(2)} t CO2e/year</span>
                <span>- Target reduction: ${activeActionsCount} active pledge tasks</span>
                <span>- Baseline offset potential: ${(breakdown.total > 2000 ? 'Unoptimized' : 'Optimized')}</span>
              </div>
            </div>

            <div className="brutalist-card p-6 bg-brutalist-accent text-black flex flex-col gap-3">
              <h3 className="font-mono font-black uppercase text-sm border-b-2 border-black pb-2">
                UN Paris target compliance
              </h3>
              <p className="font-mono text-xs leading-relaxed font-bold">
                The average global carbon footprint per person must drop to under 2.0 metric tons by 2030 to limit warming to 1.5 degrees Celsius. Tweak your control panel to simulate a compliant output profile.
              </p>
            </div>
          </div>

          {/* CRT Terminal Screen */}
          <div className="lg:col-span-2 brutalist-border bg-black text-brutalist-accent p-6 relative overflow-hidden brutalist-shadow-lg flex flex-col gap-4 min-h-[400px]">
            {/* Terminal Header Bar */}
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <TerminalWindow size={16} weight="bold" />
                <span className="font-mono text-xs font-black uppercase tracking-wider text-zinc-400">
                  Carbon Console // Audit Terminal
                </span>
              </div>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-none bg-zinc-800 border border-zinc-700"></span>
                <span className="w-2.5 h-2.5 rounded-none bg-zinc-800 border border-zinc-700"></span>
                <span className="w-2.5 h-2.5 rounded-none bg-zinc-800 border border-zinc-700"></span>
              </div>
            </div>

            {/* Terminal screen text output */}
            <div className="flex-1 font-mono text-xs leading-relaxed overflow-y-auto max-h-[350px] custom-terminal-scroll">
              {loading ? (
                <div className="text-zinc-500 animate-pulse">Running full carbon diagnostic suite...</div>
              ) : (
                terminalText.map((line, i) => (
                  <div key={i} className={line.startsWith('[OK]') ? 'text-white' : line.startsWith('[PRIMARY') ? 'text-yellow-400 font-bold' : line.startsWith('[ACTION') ? 'text-white font-bold' : 'text-brutalist-accent'}>
                    {line}
                  </div>
                ))
              )}
            </div>

            {/* CRT glow effect */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,255,95,0.05)_0%,transparent_100%)]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
