import React, { useState, useEffect } from 'react';
import { 
  TerminalWindow, 
  Play, 
  Cpu, 
  Lightning, 
  Compass, 
  TreeStructure, 
  Sparkle,
  ShareNetwork,
  Check
} from '@phosphor-icons/react';

interface NavigationProps {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
  onOpenVideo: (seconds?: number) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onSelectSection,
  onOpenVideo
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navItems = [
    { id: 'chapters', label: '01 // Core Themes', icon: Compass },
    { id: 'skillify', label: '02 // Skillify Engine', icon: Cpu },
    { id: 'field-of-vision', label: '03 // Field of Vision', icon: TreeStructure },
    { id: 'white-pill', label: '04 // The White Pill', icon: Lightning },
    { id: 'diagnostic', label: '05 // Founder Radar', icon: Sparkle },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#070709]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Live Status */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onSelectSection('hero')}>
            <div className="w-8 h-8 rounded bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-black text-sm shadow-[0_0_15px_rgba(245,158,11,0.4)]">
              <TerminalWindow weight="fill" size={18} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-display font-black text-lg tracking-tight text-white">EARNEST</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  Garry Tan Masterclass
                </span>
              </div>
              <p className="text-[11px] font-mono text-zinc-400 tracking-wider hidden sm:block">
                The Agentic Startup Playbook // 2026 Edition
              </p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-white/5 border border-white/10 rounded-full p-1 backdrop-blur-lg">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectSection(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-400 text-black font-semibold shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={14} weight={isActive ? 'fill' : 'regular'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Trigger */}
          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => onOpenVideo(0)}
              className="group flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-amber-500/30 hover:border-amber-400 text-xs font-mono text-amber-400 hover:text-amber-300 transition-all shadow-[0_0_10px_rgba(245,158,11,0.15)]"
              title="Watch full talk with timestamps"
            >
              <Play size={13} weight="fill" className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">Watch Talk (51m)</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-zinc-900 border border-white/10 hover:border-white/25 text-zinc-400 hover:text-white transition-all text-xs"
              title="Share or Copy Link"
            >
              {copied ? <Check size={16} className="text-emerald-400" /> : <ShareNetwork size={16} />}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
