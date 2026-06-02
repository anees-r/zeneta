import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import GamesSection from "@/components/landing/GamesSection";
import LiveBanner from "@/components/landing/LiveBanner";

export default function HomePage() {
  return (
    <main className="min-h-screen" style={{ background: "#0a0710" }}>
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.12]"
          style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 -left-48 w-[500px] h-[500px] rounded-full opacity-[0.08]"
          style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #6d28d9 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10">
        <LiveBanner />
        <Navbar />
        <Hero />
        <div className="px-6 md:px-10 mb-16">
          <div className="h-px bg-gradient-to-r from-transparent via-violet-500/15 to-transparent" />
        </div>
        <GamesSection />

        <footer className="px-6 md:px-12 py-8 border-t border-violet-400/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-white/15 text-sm tracking-[0.2em] uppercase" style={{ fontFamily: "DarkestSaturday, serif" }}>ZENETA.GG</span>
          <div className="flex items-center gap-6">
            <a href="https://www.youtube.com/@zeneta-yt" target="_blank" rel="noopener noreferrer"
              className="text-xs text-white/20 hover:text-violet-400 transition-colors tracking-wide">YouTube</a>
            <a href="https://instagram.com/zenetagram" target="_blank" rel="noopener noreferrer"
              className="text-xs text-white/20 hover:text-violet-400 transition-colors tracking-wide">Instagram</a>
            <a href="/studio" className="text-xs text-white/20 hover:text-violet-400 transition-colors tracking-wide">Studio</a>
          </div>
          <span className="text-xs text-white/10">Pakistan</span>
        </footer>
      </div>
    </main>
  );
}
