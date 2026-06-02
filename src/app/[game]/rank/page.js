"use client";
import { use, useEffect, useState } from "react";

export default function RankOverlay({ params }) {
  const [data, setData] = useState(null);
  const { game } = use(params);

  async function poll() {
    try {
      const res = await fetch(`/api/overlay/${game}`);
      if (!res.ok) return;
      const json = await res.json();
      setData(json);
    } catch {}
  }

  useEffect(() => {
    poll();
    const interval = setInterval(poll, 5000);
    return () => clearInterval(interval);
  }, [game]);

  if (!data?.rank) {
    return (
      <div style={{
        fontFamily: "Space Grotesk, sans-serif",
        fontSize: "28px",
        fontWeight: "700",
        color: "rgba(255,255,255,0.25)",
      }}>
        —
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: "Space Grotesk, sans-serif",
      display: "flex",
      alignItems: "baseline",
      gap: "10px",
    }}>
      <span style={{ fontSize: "46px", fontWeight: "700", color: "#a78bfa", lineHeight: 1 }}>
        {data.rank}
      </span>
      {data.subheading && (
        <>
          <span style={{ fontSize: "28px", color: "rgba(255,255,255,0.2)" }}>—</span>
          <span style={{ fontSize: "38px", fontWeight: "600", color: "#a3e635", lineHeight: 1 }}>
            {data.subheading}
          </span>
        </>
      )}
    </div>
  );
}
