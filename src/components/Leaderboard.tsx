import { Leaf, Users } from '@phosphor-icons/react';

interface LeaderboardProps {
  currentFootprint: number; // in t CO2e/yr
  activePledgesCount: number;
}

interface LeaderboardEntry {
  rank: number;
  username: string;
  footprint: number;
  pledgesCount: number;
}

export function Leaderboard({ currentFootprint, activePledgesCount }: LeaderboardProps) {
  const baseEntries: Omit<LeaderboardEntry, 'rank'>[] = [
    { username: 'GREEN_WARRIOR_01', footprint: 1.8, pledgesCount: 6 },
    { username: 'ECO_LOG_OPERATOR', footprint: 2.9, pledgesCount: 5 },
    { username: 'CARBON_NEUTRAL_DECK', footprint: 3.5, pledgesCount: 4 },
    { username: 'YOU (CURRENT NODE)', footprint: parseFloat(currentFootprint.toFixed(2)), pledgesCount: activePledgesCount },
    { username: 'HIGH_EMISSION_NODE', footprint: 14.2, pledgesCount: 1 },
  ];

  // Sort entries ascending by footprint output (lower is better rank)
  const sortedEntries: LeaderboardEntry[] = baseEntries
    .sort((a, b) => a.footprint - b.footprint)
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));

  return (
    <section id="leaderboard" className="w-full py-16 px-6 max-w-7xl mx-auto border-t-4 border-black print:hidden">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-black text-white p-2.5 brutalist-border-thin">
            <span className="font-mono text-sm font-black">[ 05 ]</span>
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight">
            Compliance Leaderboard
          </h2>
        </div>

        <p className="font-mono text-sm text-brutalist-gray max-w-[65ch] mb-4">
          Compare your net calibrated output against global node operators. Reduce emissions in the control deck above to rise up the rankings.
        </p>

        <div className="brutalist-card bg-white p-6">
          <div className="flex justify-between font-mono text-[10px] text-brutalist-gray uppercase border-b-2 border-black pb-2 mb-4">
            <span className="w-16">Rank</span>
            <span className="flex-1">Operator Node</span>
            <span className="w-32 text-right">Pledges</span>
            <span className="w-40 text-right">Calibrated Net</span>
          </div>

          <div className="flex flex-col gap-3">
            {sortedEntries.map((operator) => {
              const isCurrentUser = operator.username === 'YOU (CURRENT NODE)';
              return (
                <div
                  key={operator.username}
                  className={`brutalist-border-thin p-4 flex justify-between items-center transition-all ${
                    isCurrentUser ? 'bg-brutalist-accent text-black brutalist-shadow-sm font-bold scale-[1.01]' : 'bg-white'
                  }`}
                >
                  <span className="w-16 font-mono font-black text-lg">#{operator.rank}</span>
                  <span className="flex-1 font-mono uppercase tracking-tight flex items-center gap-2">
                    <Users size={16} />
                    {operator.username} {isCurrentUser && ' (ACTIVE NODE)'}
                  </span>
                  <span className="w-32 text-right font-mono text-xs flex items-center justify-end gap-1">
                    <Leaf size={14} />
                    {operator.pledgesCount} active
                  </span>
                  <span className="w-40 text-right font-mono font-black text-sm">
                    {operator.footprint.toFixed(2)} t/yr
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
