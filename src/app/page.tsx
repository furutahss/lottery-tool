"use client";
import { useState } from "react";
import { EntryForm } from "@/components/lottery/EntryForm";
import { LotteryStage } from "@/components/lottery/LotteryStage";

export default function Home() {
  const [view, setView] = useState<"entry" | "lottery">("entry");
  const [data, setData] = useState({ ids: [] as string[], count: 0 });

  const handleStart = (ids: string[], count: number) => {
    setData({ ids, count });
    setView("lottery");
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-slate-800">
          Instagram ID Lottery Tool
        </h1>

        {view === "entry" ? (
          <EntryForm onStart={handleStart} />
        ) : (
          <LotteryStage 
            initialIds={data.ids} 
            winnerCount={data.count} 
            onBack={() => setView("entry")} 
          />
        )}
      </div>
    </main>
  );
}