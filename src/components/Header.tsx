import { Globe, GitBranch } from '@phosphor-icons/react';

export function Header() {
  return (
    <header className="w-full brutalist-border-thin bg-white flex flex-col md:flex-row justify-between items-center px-6 py-4 gap-4 z-50">
      <div className="flex items-center gap-3">
        <div className="bg-black p-2 text-brutalist-accent brutalist-border-thin">
          <Globe size={24} weight="bold" />
        </div>
        <span className="font-mono font-black text-xl tracking-tight uppercase">
          Carbon.Ledger
        </span>
      </div>

      <nav className="flex items-center gap-6 font-mono text-sm font-bold">
        <a href="#calculator" className="hover:underline transition-all">
          01. Calculator
        </a>
        <a href="#ledger" className="hover:underline transition-all">
          02. Action ledger
        </a>
        <a href="#insights" className="hover:underline transition-all">
          03. Insights
        </a>
      </nav>

      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center gap-2 font-mono text-xs brutalist-border-thin bg-brutalist-bg px-3 py-1.5 font-bold">
          <span className="w-2.5 h-2.5 bg-brutalist-accent brutalist-border-thin inline-block animate-pulse"></span>
          <span>Sys: Active</span>
        </div>
        <a
          href="https://github.com/Bharath-code/challenge3-carbon-footprint-promptwars"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-mono text-xs brutalist-border-thin bg-black text-white hover:bg-brutalist-accent hover:text-black px-3 py-1.5 font-bold transition-all"
        >
          <GitBranch size={14} weight="bold" />
          <span>Repository</span>
        </a>
      </div>
    </header>
  );
}
