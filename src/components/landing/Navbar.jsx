"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-violet-500/10 relative z-20">
      <Link href="/" className="flex items-baseline gap-0.5">
        <span className="text-2xl text-white tracking-[0.2em] uppercase" style={{ fontFamily: "DarkestSaturday, serif" }}>ZENETA</span>
        <span className="text-violet-400 text-sm font-light">.gg</span>
      </Link>
      <div className="hidden md:flex items-center gap-8">
        <a href="https://www.youtube.com/@zeneta-yt" target="_blank" rel="noopener noreferrer"
          className="text-sm text-white/40 hover:text-violet-300 transition-colors tracking-wide">YouTube</a>
        <a href="https://instagram.com/zenetagram" target="_blank" rel="noopener noreferrer"
          className="text-sm text-white/40 hover:text-violet-300 transition-colors tracking-wide">Instagram</a>
        <Link href="#games" className="text-sm text-white/40 hover:text-violet-300 transition-colors tracking-wide">Games</Link>
      </div>
      <Link href={session ? "/studio" : "/login"}>
        <Button variant="purple-outline" className="text-sm tracking-wide">
          Studio →
        </Button>
      </Link>
    </nav>
  );
}
