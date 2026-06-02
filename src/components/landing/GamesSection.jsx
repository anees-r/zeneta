"use client";
import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";

function GameCard({ game }) {
  const total = (game.total_wins || 0) + (game.total_losses || 0);
  const wr = total > 0 ? Math.round((game.total_wins / total) * 100) : 0;
  return (
    <div className="group p-5 rounded-xl border border-violet-500/[0.12] bg-violet-950/[0.15] hover:bg-violet-950/30 hover:border-violet-500/25 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-medium text-white/80 tracking-wide">{game.name}</h3>
        {wr > 0 && <span className="text-xs text-white/20">{wr}% WR</span>}
      </div>
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-4xl font-bold text-lime-400 tabular-nums">{game.total_wins || 0}</span>
        <span className="text-white/15 text-xl">/</span>
        <span className="text-4xl font-bold text-violet-400 tabular-nums">{game.total_losses || 0}</span>
        <span className="text-xs text-white/25 ml-1">W / L</span>
      </div>
      <div className="pt-3.5 border-t border-violet-500/[0.08]">
        {game.rank ? (
          <>
            <div className="flex items-center gap-1.5 mb-0.5">
              <Trophy className="w-3 h-3 text-violet-400/50" />
              <span className="text-xs text-white/25 uppercase tracking-widest">Peak</span>
            </div>
            <span className="text-sm text-violet-300 font-medium">{game.rank}</span>
            {game.peak_subheading && <span className="text-sm text-white/30 ml-2">· {game.peak_subheading}</span>}
          </>
        ) : (
          <span className="text-xs text-white/20">No peak rank set</span>
        )}
      </div>
    </div>
  );
}

export default function GamesSection() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/totals")
      .then(r => r.json())
      .then(data => { setGames(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="games" className="px-6 md:px-12 pb-24">
      <div className="flex items-center gap-4 mb-8">
        <span className="text-xs text-violet-400/60 tracking-[0.15em] uppercase font-medium">Games Tracked</span>
        <div className="flex-1 h-px bg-violet-500/[0.1]" />
      </div>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3].map(i => <div key={i} className="h-44 rounded-xl border border-violet-500/[0.08] bg-violet-950/10 animate-pulse" />)}
        </div>
      ) : games.length === 0 ? (
        <p className="text-white/25 text-sm">No games tracked yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map(game => <GameCard key={game.slug} game={game} />)}
        </div>
      )}
    </section>
  );
}
