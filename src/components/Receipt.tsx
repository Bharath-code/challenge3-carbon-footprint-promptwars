import { useEffect, useState } from 'react';
import type { CarbonInputs, SectorBreakdown } from '../utils/carbonCalculator';
import { ACTION_ITEMS } from './Ledger';
import { playPrintTick } from '../utils/audioSynth';
import { Printer, DownloadSimple } from '@phosphor-icons/react';

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

  // Generate a shareable brutalist card image using HTML5 canvas
  const generateAndDownloadShareImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Draw Background
    ctx.fillStyle = '#EAE9E4';
    ctx.fillRect(0, 0, 1200, 630);

    // 2. Draw Stark Double Border
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 12;
    ctx.strokeRect(16, 16, 1168, 598);
    ctx.lineWidth = 2;
    ctx.strokeRect(28, 28, 1144, 574);

    // 3. Left Side Content: Manifest Details
    ctx.fillStyle = '#000000';
    ctx.font = '900 32px monospace';
    ctx.fillText('[ CARBON LEDGER MANIFEST ]', 60, 90);

    ctx.font = '700 16px monospace';
    ctx.fillStyle = '#7F7F7F';
    ctx.fillText(`REF: LGR-${txId}  //  DATE: ${new Date().toLocaleDateString()}`, 60, 130);

    // Divider
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(60, 160);
    ctx.lineTo(580, 160);
    ctx.stroke();

    // Sector values
    ctx.fillStyle = '#000000';
    ctx.font = '700 18px monospace';
    ctx.fillText('01. TRANSPORTATION', 60, 200);
    ctx.fillText(`${breakdown.transport.toLocaleString()} kg/yr`, 400, 200);

    ctx.fillText('02. HOUSEHOLD ENERGY', 60, 240);
    ctx.fillText(`${breakdown.energy.toLocaleString()} kg/yr`, 400, 240);

    ctx.fillText('03. FOOD DIET BASIS', 60, 280);
    ctx.fillText(`${breakdown.diet.toLocaleString()} kg/yr`, 400, 280);

    ctx.fillText('04. WASTE & CONSUMPTION', 60, 320);
    ctx.fillText(`${breakdown.waste.toLocaleString()} kg/yr`, 400, 320);

    // Divider
    ctx.beginPath();
    ctx.moveTo(60, 350);
    ctx.lineTo(580, 350);
    ctx.stroke();

    // Active pledges & offsets
    const pledgeCount = activePledgeItems.length;
    ctx.fillStyle = '#000000';
    ctx.fillText('ACTIVE PLEDGES LOGGED:', 60, 390);
    ctx.fillText(`${pledgeCount}`, 400, 390);

    ctx.fillStyle = '#059669'; // Green color for offsets
    ctx.fillText('TOTAL PLEDGED OFFSETS:', 60, 430);
    ctx.fillText(`-${totalSaved.toLocaleString()} kg/yr`, 400, 430);

    // Simulated Barcode on bottom left
    ctx.fillStyle = '#000000';
    ctx.font = '36px sans-serif';
    ctx.fillText('||| | ||| || ||| | ||| || ||| |', 60, 520);
    ctx.font = '14px monospace';
    ctx.fillText(`*CO2-${txId}*`, 60, 550);

    // 4. Right Side Content: Main Score Card
    // Status Stamp
    const isCompliant = breakdown.total < 4000;
    ctx.font = '900 20px monospace';
    ctx.fillStyle = isCompliant ? '#047857' : '#B91C1C';
    ctx.strokeStyle = isCompliant ? '#047857' : '#B91C1C';
    ctx.lineWidth = 4;
    
    const stampText = isCompliant ? '[ ECO COMPLIANT ]' : '[ AUDIT REQUIRED ]';
    const stampWidth = ctx.measureText(stampText).width;
    ctx.fillRect(660, 70, stampWidth + 24, 40);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(stampText, 672, 98);

    // Main neon green score box
    ctx.fillStyle = '#00FF5F';
    ctx.fillRect(660, 160, 480, 320);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 6;
    ctx.strokeRect(660, 160, 480, 320);

    // Big bold footprint display
    ctx.fillStyle = '#000000';
    ctx.font = '900 110px monospace';
    ctx.fillText(`${totalTons}`, 690, 310);
    
    ctx.font = '900 24px monospace';
    ctx.fillText('t CO2e / yr', 690, 360);

    ctx.font = '700 16px monospace';
    ctx.fillText('NET CALIBRATED EMISSIONS OUTPUT', 690, 430);

    // Stark footnote tagline
    ctx.fillStyle = '#7F7F7F';
    ctx.font = '700 16px monospace';
    ctx.fillText('SYSTEM CALIBRATION // PLEDGED VIA CARBON.LEDGER', 660, 530);

    // 5. Trigger download
    const link = document.createElement('a');
    link.download = `carbon-ledger-receipt-${txId}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Physical Slot line */}
      <div className="w-full h-4 bg-black brutalist-border-thin relative receipt-slot-line">
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4/5 h-1.5 bg-zinc-800 border-b border-zinc-900 mt-1"></div>
      </div>

      {/* Main Paper Receipt */}
      <div
        className={`receipt-paper brutalist-border p-6 font-mono text-xs text-black brutalist-shadow-lg flex flex-col gap-4 transition-all relative receipt-print-target ${
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

        {/* Receipt Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-2 receipt-print-btn">
          <button
            type="button"
            onClick={handlePrint}
            className="font-mono text-[10px] font-black uppercase border-2 border-black bg-white hover:bg-brutalist-bg text-black py-2.5 flex items-center justify-center gap-2 brutalist-shadow-sm active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all cursor-pointer"
          >
            <Printer size={14} weight="bold" />
            <span>Print Manifest</span>
          </button>
          <button
            type="button"
            onClick={generateAndDownloadShareImage}
            className="font-mono text-[10px] font-black uppercase border-2 border-black bg-brutalist-accent hover:bg-brutalist-accent/80 text-black py-2.5 flex items-center justify-center gap-2 brutalist-shadow-sm active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all cursor-pointer"
          >
            <DownloadSimple size={14} weight="bold" />
            <span>Share Manifest</span>
          </button>
        </div>
      </div>
    </div>
  );
}
