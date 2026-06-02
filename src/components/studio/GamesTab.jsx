"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from "lucide-react";

export default function GamesTab() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const [deletingSlug, setDeletingSlug] = useState(null);

  useEffect(() => {
    fetch("/api/games")
      .then((r) => r.json())
      .then((data) => { setGames(Array.isArray(data) ? data : []); setLoading(false); });
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    setError("");
    setAdding(true);
    const res = await fetch("/api/games", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName.trim() }),
    });
    setAdding(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to add game.");
      return;
    }
    const created = await res.json();
    setGames((prev) => [...prev, created]);
    setNewName("");
  }

  async function handleDelete(slug, name) {
    if (!confirm(`Delete "${name}" from catalog? This will also affect any sessions for this game.`)) return;
    setDeletingSlug(slug);
    const res = await fetch(`/api/games/${slug}`, { method: "DELETE" });
    setDeletingSlug(null);
    if (res.ok) setGames((prev) => prev.filter((g) => g.slug !== slug));
    else alert("Failed to delete. Make sure there are no sessions for this game first.");
  }

  return (
    <div className="space-y-8 max-w-xl">
      <div>
        <h2 className="text-sm font-medium text-white mb-1">Game Catalog</h2>
        <p className="text-xs text-white/35">
          These games appear in the session dropdown. The slug is used in overlay URLs.
        </p>
      </div>

      {/* Add game form */}
      <form onSubmit={handleAdd} className="flex items-end gap-3">
        <div className="flex-1 space-y-2">
          <Label>New Game Name</Label>
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="e.g. Valorant"
            disabled={adding}
          />
        </div>
        <Button type="submit" variant="lime" disabled={adding || !newName.trim()} className="shrink-0">
          <Plus className="w-4 h-4" />
          {adding ? "Adding..." : "Add"}
        </Button>
      </form>
      {error && <p className="text-red-400 text-xs">{error}</p>}

      {/* Game list */}
      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 rounded-lg border border-white/[0.05] bg-white/[0.02] animate-pulse" />
          ))}
        </div>
      ) : games.length === 0 ? (
        <p className="text-white/25 text-sm">No games in catalog yet.</p>
      ) : (
        <div className="space-y-2">
          {games.map((game) => (
            <div key={game.slug}
              className="flex items-center justify-between px-4 py-3 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.035] transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-sm text-white font-medium">{game.name}</span>
                <Badge variant="default" className="text-[10px] text-white/30">/{game.slug}</Badge>
              </div>
              <Button size="sm" variant="ghost"
                onClick={() => handleDelete(game.slug, game.name)}
                disabled={deletingSlug === game.slug}
                className="h-7 w-7 p-0 text-white/20 hover:text-red-400 hover:bg-red-900/20">
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="p-4 rounded-lg border border-lime-400/10 bg-lime-400/[0.03]">
        <p className="text-xs text-lime-400/60 leading-relaxed">
          Overlay URLs use the slug automatically.<br />
          e.g. adding "Valorant" → <code className="text-lime-400">/valorant/wl</code> and <code className="text-lime-400">/valorant/rank</code>
        </p>
      </div>
    </div>
  );
}
