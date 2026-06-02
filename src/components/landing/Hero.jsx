"use client";
import { useEffect, useState } from "react";

// Fetches the first active session for the preview panel
function useFirstActiveSession() {
  const [data, setData] = useState(null);
  const [game, setGame] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const games = await fetch("/api/games").then(r => r.json());
        if (!Array.isArray(games) || games.length === 0) return;
        // Try each game until we find one with an active session
        for (const g of games) {
          const overlay = await fetch(`/api/overlay/${g.slug}`).then(r => r.json());
          if (overlay && overlay.wins !== null && overlay.wins !== undefined) {
            setData(overlay);
            setGame(g);
            break;
          }
        }
      } catch {}
    }
    load();
  }, []);

  return { data, game };
}

export default function Hero() {
  const { data: overlay, game } = useFirstActiveSession();

  return (
    <section className="relative px-6 md:px-12 pt-20 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-8xl">

        {/* LEFT — bio */}
        <div>
         <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border border-lime-400/20 bg-lime-400/5">
          <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse-glow" />
          <span className="text-xs text-lime-400/80 tracking-[0.15em] uppercase font-medium">
            Streamer · Gamer · Creator · Artist
          </span>
        </div>

          <h1 className="text-7xl md:text-9xl text-white tracking-[0.15em] uppercase leading-none mb-6"
            style={{ fontFamily: "DarkestSaturday, serif" }}>
            ZENETA
          </h1>

          <p className="text-lg text-white/45 font-light max-w-lg leading-relaxed mb-3">
            Just a dude trying to figure out this Streaming stuff.
          </p>
          <p className="text-sm text-white/25 tracking-wide mb-10">
            Pakistan &mdash; Video Games · Art · Anime · Books
          </p>

          <div className="flex flex-wrap gap-3">
            <a href="https://www.youtube.com/@zeneta-yt" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-lime-400 hover:bg-lime-300 text-black text-sm font-semibold tracking-wide transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Watch on YouTube
            </a>
            <a href="https://instagram.com/zenetagram" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-violet-500/25 text-white/60 hover:text-violet-300 hover:border-violet-500/50 text-sm font-medium tracking-wide transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @zenetagram
            </a>
          </div>
        </div>

        {/* RIGHT — stat cards + overlay preview */}
        <div className="flex flex-col gap-4">
          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl border border-violet-500/15 bg-violet-950/20">
              <div className="text-xs text-white/35 uppercase tracking-widest mb-2">Main Game</div>
              <div className="text-xl font-bold text-violet-300">Valorant</div>
              <div className="text-xs text-white/30 mt-1">Primary ranked</div>
            </div>
            <div className="p-4 rounded-xl border border-violet-500/15 bg-violet-950/20">
              <div className="text-xs text-white/35 uppercase tracking-widest mb-2">Also Plays</div>
              <div className="text-xl font-bold text-violet-300">CS2</div>
              <div className="text-xs text-white/30 mt-1">+ story mode</div>
            </div>
          </div>

          {/* Live overlay preview */}
          <div className="p-5 rounded-xl border border-violet-500/20 bg-violet-950/20">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse-glow" />
              <span className="text-xs text-violet-400/70 uppercase tracking-[0.12em]">
                {overlay && game ? `Live overlay — ${game.name}` : "Live overlay preview"}
              </span>
            </div>

            {/* W/L row */}
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-4xl font-bold text-lime-400">
                W {overlay ? overlay.wins : ""}
              </span>
              <span className="text-xl text-white/15">/</span>
              <span className="text-4xl font-bold text-violet-400">
                L {overlay ? overlay.losses : ""}
              </span>
              {!overlay && <span className="text-xs text-white/20 ml-auto">preview</span>}
            </div>

            {/* Rank row */}
            <div className="pt-4 border-t border-violet-500/10">
              <span className="text-lg font-semibold text-violet-300">
                {overlay?.rank || "Sleeping"}
              </span>
              <span className="text-white/30 mx-2">—</span>
              <span className="text-base text-white/45">
                {overlay?.subheading || "Probably"}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
