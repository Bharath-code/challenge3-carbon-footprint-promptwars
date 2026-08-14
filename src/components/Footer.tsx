import React, { useState } from 'react';
import { 
  DownloadSimple, 
  Copy, 
  Check, 
  TerminalWindow, 
  ArrowSquareOut, 
  YoutubeLogo
} from '@phosphor-icons/react';
import { PLAYBOOK_CHAPTERS } from '../data/chapters';
import { SKILL_TEMPLATES } from '../data/skillTemplates';

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleExportFullPlaybook = () => {
    let fullDoc = `# EARNEST // THE AGENTIC STARTUP PLAYBOOK
Executive Synthesis & Operational Frameworks derived from Garry Tan (YC).

---

## 01. CORE CHAPTERS & THEMES
`;

    PLAYBOOK_CHAPTERS.forEach((c) => {
      fullDoc += `
### ${c.number}. ${c.title} (${c.timestamp})
> "${c.quote}"
- **Summary:** ${c.summary}
- **Mental Model:** ${c.mentalModel.name} (\`${c.mentalModel.equation}\`)
- **Key Takeaways:**
${c.deepDive.map((d) => `  * ${d}`).join('\n')}
- **Tactical Rules:**
${c.tacticalRules.map((r) => `  * ${r}`).join('\n')}
`;
    });

    fullDoc += `
---

## 02. SKILLIFIED BUSINESS PROCESSES (SKILL.md SPECIFICATIONS)
`;

    SKILL_TEMPLATES.forEach((s) => {
      fullDoc += `
### ${s.title} [${s.category}]
\`\`\`markdown
${s.rawMarkdown}
\`\`\`
`;
    });

    const blob = new Blob([fullDoc], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'EARNEST_AGENTIC_PLAYBOOK_GARRY_TAN.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyManifesto = () => {
    const text = `EARNEST // The Agentic Startup Playbook\n"Earnestness is the courage to follow your own direct experience rather than consensus orthodoxy. Small 3-person teams orchestrating hundreds of agentic loops will outperform 200-person bureaucracies." — Garry Tan`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-[#050507] border-t border-white/10 pt-16 pb-12 relative overflow-hidden text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Playbook Bundle Export Strip */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-white/10 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 mb-1">
              <TerminalWindow size={16} />
              <span>EXPORT PLAYBOOK BUNDLE</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-black text-white">
              Download the Complete Agentic Manifesto & Skill Repository
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Includes all 5 core chapter blueprints, mental models, and production-ready <span className="font-mono text-amber-400">SKILL.md</span> files.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={handleCopyManifesto}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 hover:border-white/20 text-xs font-mono text-white transition-all"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy Manifesto'}</span>
            </button>

            <button
              onClick={handleExportFullPlaybook}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs font-mono transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)]"
            >
              <DownloadSimple size={16} weight="bold" />
              <span>Download Full .md Bundle</span>
            </button>
          </div>
        </div>

        {/* Links and Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/5 text-xs">
          
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2 text-white font-display font-black text-lg">
              <span>EARNEST</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                Playbook Edition
              </span>
            </div>
            <p className="text-zinc-400 max-w-md leading-relaxed">
              Synthesized from Garry Tan's Masterclass on Founder Psychology, The New Startup Playbook, The Single Field of Vision, The White Pill on AI Adoption, and Local Civic Governance.
            </p>
          </div>

          <div>
            <h4 className="text-white font-mono font-bold uppercase tracking-wider mb-3">
              Original Interview
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.youtube.com/watch?v=fsTtKywmWlU"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1.5 text-zinc-300 hover:text-amber-400 transition-colors"
                >
                  <YoutubeLogo size={15} className="text-red-500" weight="fill" />
                  <span>YouTube Talk (51m)</span>
                  <ArrowSquareOut size={12} />
                </a>
              </li>
              <li>
                <span className="text-zinc-400">Speaker: Garry Tan (President & CEO, Y Combinator)</span>
              </li>
              <li>
                <span className="text-zinc-400">Format: Deep Executive Dialogue</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-mono font-bold uppercase tracking-wider mb-3">
              Architectural Stack
            </h4>
            <ul className="space-y-2 font-mono text-zinc-400">
              <li>• React 19 + TypeScript + Vite</li>
              <li>• Tailwind CSS v4 Avant-Garde</li>
              <li>• Phosphor Icons System</li>
              <li>• Intentional Minimalism</li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & tagline */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-400">
          <div>
            © 2026 EARNEST // Engineered with Zero Fluff & Radical Conviction.
          </div>
          <div className="mt-2 sm:mt-0 flex items-center space-x-1">
            <span>Direct Experience</span>
            <span className="text-amber-400">›</span>
            <span>Consensus Orthodoxy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
