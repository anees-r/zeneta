"use client";
import { useEffect, useState } from "react";

export default function WLOverlay({ params }) {
  const [data, setData]     = useState(null);
  const [error, setError]   = useState(false);

  async function poll() {
    try {
      const res = await fetch(`/api/overlay/${params.game}`);
      if (!res.ok) { setError(true); return; }
      const json = await res.json();
      setData(json);
      setError(false);
    } catch {
      setError(true);
    }
  }

  useEffect(() => {
    poll();
    const interval = setInterval(poll, 5000);
    return () => clearInterval(interval);
  }, [params.game]);

  // No active session
  if (!data || (data.wins === null && data.losses === null)) {
    return (
      <div style={{
        fontFamily: "Space Grotesk, sans-serif",
        fontSize: "28px",
        fontWeight: "700",
        color: "rgba(255,255,255,0.25)",
        padding: "8px 0",
      }}>
        — / —
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: "Space Grotesk, sans-serif",
      display: "flex",
      alignItems: "baseline",
      gap: "20px",
      padding: "4px 0",
    }}>
      <span style={{ fontSize: "52px", fontWeight: "700", color: "#a3e635", lineHeight: 1 }}>
        {data.wins ?? 0}
      </span>
      <span style={{ fontSize: "28px", color: "rgba(255,255,255,0.15)" }}>/</span>
      <span style={{ fontSize: "52px", fontWeight: "700", color: "#a78bfa", lineHeight: 1 }}>
        {data.losses ?? 0}
      </span>
    </div>
  );
}
