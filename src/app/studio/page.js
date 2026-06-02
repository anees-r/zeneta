"use client";
import { signOut, useSession } from "next-auth/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import SessionsTab  from "@/components/studio/SessionsTab";
import GamesTab     from "@/components/studio/GamesTab";
import PeakRanksTab from "@/components/studio/PeakRanksTab";
import { LogOut, Radio, Gamepad2, Trophy } from "lucide-react";
import Link from "next/link";

export default function StudioPage() {
  const { data: session } = useSession();
  return (
    <main className="min-h-screen" style={{ background: "#0a0710" }}>
      <header className="border-b border-violet-500/[0.08] px-6 md:px-10 py-4 flex items-center justify-between sticky top-0 z-20"
        style={{ background: "#0a0710" }}>
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-baseline gap-0.5">
            <span className="text-lg text-white tracking-[0.2em] uppercase" style={{ fontFamily: "DarkestSaturday, serif" }}>ZENETA</span>
            <span className="text-violet-400 text-xs">.gg</span>
          </Link>
          <span className="text-white/15 text-xs tracking-widest uppercase">/ Studio</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/25 hidden sm:block">{session?.user?.email}</span>
          <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: "/" })}
            className="gap-1.5 text-xs">
            <LogOut className="w-3.5 h-3.5" /> Sign out
          </Button>
        </div>
      </header>
      <div className="px-6 md:px-10 py-8">
        <Tabs defaultValue="sessions">
          <TabsList>
            <TabsTrigger value="sessions" className="gap-2"><Radio className="w-3.5 h-3.5" /> Sessions</TabsTrigger>
            <TabsTrigger value="games"    className="gap-2"><Gamepad2 className="w-3.5 h-3.5" /> Games</TabsTrigger>
            <TabsTrigger value="peak-ranks" className="gap-2"><Trophy className="w-3.5 h-3.5" /> Peak Ranks</TabsTrigger>
          </TabsList>
          <TabsContent value="sessions"><SessionsTab /></TabsContent>
          <TabsContent value="games"><GamesTab /></TabsContent>
          <TabsContent value="peak-ranks"><PeakRanksTab /></TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
