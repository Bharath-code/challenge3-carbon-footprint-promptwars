import type { CarbonInputs, SectorBreakdown } from '../utils/carbonCalculator';
import { Car, House, Leaf, Trash } from '@phosphor-icons/react';
import { Receipt } from './Receipt';

interface CalculatorProps {
  inputs: CarbonInputs;
  onChange: (inputs: CarbonInputs) => void;
  breakdown: SectorBreakdown;
  activeActions: string[];
}

export function Calculator({ inputs, onChange, breakdown, activeActions }: CalculatorProps) {
  const updateInput = <K extends keyof CarbonInputs>(key: K, val: CarbonInputs[K]) => {
    onChange({
      ...inputs,
      [key]: val,
    });
  };

  // Convert kg to metric tons
  const totalTons = (breakdown.total / 1000).toFixed(1);
  const transportTons = (breakdown.transport / 1000).toFixed(1);
  const energyTons = (breakdown.energy / 1000).toFixed(1);
  const dietTons = (breakdown.diet / 1000).toFixed(1);
  const wasteTons = (breakdown.waste / 1000).toFixed(1);

  // Maximum scale for bar charts (5000 kg per sector as reference)
  const getPercentage = (value: number) => {
    return Math.min(100, (value / 8000) * 100);
  };

  return (
    <section id="calculator" className="w-full py-16 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
      {/* Control Panel Grid */}
      <div className="flex-[3] flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <div className="bg-black text-white p-2.5 brutalist-border-thin">
            <span className="font-mono text-sm font-black">[ 01 ]</span>
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight">
            Emissions control deck
          </h2>
        </div>

        {/* Transport Card */}
        <div className="brutalist-card p-6 bg-white flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b-2 border-black pb-3">
            <Car size={24} weight="bold" />
            <h3 className="font-mono font-black uppercase text-lg">01. Transportation</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs font-black uppercase flex justify-between">
                <span>Annual driving distance</span>
                <span className="text-brutalist-gray">{inputs.carMilesPerYear.toLocaleString()} miles</span>
              </label>
              <input
                type="range"
                min="0"
                max="30000"
                step="500"
                value={inputs.carMilesPerYear}
                onChange={(e) => updateInput('carMilesPerYear', parseInt(e.target.value))}
                className="w-full accent-black h-2.5 bg-brutalist-light-gray rounded-none appearance-none cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs font-black uppercase">Vehicle powertrain</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['suv', 'sedan', 'hybrid', 'ev'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => updateInput('carType', type)}
                    className={`font-mono text-xs font-black py-2 uppercase border-2 border-black transition-all ${
                      inputs.carType === type
                        ? 'bg-brutalist-accent text-black brutalist-shadow-sm'
                        : 'bg-white text-black hover:bg-brutalist-bg'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs font-black uppercase flex justify-between">
                <span>Public transit distance</span>
                <span className="text-brutalist-gray">{inputs.transitMilesPerYear.toLocaleString()} miles</span>
              </label>
              <input
                type="range"
                min="0"
                max="15000"
                step="250"
                value={inputs.transitMilesPerYear}
                onChange={(e) => updateInput('transitMilesPerYear', parseInt(e.target.value))}
                className="w-full accent-black h-2.5 bg-brutalist-light-gray rounded-none appearance-none cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs font-black uppercase flex justify-between">
                <span>Flight hours (Short:Long)</span>
                <span className="text-brutalist-gray">{inputs.flightHoursShort}h / {inputs.flightHoursLong}h</span>
              </label>
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-brutalist-gray">Short (&lt;3h)</span>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={inputs.flightHoursShort}
                    onChange={(e) => updateInput('flightHoursShort', Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full brutalist-input py-1 text-center font-bold text-sm"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-brutalist-gray">Long (&gt;=3h)</span>
                  <input
                    type="number"
                    min="0"
                    max="200"
                    value={inputs.flightHoursLong}
                    onChange={(e) => updateInput('flightHoursLong', Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full brutalist-input py-1 text-center font-bold text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Energy Card */}
        <div className="brutalist-card p-6 bg-white flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b-2 border-black pb-3">
            <House size={24} weight="bold" />
            <h3 className="font-mono font-black uppercase text-lg">02. Household Energy</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs font-black uppercase flex justify-between">
                <span>Electricity consumption</span>
                <span className="text-brutalist-gray">{inputs.electricityKWhPerMonth} kWh/mo</span>
              </label>
              <input
                type="range"
                min="0"
                max="2500"
                step="50"
                value={inputs.electricityKWhPerMonth}
                onChange={(e) => updateInput('electricityKWhPerMonth', parseInt(e.target.value))}
                className="w-full accent-black h-2.5 bg-brutalist-light-gray rounded-none appearance-none cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs font-black uppercase">Electricity source</span>
              <button
                type="button"
                onClick={() => updateInput('isElectricityRenewable', !inputs.isElectricityRenewable)}
                className={`font-mono text-xs font-black py-2.5 uppercase border-2 border-black transition-all ${
                  inputs.isElectricityRenewable
                    ? 'bg-brutalist-accent text-black brutalist-shadow-sm'
                    : 'bg-white text-black hover:bg-brutalist-bg'
                }`}
              >
                {inputs.isElectricityRenewable ? '100% Renewable / Green tariff' : 'Standard grid mix'}
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs font-black uppercase flex justify-between">
                <span>Natural gas consumption</span>
                <span className="text-brutalist-gray">{inputs.gasThermsPerMonth} therms/mo</span>
              </label>
              <input
                type="range"
                min="0"
                max="150"
                step="5"
                value={inputs.gasThermsPerMonth}
                onChange={(e) => updateInput('gasThermsPerMonth', parseInt(e.target.value))}
                className="w-full accent-black h-2.5 bg-brutalist-light-gray rounded-none appearance-none cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs font-black uppercase flex justify-between">
                <span>Household size</span>
                <span className="text-brutalist-gray">{inputs.householdSize} {inputs.householdSize === 1 ? 'person' : 'people'}</span>
              </label>
              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={inputs.householdSize}
                onChange={(e) => updateInput('householdSize', parseInt(e.target.value))}
                className="w-full accent-black h-2.5 bg-brutalist-light-gray rounded-none appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Diet & Consumption Card */}
        <div className="brutalist-card p-6 bg-white flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b-2 border-black pb-3">
            <Leaf size={24} weight="bold" />
            <h3 className="font-mono font-black uppercase text-lg">03. Diet & Consumption</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs font-black uppercase">Diet category</span>
              <div className="grid grid-cols-2 gap-2">
                {(['vegan', 'vegetarian', 'low-meat', 'high-meat'] as const).map((diet) => (
                  <button
                    key={diet}
                    type="button"
                    onClick={() => updateInput('dietType', diet)}
                    className={`font-mono text-xs font-black py-2.5 uppercase border-2 border-black transition-all ${
                      inputs.dietType === diet
                        ? 'bg-brutalist-accent text-black brutalist-shadow-sm'
                        : 'bg-white text-black hover:bg-brutalist-bg'
                    }`}
                  >
                    {diet.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs font-black uppercase">Shopping/Consumption level</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['low', 'average', 'high'] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => updateInput('shoppingLevel', level)}
                      className={`font-mono text-xs font-black py-2 uppercase border-2 border-black transition-all ${
                        inputs.shoppingLevel === level
                          ? 'bg-brutalist-accent text-black brutalist-shadow-sm'
                          : 'bg-white text-black hover:bg-brutalist-bg'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs font-black uppercase">Waste reduction</span>
                <button
                  type="button"
                  onClick={() => updateInput('doesRecycleAndCompost', !inputs.doesRecycleAndCompost)}
                  className={`font-mono text-xs font-black py-2 uppercase border-2 border-black transition-all ${
                    inputs.doesRecycleAndCompost
                      ? 'bg-brutalist-accent text-black brutalist-shadow-sm'
                      : 'bg-white text-black hover:bg-brutalist-bg'
                  }`}
                >
                  {inputs.doesRecycleAndCompost ? 'Recycles & Composts' : 'No sorting (Default)'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Output Panel / Summary */}
      <div className="flex-[2] flex flex-col gap-8 lg:sticky lg:top-8 self-start w-full">
        <div className="brutalist-card p-6 bg-white text-black brutalist-shadow-lg flex flex-col gap-6">
          <div
            className="border-b-2 border-black pb-4"
            role="region"
            aria-label="Realtime emissions output report"
          >
            <span className="font-mono text-xs text-brutalist-gray uppercase tracking-widest font-black">
              [ REALTIME METRICS ]
            </span>
            <div
              className="flex items-baseline gap-2 mt-2"
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="sr-only">Total estimated carbon footprint:</span>
              <span className="text-6xl font-black font-sans leading-none text-black">{totalTons}</span>
              <span className="font-mono text-lg uppercase font-black" aria-label="Metric Tons of Carbon Dioxide Equivalent per Year">
                t CO2e/yr
              </span>
            </div>
            <p className="text-xs text-brutalist-gray font-mono mt-2 font-bold">
              ESTIMATED INDIVIDUAL GREENHOUSE GAS FOOTPRINT
            </p>
          </div>

          {/* Breakdown bars */}
          <div className="flex flex-col gap-5">
            {/* Transport Bar */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between font-mono text-xs font-bold">
                <span className="flex items-center gap-1"><Car size={14} /> Transport ({Math.round((breakdown.transport / Math.max(1, breakdown.total)) * 100)}%)</span>
                <span aria-label={`${transportTons} Metric Tons of CO2 equivalent`}>{transportTons} t</span>
              </div>
              <div
                className="w-full h-5 bg-brutalist-bg brutalist-border-thin border-black rounded-none overflow-hidden"
                role="progressbar"
                aria-valuenow={breakdown.transport}
                aria-valuemin={0}
                aria-valuemax={8000}
                aria-label="Transport sector emissions proportion"
              >
                <div
                  className="h-full bg-brutalist-accent brutalist-border-thin border-r-2 border-black transition-all duration-300"
                  style={{ width: `${getPercentage(breakdown.transport)}%` }}
                ></div>
              </div>
            </div>

            {/* Energy Bar */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between font-mono text-xs font-bold">
                <span className="flex items-center gap-1"><House size={14} /> Home Energy ({Math.round((breakdown.energy / Math.max(1, breakdown.total)) * 100)}%)</span>
                <span aria-label={`${energyTons} Metric Tons of CO2 equivalent`}>{energyTons} t</span>
              </div>
              <div
                className="w-full h-5 bg-brutalist-bg brutalist-border-thin border-black rounded-none overflow-hidden"
                role="progressbar"
                aria-valuenow={breakdown.energy}
                aria-valuemin={0}
                aria-valuemax={8000}
                aria-label="Household energy sector emissions proportion"
              >
                <div
                  className="h-full bg-brutalist-accent brutalist-border-thin border-r-2 border-black transition-all duration-300"
                  style={{ width: `${getPercentage(breakdown.energy)}%` }}
                ></div>
              </div>
            </div>

            {/* Diet Bar */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between font-mono text-xs font-bold">
                <span className="flex items-center gap-1"><Leaf size={14} /> Food Diet ({Math.round((breakdown.diet / Math.max(1, breakdown.total)) * 100)}%)</span>
                <span aria-label={`${dietTons} Metric Tons of CO2 equivalent`}>{dietTons} t</span>
              </div>
              <div
                className="w-full h-5 bg-brutalist-bg brutalist-border-thin border-black rounded-none overflow-hidden"
                role="progressbar"
                aria-valuenow={breakdown.diet}
                aria-valuemin={0}
                aria-valuemax={8000}
                aria-label="Dietary emissions proportion"
              >
                <div
                  className="h-full bg-brutalist-accent brutalist-border-thin border-r-2 border-black transition-all duration-300"
                  style={{ width: `${getPercentage(breakdown.diet)}%` }}
                ></div>
              </div>
            </div>

            {/* Waste Bar */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between font-mono text-xs font-bold">
                <span className="flex items-center gap-1"><Trash size={14} /> Waste & Cons. ({Math.round((breakdown.waste / Math.max(1, breakdown.total)) * 100)}%)</span>
                <span aria-label={`${wasteTons} Metric Tons of CO2 equivalent`}>{wasteTons} t</span>
              </div>
              <div
                className="w-full h-5 bg-brutalist-bg brutalist-border-thin border-black rounded-none overflow-hidden"
                role="progressbar"
                aria-valuenow={breakdown.waste}
                aria-valuemin={0}
                aria-valuemax={8000}
                aria-label="Consumption and waste emissions proportion"
              >
                <div
                  className="h-full bg-brutalist-accent brutalist-border-thin border-r-2 border-black transition-all duration-300"
                  style={{ width: `${getPercentage(breakdown.waste)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Graph Legend & Explanation */}
          <div className="border-t-2 border-black pt-4 font-mono text-[10px] text-brutalist-gray leading-normal uppercase">
            <span className="font-black text-black">How to read the graph:</span>
            <p className="mt-1">
              Each horizontal bar shows your yearly carbon output in metric tons (t) per sector. The percentage displays its proportion of your total footprint. Adjust values in the control deck on the left to reduce emissions.
            </p>
          </div>

          {/* Reference indicators */}
          <div className="border-t border-zinc-800 pt-4 mt-2 font-mono text-[10px] text-zinc-400 flex flex-col gap-1.5">
            <div className="flex justify-between">
              <span>UN Target (By 2030):</span>
              <span className="text-white font-bold">2.0 t / person</span>
            </div>
            <div className="flex justify-between">
              <span>US Average Footprint:</span>
              <span className="text-white font-bold">16.0 t / person</span>
            </div>
            <div className="flex justify-between">
              <span>Global Average:</span>
              <span className="text-black font-bold">4.7 t / person</span>
            </div>
          </div>
        </div>

        {/* Physical Dot-Matrix Print Receipt */}
        <Receipt inputs={inputs} breakdown={breakdown} activeActions={activeActions} />
      </div>
    </section>
  );
}
