import type { CarbonInputs } from '../utils/carbonCalculator';
import { CAR_EMISSION_FACTORS, GRID_INTENSITY_RENEWABLE, GRID_INTENSITY_STANDARD, GAS_EMISSION_FACTOR } from '../utils/carbonCalculator';
import { Check, Info } from '@phosphor-icons/react';

interface LedgerProps {
  inputs: CarbonInputs;
  activeActions: string[];
  onToggleAction: (actionId: string) => void;
}

export interface ActionItem {
  id: string;
  name: string;
  category: 'transport' | 'energy' | 'diet' | 'waste';
  description: string;
  calculateSavings: (inputs: CarbonInputs) => number; // Returns savings in kg CO2e per year
}

export const ACTION_ITEMS: ActionItem[] = [
  {
    id: 'bike-commute',
    name: 'Shift to bike / pedestrian transit',
    category: 'transport',
    description: 'Replace 2,500 miles of annual vehicle driving with cycling or walking.',
    calculateSavings: (inputs) => {
      const replaceableMiles = Math.min(2500, inputs.carMilesPerYear);
      return Math.round(replaceableMiles * CAR_EMISSION_FACTORS[inputs.carType]);
    },
  },
  {
    id: 'meatless-mondays',
    name: 'Implement meatless mondays',
    category: 'diet',
    description: 'Reduce meat consumption by 15% through plant-based days.',
    calculateSavings: (inputs) => {
      if (inputs.dietType === 'high-meat') return 270; // 15% of 1800 to 2800 difference
      if (inputs.dietType === 'low-meat') return 130;
      if (inputs.dietType === 'vegetarian') return 45;
      return 0; // vegan already optimized
    },
  },
  {
    id: 'smart-thermostat',
    name: 'Smart thermostat calibration',
    category: 'energy',
    description: 'Lower thermostat by 2 degrees in winter and raise by 2 degrees in summer.',
    calculateSavings: (inputs) => {
      // Typically saves 8% of natural gas heating emissions
      const gasEmissions = inputs.gasThermsPerMonth * 12 * GAS_EMISSION_FACTOR;
      return Math.round((gasEmissions * 0.08) / Math.max(1, inputs.householdSize));
    },
  },
  {
    id: 'line-dry',
    name: 'Line-dry laundry load cycles',
    category: 'energy',
    description: 'Hang dry clothes instead of using an electric tumble dryer.',
    calculateSavings: (inputs) => {
      // Dryer usage is roughly 3 kWh per load, ~150 loads per year = 450 kWh.
      // Savings depends on grid intensity.
      const gridFactor = inputs.isElectricityRenewable ? GRID_INTENSITY_RENEWABLE : GRID_INTENSITY_STANDARD;
      return Math.round((450 * gridFactor) / Math.max(1, inputs.householdSize));
    },
  },
  {
    id: 'solar-pledge',
    name: 'Pledge solar energy conversion',
    category: 'energy',
    description: 'Install residential solar panels or opt into local community solar grids.',
    calculateSavings: (inputs) => {
      if (inputs.isElectricityRenewable) return 0; // already green
      // Saves the standard vs renewable grid intensity gap
      const electricitySavings = inputs.electricityKWhPerMonth * 12 * (GRID_INTENSITY_STANDARD - GRID_INTENSITY_RENEWABLE);
      return Math.round(electricitySavings / Math.max(1, inputs.householdSize));
    },
  },
  {
    id: 'waste-sorting',
    name: 'Rigorous recycling and composting',
    category: 'waste',
    description: 'Separate organic waste and paper/plastic/metal to minimize landfill input.',
    calculateSavings: (inputs) => {
      if (inputs.doesRecycleAndCompost) return 0; // already recycling
      return 250; // saves waste factor gap
    },
  },
];

export function Ledger({ inputs, activeActions, onToggleAction }: LedgerProps) {
  // Calculate individual savings
  const actionSavings = ACTION_ITEMS.map((action) => ({
    ...action,
    savings: action.calculateSavings(inputs),
  }));

  const totalSaved = actionSavings
    .filter((a) => activeActions.includes(a.id))
    .reduce((sum, a) => sum + a.savings, 0);

  return (
    <section id="ledger" className="w-full py-16 px-6 bg-brutalist-bg border-t-4 border-black">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Left: Checklist Manifest */}
        <div className="flex-[3] flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-black text-white p-2.5 brutalist-border-thin">
              <span className="font-mono text-sm font-black">[ 02 ]</span>
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight">
              Action ledger manifest
            </h2>
          </div>

          <p className="font-mono text-sm text-brutalist-gray max-w-[65ch] mb-4">
            Pledge carbon reduction actions below. Estimated savings are dynamically calculated in real time, relative to your current energy consumption and commute parameters.
          </p>

          <div className="flex flex-col gap-4">
            {actionSavings.map((action) => {
              const isActive = activeActions.includes(action.id);
              
              return (
                <div
                  key={action.id}
                  onClick={() => onToggleAction(action.id)}
                  className={`brutalist-border p-5 flex items-start gap-4 transition-all cursor-pointer ${
                    isActive ? 'bg-white brutalist-shadow' : 'bg-white/50 hover:bg-white'
                  }`}
                >
                  <button
                    type="button"
                    className="mt-1 text-black flex-shrink-0"
                    aria-label={isActive ? 'Deselect action' : 'Select action'}
                  >
                    {isActive ? (
                      <div className="bg-brutalist-accent brutalist-border-thin p-0.5">
                        <Check size={18} weight="bold" />
                      </div>
                    ) : (
                      <div className="bg-white brutalist-border-thin w-5 h-5"></div>
                    )}
                  </button>

                  <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                    <div>
                      <h4 className="font-mono font-black uppercase text-base">{action.name}</h4>
                      <p className="text-sm text-brutalist-gray mt-1 leading-relaxed">{action.description}</p>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-1.5 font-mono text-xs font-black uppercase border-2 border-black bg-white px-3 py-1 bg-brutalist-accent text-black select-none">
                      <span>-{action.savings} kg/yr</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Savings ledger readout */}
        <div className="flex-[2] flex flex-col gap-8 lg:sticky lg:top-8 self-start w-full">
          <div className="brutalist-card p-6 bg-white brutalist-shadow-lg flex flex-col gap-6">
            <div className="border-b-2 border-black pb-4">
              <span className="font-mono text-xs text-brutalist-gray uppercase tracking-widest font-black">
                [ EMISSIONS REDUCTION SUMMARY ]
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-6xl font-black font-sans leading-none text-black">
                  {(totalSaved / 1000).toFixed(2)}
                </span>
                <span className="font-mono text-lg uppercase font-black">t Saved/yr</span>
              </div>
              <p className="text-xs text-brutalist-gray font-mono mt-1">
                Net emissions reductions pledged in this session
              </p>
            </div>

            <div className="flex flex-col gap-3 font-mono text-xs">
              <div className="flex justify-between font-bold border-b border-black pb-2">
                <span>Pledge Category</span>
                <span>Active Savings</span>
              </div>
              
              {/* Categorized pledge readouts */}
              {['transport', 'energy', 'diet', 'waste'].map((cat) => {
                const catTotal = actionSavings
                  .filter((a) => a.category === cat && activeActions.includes(a.id))
                  .reduce((sum, a) => sum + a.savings, 0);

                return (
                  <div key={cat} className="flex justify-between py-1 text-brutalist-gray uppercase">
                    <span>{cat} saving actions</span>
                    <span className="font-bold text-black">{catTotal} kg/yr</span>
                  </div>
                );
              })}
            </div>

            <div className="bg-black text-white p-4 brutalist-border-thin flex items-start gap-3">
              <Info size={20} className="text-brutalist-accent flex-shrink-0 mt-0.5" />
              <div className="font-mono text-[10px] text-zinc-300 leading-normal uppercase">
                Pledged reductions directly adjust your carbon calculator projection readout. Check off tasks as you execute them in daily routines.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
