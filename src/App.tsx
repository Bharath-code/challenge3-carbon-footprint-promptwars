import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Calculator } from './components/Calculator';
import { Ledger } from './components/Ledger';
import { ACTION_ITEMS } from './utils/actionItems';
import { Benchmarks } from './components/Benchmarks';
import { Insights } from './components/Insights';
import { Logs } from './components/Logs';
import { calculateCarbonBreakdown } from './utils/carbonCalculator';
import type { CarbonInputs } from './utils/carbonCalculator';
import { playClick, playTerminalBoot, toggleSound } from './utils/audioSynth';
import { Leaf } from '@phosphor-icons/react';

const DEFAULT_INPUTS: CarbonInputs = {
  carMilesPerYear: 8000,
  carType: 'sedan',
  transitMilesPerYear: 1500,
  flightHoursShort: 6,
  flightHoursLong: 12,
  electricityKWhPerMonth: 450,
  isElectricityRenewable: false,
  gasThermsPerMonth: 15,
  householdSize: 2,
  dietType: 'low-meat',
  shoppingLevel: 'average',
  doesRecycleAndCompost: false,
};

function App() {
  const [inputs, setInputs] = useState<CarbonInputs>(DEFAULT_INPUTS);
  const [activeActions, setActiveActions] = useState<string[]>([]);
  const [soundOn, setSoundOn] = useState(true);

  // Play a welcoming retro boot sequence chime after components mount
  useEffect(() => {
    const timer = setTimeout(() => {
      playTerminalBoot();
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Calculate base emissions
  const baseBreakdown = calculateCarbonBreakdown(inputs);

  // Calculate active savings per sector
  const activeActionItems = ACTION_ITEMS.filter((item) => activeActions.includes(item.id));
  
  const transportSavings = activeActionItems
    .filter((item) => item.category === 'transport')
    .reduce((sum, item) => sum + item.calculateSavings(inputs), 0);

  const energySavings = activeActionItems
    .filter((item) => item.category === 'energy')
    .reduce((sum, item) => sum + item.calculateSavings(inputs), 0);

  const dietSavings = activeActionItems
    .filter((item) => item.category === 'diet')
    .reduce((sum, item) => sum + item.calculateSavings(inputs), 0);

  const wasteSavings = activeActionItems
    .filter((item) => item.category === 'waste')
    .reduce((sum, item) => sum + item.calculateSavings(inputs), 0);

  // Compute adjusted net breakdown
  const adjustedBreakdown = {
    transport: Math.max(0, baseBreakdown.transport - transportSavings),
    energy: Math.max(0, baseBreakdown.energy - energySavings),
    diet: Math.max(0, baseBreakdown.diet - dietSavings),
    waste: Math.max(0, baseBreakdown.waste - wasteSavings),
    total: 0,
  };
  
  adjustedBreakdown.total =
    adjustedBreakdown.transport +
    adjustedBreakdown.energy +
    adjustedBreakdown.diet +
    adjustedBreakdown.waste;

  const handleInputChange = (newInputs: CarbonInputs) => {
    playClick();
    setInputs(newInputs);
  };

  const handleToggleAction = (actionId: string) => {
    playClick();
    setActiveActions((prev) =>
      prev.includes(actionId) ? prev.filter((id) => id !== actionId) : [...prev, actionId]
    );
  };

  const handleLoadCheckpoint = (loadedInputs: CarbonInputs, loadedActions: string[]) => {
    playClick();
    setInputs(loadedInputs);
    setActiveActions(loadedActions);
    
    // Smooth scroll back to calculator
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleToggleSound = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);
    toggleSound(nextState);
    if (nextState) {
      setTimeout(() => playClick(), 50);
    }
  };

  return (
    <div className="w-full flex flex-col min-h-dvh bg-brutalist-bg selection:bg-brutalist-accent selection:text-black">
      <Header soundOn={soundOn} onToggleSound={handleToggleSound} />
      
      <main className="flex-1 w-full">
        <Hero />
        
        {/* Main interactive calculator visualizer */}
        <Calculator
          inputs={inputs}
          onChange={handleInputChange}
          breakdown={adjustedBreakdown}
          activeActions={activeActions}
        />
        
        {/* Dynamic action pledge ledger */}
        <Ledger
          inputs={inputs}
          activeActions={activeActions}
          onToggleAction={handleToggleAction}
        />

        {/* Dynamic comparisons benchmarks visualizer */}
        <Benchmarks breakdown={adjustedBreakdown} />
        
        {/* CRT console insights based on net breakdown */}
        <Insights
          inputs={inputs}
          breakdown={adjustedBreakdown}
          activeActionsCount={activeActions.length}
        />
        
        {/* LocalStorage logging capability */}
        <Logs
          currentInputs={inputs}
          currentBreakdown={adjustedBreakdown}
          currentActions={activeActions}
          onLoadLog={handleLoadCheckpoint}
        />
      </main>

      <footer className="w-full bg-black text-white py-12 px-6 border-t-4 border-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-brutalist-accent text-black p-2 brutalist-border-thin">
              <Leaf size={20} weight="bold" />
            </div>
            <span className="font-mono font-black text-lg tracking-tight uppercase text-white">
              Carbon.Ledger
            </span>
          </div>

          <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest text-center">
            Pledge carbon compliance - built with React, Tailwind v4 and Space Grotesk
          </div>

          <div className="font-mono text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} Carbon Ledger. Open Source.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
