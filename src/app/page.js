import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import GamesSection from "@/components/landing/GamesSection";
import LiveBanner from "@/components/landing/LiveBanner";

export default function HomePage() {
  return (
    <main className="min-h-screen" style={{ background: "#080b08" }}>
      {/* Ambient glow blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-[550px] h-[550px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #a3e635 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 -left-48 w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #a3e635 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10">
        <LiveBanner />
        <Navbar />
        <Hero />

        <div className="px-6 md:px-12 mb-16">
          <div className="h-px bg-gradient-to-r from-transparent via-lime-400/10 to-transparent" />
        </div>

        <GamesSection />

        <footer className="px-6 md:px-12 py-8 border-t border-lime-400/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-white/15 text-sm tracking-[0.2em] uppercase"
            style={{ fontFamily: "DarkestSaturday, serif" }}>
            ZENETA.GG
          </span>
          <div className="flex items-center gap-6">
            <a href="https://www.youtube.com/@zeneta-yt" target="_blank" rel="noopener noreferrer"
              className="text-xs text-white/20 hover:text-lime-400 transition-colors tracking-wide">YouTube</a>
            <a href="https://instagram.com/zenetagram" target="_blank" rel="noopener noreferrer"
              className="text-xs text-white/20 hover:text-lime-400 transition-colors tracking-wide">Instagram</a>
            <a href="/studio" className="text-xs text-white/20 hover:text-lime-400 transition-colors tracking-wide">Studio</a>
          </div>
          <span className="text-xs text-white/10">Pakistan</span>
        </footer>
      </div>
    </main>
  );
}
