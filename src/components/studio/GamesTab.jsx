"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import { Plus, Trash2 } from "lucide-react";

export default function GamesTab() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null); // holds { slug, name }
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch("/api/games").then(r => r.json()).then(data => { setGames(Array.isArray(data) ? data : []); setLoading(false); });
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    setError(""); setAdding(true);
    const res = await fetch("/api/games", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName.trim() }),
    });
    setAdding(false);
    if (!res.ok) { setError((await res.json()).error || "Failed."); return; }
    const created = await res.json();
    setGames(prev => [...prev, created]);
    setNewName("");
  }

  async function handleDelete() {
    if (!confirmDelete) return;
    setDeleting(true);
    const res = await fetch(`/api/games/${confirmDelete.slug}`, { method: "DELETE" });
    setDeleting(false);
    if (res.ok) { setGames(prev => prev.filter(g => g.slug !== confirmDelete.slug)); setConfirmDelete(null); }
    else setError("Failed to delete. Remove sessions for this game first.");
  }

  return (
    <div className="space-y-8 max-w-xl">
      <div>
        <h2 className="text-sm font-medium text-white mb-1">Game Catalog</h2>
        <p className="text-xs text-white/35">These games appear in the session dropdown. Slug is used in overlay URLs.</p>
      </div>

      <form onSubmit={handleAdd} className="flex items-end gap-3">
        <div className="flex-1 space-y-2">
          <Label>New Game Name</Label>
          <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. Valorant" disabled={adding} />
        </div>
        <Button type="submit" disabled={adding || !newName.trim()} className="shrink-0 gap-1.5">
          <Plus className="w-4 h-4" />{adding ? "Adding..." : "Add"}
        </Button>
      </form>
      {error && <p className="text-red-400 text-xs">{error}</p>}

      {loading ? (
        <div className="space-y-2">{[1,2,3].map(i => <div key={i} className="h-12 rounded-lg border border-violet-500/[0.08] bg-violet-950/10 animate-pulse" />)}</div>
      ) : games.length === 0 ? (
        <p className="text-white/25 text-sm">No games yet.</p>
      ) : (
        <div className="space-y-2">
          {games.map(game => (
            <div key={game.slug} className="flex items-center justify-between px-4 py-3 rounded-lg border border-violet-500/[0.08] bg-violet-950/10 hover:bg-violet-950/20 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-sm text-white font-medium">{game.name}</span>
                <Badge variant="ended" className="text-[10px]">/{game.slug}</Badge>
              </div>
              <Button size="sm" variant="ghost" onClick={() => setConfirmDelete({ slug: game.slug, name: game.name })}
                className="h-7 w-7 p-0 text-white/20 hover:text-red-400 hover:bg-red-900/20">
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="p-4 rounded-lg border border-violet-500/10 bg-violet-950/10">
        <p className="text-xs text-violet-400/60 leading-relaxed">
          Adding "Valorant" creates overlay URLs:<br />
          <code className="text-violet-300">/valorant/wl</code> and <code className="text-violet-300">/valorant/rank</code>
        </p>
      </div>

      <ConfirmDialog
        open={!!confirmDelete}
        onOpenChange={open => !open && setConfirmDelete(null)}
        title={`Delete "${confirmDelete?.name}"?`}
        description="This removes the game from the catalog. Make sure there are no active sessions for this game."
        confirmLabel="Delete Game"
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}
