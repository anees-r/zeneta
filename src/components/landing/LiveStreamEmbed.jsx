"use client";
import { useEffect, useState } from "react";

export default function LiveStreamEmbed({ settings: providedSettings = null }) {
  const [settings, setSettings] = useState(null);
  const activeSettings = providedSettings ?? settings;
  const LIVE_STREAM_URL = `https://www.youtube.com/embed/live_stream?channel=${process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID}&autoplay=1&mute=1&rel=0`;

  useEffect(() => {
    if (providedSettings) return undefined;

    let active = true;

    async function check() {
      try {
        const res = await fetch("/api/settings");
        const nextSettings = await res.json();
        if (active) setSettings(nextSettings);
      } catch {}
    }

    check();
    const interval = setInterval(check, 10000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [providedSettings]);

  if (!activeSettings?.isLive) return null;

  return (
    <div
      id="live-stream"
      className="h-full overflow-hidden rounded-xl border border-lime-400/25 bg-violet-950/20 shadow-[0_0_45px_rgba(163,230,53,0.08)]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-lime-400/10 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime-400" />
          </span>
          <span className="truncate text-xs uppercase tracking-[0.14em] text-lime-300/90">
            Live stream
          </span>
        </div>
        <span className="shrink-0 rounded border border-lime-400/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-lime-300">
          On air
        </span>
      </div>

      <div className="relative aspect-video w-full bg-black">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={LIVE_STREAM_URL}
          title="Zeneta live stream"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>

      <p className="line-clamp-2 px-4 py-3 text-xs leading-5 text-white/35">
        {activeSettings.liveMessage || "Zeneta is live right now!"}
      </p>
    </div>
  );
}
