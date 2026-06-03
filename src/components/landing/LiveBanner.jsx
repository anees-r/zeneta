"use client";
import { useEffect, useState } from "react";

export default function LiveBanner() {
  const [settings, setSettings] = useState(null);

  const LIVE_STREAM_URL = `https://www.youtube.com/channel/${process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID}/live`;

  useEffect(() => {
    async function check() {
      try {
        const res = await fetch("/api/settings");
        setSettings(await res.json());
      } catch {}
    }

    check();
    const interval = setInterval(check, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!settings?.isLive) return null;

  return (
    <div className="relative z-30 flex w-full items-center justify-center gap-3 border-b border-violet-500/20 bg-violet-950/40 px-6 py-2.5">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime-400" />
      </span>
      <span className="text-sm font-medium tracking-wide text-violet-200">
        {settings.liveMessage || "Zeneta is live right now!"}
      </span>
      <a
        href={LIVE_STREAM_URL}
        target="_blank"
        className="text-xs text-lime-400/80 underline underline-offset-2 transition-colors hover:text-lime-400"
      >
        Watch now -&gt;
      </a>
    </div>
  );
}