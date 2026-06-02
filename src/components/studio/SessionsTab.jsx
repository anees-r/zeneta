"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import { Minus, Plus, Square, Trash2, ExternalLink, Radio } from "lucide-react";

function Counter({ label, value, onDecrement, onIncrement, onChange, green }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-white/35 w-12 uppercase tracking-wider">{label}</span>
      <button onClick={onDecrement}
        className="w-7 h-7 rounded border border-violet-500/20 bg-violet-950/30 hover:bg-violet-900/40 text-white/50 hover:text-white flex items-center justify-center transition-colors">
        <Minus className="w-3 h-3" />
      </button>
      <Input type="number" min="0" value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-16 text-center text-base font-bold h-7 px-1" />
      <button onClick={onIncrement}
        className={`w-7 h-7 rounded border border-violet-500/20 bg-violet-950/30 flex items-center justify-center transition-colors text-white/50 ${green ? "hover:bg-lime-400/20 hover:border-lime-400/30 hover:text-lime-400" : "hover:bg-violet-700/40 hover:text-violet-300"}`}>
        <Plus className="w-3 h-3" />
      </button>
    </div>
  );
}

function SessionRow({ session, onUpdate, onEnd, onDelete }) {
  const [wins,       setWins]       = useState(session.wins);
  const [losses,     setLosses]     = useState(session.losses);
  const [rank,       setRank]       = useState(session.rank || "");
  const [subheading, setSubheading] = useState(session.subheading || "");
  const [dirty,      setDirty]      = useState(false);
  const [saving,     setSaving]     = useState(false);
  const [confirmEnd,    setConfirmEnd]    = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const isActive = session.status === "active";
  function md(fn) { fn(); setDirty(true); }

  async function save() {
    setSaving(true);
    const res = await fetch(`/api/sessions/${session.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wins, losses, rank, subheading }),
    });
    if (res.ok) { onUpdate(await res.json()); setDirty(false); }
    setSaving(false);
  }

  async function handleEnd() {
    setActionLoading(true);
    const res = await fetch(`/api/sessions/${session.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "end" }),
    });
    setActionLoading(false);
    if (res.ok) { onEnd(session.id); setConfirmEnd(false); }
  }

  async function handleDelete() {
    setActionLoading(true);
    const res = await fetch(`/api/sessions/${session.id}`, { method: "DELETE" });
    setActionLoading(false);
    if (res.ok) { onDelete(session.id); setConfirmDelete(false); }
  }

  const startDate = new Date(session.startedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const startTime = new Date(session.startedAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      <tr className="border-b border-violet-500/[0.07] hover:bg-violet-900/[0.08] transition-colors">
        <td className="px-5 py-4">
          <div className="flex items-center gap-2.5">
            {isActive && <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse-glow shrink-0" />}
            <span className="text-sm text-white font-medium">{session.gameName}</span>
            <Badge variant={isActive ? "active" : "ended"} className="text-[10px]">
              {isActive ? "live" : "ended"}
            </Badge>
          </div>
          <div className="text-xs text-white/25 mt-0.5 ml-4">{startDate} · {startTime}</div>
        </td>
        <td className="px-5 py-4">
          {isActive ? (
            <div className="flex flex-col gap-1.5">
              <Counter label="W" value={wins} green
                onDecrement={() => md(() => setWins(v => Math.max(0, v-1)))}
                onIncrement={() => md(() => setWins(v => v+1))}
                onChange={v => md(() => setWins(v))} />
              <Counter label="L" value={losses} green
                onDecrement={() => md(() => setLosses(v => Math.max(0, v-1)))}
                onIncrement={() => md(() => setLosses(v => v+1))}
                onChange={v => md(() => setLosses(v))} />
            </div>
          ) : (
            <div className="flex gap-4 text-sm">
              <span className="text-lime-400 font-bold">{session.wins}W</span>
              <span className="text-violet-400 font-bold">{session.losses}L</span>
            </div>
          )}
        </td>
        <td className="px-5 py-4">
          {isActive ? (
            <div className="flex flex-col gap-1.5">
              <Input value={rank} onChange={e => md(() => setRank(e.target.value))}
                placeholder="e.g. Ascendant 2" className="h-7 text-xs w-36" />
              <Input value={subheading} onChange={e => md(() => setSubheading(e.target.value))}
                placeholder="e.g. 68 RR" className="h-7 text-xs w-36" />
            </div>
          ) : (
            <div className="text-sm">
              {session.rank
                ? <><span className="text-violet-300">{session.rank}</span>{session.subheading && <span className="text-white/30 ml-1.5">· {session.subheading}</span>}</>
                : <span className="text-white/20">—</span>}
            </div>
          )}
        </td>
        <td className="px-5 py-4">
          <div className="flex gap-2 flex-wrap">
            <a href={`/${session.gameSlug}/wl`} target="_blank" rel="noopener noreferrer">
              <Badge variant="purple" className="cursor-pointer hover:bg-violet-700/40">W/L <ExternalLink className="w-2.5 h-2.5" /></Badge>
            </a>
            <a href={`/${session.gameSlug}/rank`} target="_blank" rel="noopener noreferrer">
              <Badge variant="default" className="cursor-pointer hover:bg-violet-700/40">Rank <ExternalLink className="w-2.5 h-2.5" /></Badge>
            </a>
          </div>
        </td>
        <td className="px-5 py-4">
          <div className="flex items-center gap-2">
            {isActive && dirty && (
              <Button size="sm" onClick={save} disabled={saving} className="h-7 text-xs px-3">
                {saving ? "..." : "Save"}
              </Button>
            )}
            {isActive && (
              <Button size="sm" variant="outline" onClick={() => setConfirmEnd(true)} className="h-7 text-xs px-2.5 gap-1">
                <Square className="w-3 h-3" /> End
              </Button>
            )}
            <Button size="sm" variant="ghost" onClick={() => setConfirmDelete(true)}
              className="h-7 w-7 p-0 text-white/20 hover:text-red-400 hover:bg-red-900/20">
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </td>
      </tr>

      <ConfirmDialog open={confirmEnd} onOpenChange={setConfirmEnd}
        title="End this session?"
        description="This marks the session as ended. You won't be able to edit wins/losses after."
        confirmLabel="End Session" onConfirm={handleEnd} loading={actionLoading} />
      <ConfirmDialog open={confirmDelete} onOpenChange={setConfirmDelete}
        title="Delete this session?"
        description="This permanently removes the session and all its stats. Cannot be undone."
        confirmLabel="Delete" onConfirm={handleDelete} loading={actionLoading} />
    </>
  );
}

export default function SessionsTab() {
  const [sessions, setSessions] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [isLive, setIsLive] = useState(false);
  const [liveMessage, setLiveMessage] = useState("");
  const [savingLive, setSavingLive] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/sessions").then(r => r.json()),
      fetch("/api/games").then(r => r.json()),
      fetch("/api/settings").then(r => r.json()),
    ]).then(([s, g, settings]) => {
      setSessions(Array.isArray(s) ? s : []);
      setGames(Array.isArray(g) ? g : []);
      setIsLive(settings.isLive ?? false);
      setLiveMessage(settings.liveMessage ?? "");
      setLoading(false);
    });
  }, []);

  async function toggleLive(val) {
    setIsLive(val);
    setSavingLive(true);
    await fetch("/api/settings", {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isLive: val, liveMessage }),
    });
    setSavingLive(false);
  }

  async function saveLiveMessage() {
    setSavingLive(true);
    await fetch("/api/settings", {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isLive, liveMessage }),
    });
    setSavingLive(false);
  }

  async function startSession() {
    if (!selectedGame) return;
    setCreateError("");
    setCreating(true);
    const res = await fetch("/api/sessions", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameSlug: selectedGame }),
    });
    setCreating(false);
    if (!res.ok) { setCreateError((await res.json()).error || "Failed."); return; }
    const created = await res.json();
    const game = games.find(g => g.slug === selectedGame);
    setSessions(prev => [{ ...created, gameName: game?.name || selectedGame }, ...prev]);
    setSelectedGame("");
  }

  const handleUpdate = updated => setSessions(prev => prev.map(s => s.id === updated.id ? { ...s, ...updated } : s));
  const handleEnd    = id      => setSessions(prev => prev.map(s => s.id === id ? { ...s, status: "ended", endedAt: new Date() } : s));
  const handleDelete = id      => setSessions(prev => prev.filter(s => s.id !== id));

  const activeSessions = sessions.filter(s => s.status === "active");
  const endedSessions  = sessions.filter(s => s.status === "ended");

  const THead = () => (
    <thead>
      <tr className="border-b border-violet-500/[0.08] bg-violet-950/20">
        {["Game", "W / L", "Rank (Overlay)", "Overlays", "Actions"].map(h => (
          <th key={h} className="text-left px-5 py-3 text-xs text-white/25 uppercase tracking-widest">{h}</th>
        ))}
      </tr>
    </thead>
  );

  return (
    <div className="space-y-8">
      {/* Live toggle */}
      <div className="p-5 rounded-xl border border-violet-500/15 bg-violet-950/20 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-3 flex-1">
          <Radio className={`w-4 h-4 shrink-0 ${isLive ? "text-lime-400" : "text-white/25"}`} />
          <div>
            <p className="text-sm font-medium text-white">I'm Live Right Now</p>
            <p className="text-xs text-white/35 mt-0.5">Shows a banner on your landing page</p>
          </div>
          <Switch checked={isLive} onCheckedChange={toggleLive} className="ml-auto sm:ml-4" />
        </div>
        <div className="flex items-center gap-2 flex-1">
          <Input value={liveMessage} onChange={e => setLiveMessage(e.target.value)}
            placeholder="Live banner message..." className="text-xs h-8" />
          <Button size="sm" variant="outline" onClick={saveLiveMessage} disabled={savingLive} className="shrink-0">
            {savingLive ? "..." : "Save"}
          </Button>
        </div>
      </div>

      {/* Start session */}
      <div>
        <h2 className="text-xs text-white/35 uppercase tracking-widest mb-3">Start New Session</h2>
        <div className="flex items-center gap-3 flex-wrap">
          <Select value={selectedGame} onValueChange={setSelectedGame}>
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Select a game..." />
            </SelectTrigger>
            <SelectContent>
              {games.map(g => (
                <SelectItem key={g.slug} value={g.slug}
                  disabled={activeSessions.some(s => s.gameSlug === g.slug)}>
                  {g.name}{activeSessions.some(s => s.gameSlug === g.slug) ? " (active)" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={startSession} disabled={!selectedGame || creating}>
            {creating ? "Starting..." : "Start Session"}
          </Button>
          {createError && <p className="text-red-400 text-xs">{createError}</p>}
        </div>
      </div>

      {/* Active */}
      {activeSessions.length > 0 && (
        <div>
          <h2 className="text-xs text-lime-400/60 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse-glow" />
            Active Sessions ({activeSessions.length})
          </h2>
          <div className="rounded-xl border border-violet-500/15 overflow-hidden">
            <table className="w-full"><THead />
              <tbody>{activeSessions.map(s => <SessionRow key={s.id} session={s} onUpdate={handleUpdate} onEnd={handleEnd} onDelete={handleDelete} />)}</tbody>
            </table>
          </div>
        </div>
      )}

      {/* Past */}
      <div>
        <h2 className="text-xs text-white/25 uppercase tracking-widest mb-3">Past Sessions ({endedSessions.length})</h2>
        {endedSessions.length === 0
          ? <p className="text-white/20 text-sm">No ended sessions yet.</p>
          : <div className="rounded-xl border border-violet-500/[0.08] overflow-hidden">
              <table className="w-full"><THead />
                <tbody>{endedSessions.map(s => <SessionRow key={s.id} session={s} onUpdate={handleUpdate} onEnd={handleEnd} onDelete={handleDelete} />)}</tbody>
              </table>
            </div>
        }
      </div>
    </div>
  );
}
