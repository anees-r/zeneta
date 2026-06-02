"use client";
import { useEffect, useState } from "react";

export default function LiveBanner() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    async function check() {
      try { const res = await fetch("/api/settings"); setSettings(await res.json()); } catch {}
    }
    check();
    const interval = setInterval(check, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!settings?.isLive) return null;

  return (
    <div className="relative z-30 w-full border-b border-violet-500/20 bg-violet-950/40 px-6 py-2.5 flex items-center justify-center gap-3">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-60" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-lime-400" />
      </span>
      <span className="text-sm text-violet-200 font-medium tracking-wide">
        {settings.liveMessage || "Zeneta is live right now!"}
      </span>
      <a href="https://www.youtube.com/@zeneta-yt" target="_blank" rel="noopener noreferrer"
        className="text-xs text-lime-400/80 hover:text-lime-400 underline underline-offset-2 transition-colors">
        Watch now →
      </a>
    </div>
  );
}
