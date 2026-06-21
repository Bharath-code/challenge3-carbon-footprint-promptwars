import { ArrowDown, ChartBar } from '@phosphor-icons/react';
import { motion, useReducedMotion } from 'motion/react';

interface CloudProps {
  delay: number;
  duration: number;
  y: string;
  scale: number;
  opacity: number;
  staticX: string;
}

function BrutalistCloud({ delay, duration, y, scale, opacity, staticX }: CloudProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ x: "-150%" }}
      animate={reduceMotion ? { x: staticX } : { x: "150%" }}
      transition={
        reduceMotion
          ? { type: "tween", duration: 0 }
          : {
              duration: duration,
              repeat: Infinity,
              ease: "linear",
              delay: delay,
            }
      }
      style={{ top: y, scale, opacity }}
      className="absolute left-0 z-20 pointer-events-none"
    >
      <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Flat brutalist solid shadow block */}
        <path
          d="M20 30h80v20H20z"
          fill="black"
        />
        <circle cx="40" cy="30" r="20" fill="black" />
        <circle cx="70" cy="20" r="20" fill="black" />
        <circle cx="90" cy="35" r="15" fill="black" />

        {/* Outer cloud frame */}
        <path
          d="M16 26h80v20H16z"
          fill="#EAE9E4"
          stroke="black"
          strokeWidth="4"
        />
        <circle cx="36" cy="26" r="20" fill="#EAE9E4" stroke="black" strokeWidth="4" />
        <circle cx="66" cy="16" r="20" fill="#EAE9E4" stroke="black" strokeWidth="4" />
        <circle cx="86" cy="31" r="15" fill="#EAE9E4" stroke="black" strokeWidth="4" />
        
        {/* Cover inner strokes to merge vector blocks */}
        <path
          d="M20 26h62v18H20z"
          fill="#EAE9E4"
        />
        <circle cx="36" cy="26" r="18" fill="#EAE9E4" />
        <circle cx="66" cy="16" r="18" fill="#EAE9E4" />
        <circle cx="86" cy="31" r="13" fill="#EAE9E4" />
      </svg>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section id="hero" className="w-full min-h-[calc(100dvh-80px)] flex flex-col md:flex-row brutalist-border-thin bg-white overflow-hidden">
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

      {/* Right Column: Industrial Brutalist Graphic with Floating Clouds */}
      <div className="flex-1 bg-brutalist-bg flex items-center justify-center p-6 md:p-12 relative overflow-hidden min-h-[350px] md:min-h-0">
        <div className="w-full h-full max-w-[500px] max-h-[500px] brutalist-border bg-white brutalist-shadow-lg relative overflow-hidden flex items-center justify-center">
          {/* Blueprint Background Grid */}
          <img
            src="/hero_brutalist_grid.png"
            alt="Global Carbon Matrix Blueprint"
            className="w-full h-full object-cover filter grayscale contrast-125 z-0"
          />
          
          {/* Floating Brutalist Clouds */}
          <BrutalistCloud delay={0} duration={24} y="15%" scale={0.8} opacity={0.9} staticX="10%" />
          <BrutalistCloud delay={-8} duration={32} y="38%" scale={1.1} opacity={1} staticX="50%" />
          <BrutalistCloud delay={-16} duration={28} y="62%" scale={0.7} opacity={0.8} staticX="80%" />

          {/* Coordinate Tag Overlay */}
          <div className="absolute bottom-4 left-4 bg-black text-brutalist-accent text-[10px] font-mono px-2.5 py-1 brutalist-border-thin font-bold uppercase tracking-wider z-30">
            GRID.REF: 48.8566 / 2.3522
          </div>
        </div>
      </div>
    </section>
  );
}
