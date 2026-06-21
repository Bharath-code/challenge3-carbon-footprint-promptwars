import { useState } from 'react';
import type { CarbonInputs, SectorBreakdown } from '../utils/carbonCalculator';
import { HardDrive, Plus, ArrowCounterClockwise, Trash } from '@phosphor-icons/react';

interface SavedLog {
  id: string;
  timestamp: string;
  inputs: CarbonInputs;
  breakdown: SectorBreakdown;
  activeActions: string[];
}

interface LogsProps {
  currentInputs: CarbonInputs;
  currentBreakdown: SectorBreakdown;
  currentActions: string[];
  onLoadLog: (inputs: CarbonInputs, actions: string[]) => void;
}

function isValidLog(log: unknown): log is SavedLog {
  if (!log || typeof log !== 'object') return false;
  
  const candidate = log as Record<string, unknown>;
  if (typeof candidate.id !== 'string') return false;
  if (typeof candidate.timestamp !== 'string') return false;
  
  // Validate inputs
  const inputs = candidate.inputs as Record<string, unknown> | undefined;
  if (!inputs || typeof inputs !== 'object') return false;
  if (typeof inputs.carMilesPerYear !== 'number' || isNaN(inputs.carMilesPerYear)) return false;
  if (typeof inputs.carType !== 'string') return false;
  if (typeof inputs.transitMilesPerYear !== 'number' || isNaN(inputs.transitMilesPerYear)) return false;
  if (typeof inputs.flightHoursShort !== 'number' || isNaN(inputs.flightHoursShort)) return false;
  if (typeof inputs.flightHoursLong !== 'number' || isNaN(inputs.flightHoursLong)) return false;
  if (typeof inputs.electricityKWhPerMonth !== 'number' || isNaN(inputs.electricityKWhPerMonth)) return false;
  if (typeof inputs.isElectricityRenewable !== 'boolean') return false;
  if (typeof inputs.gasThermsPerMonth !== 'number' || isNaN(inputs.gasThermsPerMonth)) return false;
  if (typeof inputs.householdSize !== 'number' || isNaN(inputs.householdSize)) return false;
  if (typeof inputs.dietType !== 'string') return false;
  if (typeof inputs.shoppingLevel !== 'string') return false;
  if (typeof inputs.doesRecycleAndCompost !== 'boolean') return false;

  // Validate breakdown
  const breakdown = candidate.breakdown as Record<string, unknown> | undefined;
  if (!breakdown || typeof breakdown !== 'object') return false;
  if (typeof breakdown.transport !== 'number' || isNaN(breakdown.transport)) return false;
  if (typeof breakdown.energy !== 'number' || isNaN(breakdown.energy)) return false;
  if (typeof breakdown.diet !== 'number' || isNaN(breakdown.diet)) return false;
  if (typeof breakdown.waste !== 'number' || isNaN(breakdown.waste)) return false;
  if (typeof breakdown.total !== 'number' || isNaN(breakdown.total)) return false;

  // Validate activeActions
  if (!Array.isArray(candidate.activeActions)) return false;
  if (!candidate.activeActions.every((action: unknown) => typeof action === 'string')) return false;

  return true;
}

export function Logs({ currentInputs, currentBreakdown, currentActions, onLoadLog }: LogsProps) {
  const [logs, setLogs] = useState<SavedLog[]>(() => {
    try {
      const stored = localStorage.getItem('carbon_ledger_logs');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.filter(isValidLog);
        }
      }
    } catch (e) {
      console.error('Failed to load initial logs', e);
    }
    return [];
  });

  // Save logs to localStorage
  const saveLogs = (newLogs: SavedLog[]) => {
    setLogs(newLogs);
    try {
      localStorage.setItem('carbon_ledger_logs', JSON.stringify(newLogs));
    } catch (e) {
      console.error('Failed to save logs', e);
    }
  };

  const handleCommitLog = () => {
    const newLog: SavedLog = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      inputs: { ...currentInputs },
      breakdown: { ...currentBreakdown },
      activeActions: [...currentActions],
    };

    saveLogs([newLog, ...logs]);
  };

  const handleDeleteLog = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = logs.filter((log) => log.id !== id);
    saveLogs(filtered);
  };

  const handleReloadLog = (log: SavedLog) => {
    onLoadLog(log.inputs, log.activeActions);
  };

  return (
    <section id="logs" className="w-full py-16 px-6 max-w-7xl mx-auto border-t-4 border-black">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-black text-white p-2.5 brutalist-border-thin">
              <span className="font-mono text-sm font-black">[ 04 ]</span>
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight">
              Historic checkpoint logs
            </h2>
          </div>

          <button
            type="button"
            onClick={handleCommitLog}
            className="brutalist-btn px-6 py-3 font-mono font-black text-xs uppercase"
          >
            <Plus size={16} weight="bold" />
            <span>Commit active config</span>
          </button>
        </div>

        <p className="font-mono text-sm text-brutalist-gray max-w-[65ch]">
          Save your current calculations and pledged actions to local storage. Use checkpoints to benchmark your footprint history and compare lifestyle profiles.
        </p>

        {logs.length === 0 ? (
          <div className="brutalist-card p-8 bg-white/50 text-center font-mono text-xs text-brutalist-gray border-dashed border-2">
            <HardDrive size={32} className="mx-auto mb-3 text-brutalist-gray" />
            <span>No saved checkpoint logs detected. Adjust parameters above and click "Commit active config".</span>
          </div>
        ) : (
          <div className="brutalist-card bg-white overflow-hidden">
            {/* Log Table Header */}
            <div className="hidden md:grid grid-cols-5 gap-4 bg-black text-white p-4 font-mono text-xs font-black uppercase tracking-wider">
              <span>Timestamp</span>
              <span>Total emissions</span>
              <span>Powertrain / Diet</span>
              <span>Pledges</span>
              <span className="text-right">Actions</span>
            </div>

            {/* Log List */}
            <div className="divide-y-2 divide-black">
              {logs.map((log) => {
                const totalTons = (log.breakdown.total / 1000).toFixed(2);
                
                return (
                  <div
                    key={log.id}
                    onClick={() => handleReloadLog(log)}
                    className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4 p-4 items-center hover:bg-brutalist-bg/30 cursor-pointer font-mono text-xs text-black transition-all"
                  >
                    {/* Timestamp */}
                    <div className="flex justify-between md:block">
                      <span className="md:hidden font-black text-brutalist-gray uppercase">Date:</span>
                      <span className="font-bold">{log.timestamp}</span>
                    </div>

                    {/* Total Emissions */}
                    <div className="flex justify-between md:block">
                      <span className="md:hidden font-black text-brutalist-gray uppercase">Emissions:</span>
                      <span className="font-black text-sm text-black">{totalTons} t CO2e/yr</span>
                    </div>

                    {/* Powertrain / Diet */}
                    <div className="flex justify-between md:block">
                      <span className="md:hidden font-black text-brutalist-gray uppercase">Profile:</span>
                      <span className="capitalize">{log.inputs.carType} vehicle / {log.inputs.dietType.replace('-', ' ')}</span>
                    </div>

                    {/* Pledges count */}
                    <div className="flex justify-between md:block">
                      <span className="md:hidden font-black text-brutalist-gray uppercase">Pledges:</span>
                      <span>{log.activeActions.length} pledged</span>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 mt-2 md:mt-0">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleReloadLog(log); }}
                        className="flex items-center gap-1 border-2 border-black bg-white px-2.5 py-1 hover:bg-brutalist-accent text-black font-black uppercase font-mono text-[10px] brutalist-shadow-sm transition-all"
                        aria-label="Load checkpoint"
                      >
                        <ArrowCounterClockwise size={10} weight="bold" />
                        <span>Load</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleDeleteLog(log.id, e)}
                        className="flex items-center gap-1 border-2 border-black bg-white text-red-600 px-2.5 py-1 hover:bg-red-50 font-black uppercase font-mono text-[10px] brutalist-shadow-sm transition-all"
                        aria-label="Delete checkpoint"
                      >
                        <Trash size={10} weight="bold" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
