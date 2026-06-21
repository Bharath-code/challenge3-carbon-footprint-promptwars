import { useEffect, useState } from 'react';
import type { CarbonInputs, SectorBreakdown } from '../utils/carbonCalculator';
import { ACTION_ITEMS } from './Ledger';
import { playPrintTick } from '../utils/audioSynth';
import { Printer } from '@phosphor-icons/react';

interface ReceiptProps {
  inputs: CarbonInputs;
  breakdown: SectorBreakdown;
  activeActions: string[];
}

export function Receipt({ inputs, breakdown, activeActions }: ReceiptProps) {
  const [isPrinting, setIsPrinting] = useState(false);
  const [txId, setTxId] = useState('');

  // Generate a random transaction transaction reference on load
  useEffect(() => {
    setTxId(Math.random().toString(36).substring(2, 10).toUpperCase());
  }, []);

  // Trigger print vibration and sound tick sequence when emissions recalculate
  useEffect(() => {
    setIsPrinting(true);
    const soundInterval = setInterval(() => {
      playPrintTick();
    }, 60);

    const stopTimer = setTimeout(() => {
      setIsPrinting(false);
      clearInterval(soundInterval);
    }, 400);

    return () => {
      clearInterval(soundInterval);
      clearTimeout(stopTimer);
    };
  }, [breakdown.total]);

  const activePledgeItems = ACTION_ITEMS.filter((item) => activeActions.includes(item.id));
  const totalSaved = activePledgeItems.reduce((sum, item) => sum + item.calculateSavings(inputs), 0);

  const totalTons = (breakdown.total / 1000).toFixed(2);
  const baseTotalTons = ((breakdown.total + totalSaved) / 1000).toFixed(2);

  // Simple printable version trigger
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Physical Slot line */}
      <div className="w-full h-4 bg-black brutalist-border-thin relative">
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4/5 h-1.5 bg-zinc-800 border-b border-zinc-900 mt-1"></div>
      </div>

      {/* Main Paper Receipt */}
      <div
        className={`receipt-paper brutalist-border p-6 font-mono text-xs text-black brutalist-shadow-lg flex flex-col gap-4 transition-all relative ${
          isPrinting ? 'animate-print-vibration translate-y-1' : 'translate-y-0'
        }`}
      >
        {/* Serrated Top Edge */}
        <div className="absolute top-0 inset-x-0 h-2 bg-white flex justify-between overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="w-4 h-4 bg-brutalist-bg border-b-2 border-black rotate-45 -translate-y-2 flex-shrink-0"></div>
          ))}
        </div>

        {/* Paper Header */}
        <div className="text-center mt-2 border-b border-dashed border-black pb-4">
          <h3 className="font-black text-sm uppercase tracking-tight">[ CARBON ACCOUNTING MANIFEST ]</h3>
          <p className="text-[10px] text-brutalist-gray mt-1">TERMINAL REF: LGR-{txId}</p>
          <p className="text-[10px] text-brutalist-gray">DATE: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Sector Ledger Items */}
        <div className="flex flex-col gap-1 border-b border-dashed border-black pb-4">
          <div className="flex justify-between font-black uppercase text-[10px] text-brutalist-gray pb-1">
            <span>Sector output</span>
            <span>Mass (kg/yr)</span>
          </div>
          <div className="flex justify-between">
            <span>01. TRANSPORTATION</span>
            <span>{breakdown.transport.toLocaleString()} kg</span>
          </div>
          <div className="flex justify-between">
            <span>02. HOUSEHOLD ENERGY</span>
            <span>{breakdown.energy.toLocaleString()} kg</span>
          </div>
          <div className="flex justify-between">
            <span>03. FOOD DIET BASIS</span>
            <span>{breakdown.diet.toLocaleString()} kg</span>
          </div>
          <div className="flex justify-between">
            <span>04. SOLID WASTE OUTFLOW</span>
            <span>{breakdown.waste.toLocaleString()} kg</span>
          </div>
        </div>

        {/* Pledges offsets */}
        {activePledgeItems.length > 0 ? (
          <div className="flex flex-col gap-1 border-b border-dashed border-black pb-4 text-emerald-800">
            <div className="flex justify-between font-black uppercase text-[10px] text-brutalist-gray pb-1">
              <span>Active Pledges</span>
              <span>Offset (kg/yr)</span>
            </div>
            {activePledgeItems.map((pledge) => (
              <div key={pledge.id} className="flex justify-between">
                <span>- {pledge.name.substring(0, 22).toUpperCase()}</span>
                <span>-{pledge.calculateSavings(inputs).toLocaleString()} kg</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="border-b border-dashed border-black pb-4 text-center text-brutalist-gray text-[10px] italic">
            No active pledges logged in current ledger.
          </div>
        )}

        {/* Totals Section */}
        <div className="flex flex-col gap-1.5 border-b border-dashed border-black pb-4">
          <div className="flex justify-between font-bold">
            <span>GROSS UNOPTIMIZED EMISSIONS:</span>
            <span>{baseTotalTons} t/yr</span>
          </div>
          <div className="flex justify-between text-emerald-800 font-bold">
            <span>TOTAL PLEDGED OFFSETS:</span>
            <span>-{(totalSaved / 1000).toFixed(2)} t/yr</span>
          </div>
          <div className="flex justify-between font-black text-sm border-t border-black pt-2">
            <span>NET CALIBRATED OUTPUT:</span>
            <span>{totalTons} t/yr</span>
          </div>
        </div>

        {/* Barcode & Stamp */}
        <div className="flex flex-col items-center gap-3 pt-2">
          {/* Stark Brutalist Stamp */}
          <div className={`brutalist-border-thin px-4 py-1.5 text-[10px] font-black uppercase text-center tracking-wider select-none ${
            breakdown.total < 4000
              ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
              : 'border-red-600 bg-red-50 text-red-700'
          }`}>
            {breakdown.total < 4000 ? '[ ECO COMPLIANT ]' : '[ EMISSIONS AUDIT REQUIRED ]'}
          </div>

          {/* Barcode graphic */}
          <div className="flex flex-col items-center gap-1 font-mono text-[9px] text-zinc-500">
            <div className="text-xl tracking-tight leading-none font-sans font-bold select-none text-black">
              ||| | ||| || ||| | ||| || ||| |
            </div>
            <span>*CO2-{txId}*</span>
          </div>
        </div>

        {/* Print triggering button */}
        <button
          type="button"
          onClick={handlePrint}
          className="w-full mt-2 font-mono text-[10px] font-black uppercase border-2 border-black bg-white hover:bg-brutalist-bg text-black py-2.5 flex items-center justify-center gap-2 brutalist-shadow-sm active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all"
        >
          <Printer size={14} weight="bold" />
          <span>Print ledger document</span>
        </button>
      </div>
    </div>
  );
}
