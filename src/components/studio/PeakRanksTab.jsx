"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trophy, Check } from "lucide-react";

function PeakRankRow({ game, existingRank }) {
  const [rank, setRank]           = useState(existingRank?.rank || "");
  const [subheading, setSubheading] = useState(existingRank?.subheading || "");
  const [saving, setSaving]       = useState(false);
  const [saved, setSaved]         = useState(false);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/peak-ranks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameSlug: game.slug, rank, subheading }),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  return (
    <div className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] space-y-4">
      <div className="flex items-center gap-2">
        <Trophy className="w-3.5 h-3.5 text-lime-400/60" />
        <span className="text-sm font-medium text-white">{game.name}</span>
        <span className="text-xs text-white/20">/{game.slug}</span>
      </div>

      <form onSubmit={handleSave} className="flex flex-col sm:flex-row gap-3 items-end">
        <div className="flex-1 space-y-1.5">
          <Label>Peak Rank</Label>
          <Input value={rank} onChange={(e) => setRank(e.target.value)}
            placeholder="e.g. Immortal 1" />
        </div>
        <div className="flex-1 space-y-1.5">
          <Label>Subheading</Label>
          <Input value={subheading} onChange={(e) => setSubheading(e.target.value)}
            placeholder="e.g. 12 RR" />
        </div>
        <Button type="submit" variant={saved ? "lime" : "lime-outline"}
          disabled={saving} className="shrink-0 gap-1.5">
          {saved ? <><Check className="w-3.5 h-3.5" /> Saved</> : saving ? "Saving..." : "Save"}
        </Button>
      </form>
    </div>
  );
}

export default function PeakRanksTab() {
  const [games, setGames]   = useState([]);
  const [ranks, setRanks]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/games").then((r) => r.json()),
      fetch("/api/peak-ranks").then((r) => r.json()),
    ]).then(([g, r]) => {
      setGames(Array.isArray(g) ? g : []);
      setRanks(Array.isArray(r) ? r : []);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="h-28 rounded-xl border border-white/[0.05] bg-white/[0.02] animate-pulse" />
        ))}
      </div>
    );
  }

  if (games.length === 0) {
    return <p className="text-white/25 text-sm">Add games in the Games tab first.</p>;
  }

  return (
    <div className="space-y-4 max-w-2xl">
      <div className="mb-6">
        <h2 className="text-sm font-medium text-white mb-1">Peak Ranks</h2>
        <p className="text-xs text-white/35">
          These are shown on your landing page under each game's stats.
        </p>
      </div>

      {games.map((game) => (
        <PeakRankRow
          key={game.slug}
          game={game}
          existingRank={ranks.find((r) => r.gameSlug === game.slug)}
        />
      ))}
    </div>
  );
}
