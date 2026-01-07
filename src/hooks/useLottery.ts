"use client";
import { useState, useCallback, useRef } from "react";
import confetti from 'canvas-confetti';

export type LotteryStatus = "idle" | "shuffling" | "completed";

export const useLottery = (initialIds: string[], winnerCount: number) => {
  const [ids, setIds] = useState<string[]>(initialIds);
  const [status, setStatus] = useState<LotteryStatus>("idle");
  const [winners, setWinners] = useState<string[]>([]);
  
  // setIntervalの参照を保持（クリーンアップ用）
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const shuffleArray = (array: string[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const startLottery = useCallback(() => {
    if (status === "shuffling") return;
    
    setStatus("shuffling");
    setWinners([]);

    let count = 0;
    timerRef.current = setInterval(() => {
      setIds((prev) => shuffleArray(prev));
      count++;

      if (count > 20) { // 約2秒間（100ms * 20回）
        if (timerRef.current) clearInterval(timerRef.current);
        
        // 最終結果の決定
        setIds((currentIds) => {
          const finalShuffle = shuffleArray(currentIds);
          const selected = finalShuffle.slice(0, winnerCount);
          setWinners(selected);
          return finalShuffle;
        });
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3ea8ff', '#ffffff', '#ff007f'] // Instagramやツールに合わせた色
        });

        setStatus("completed");
      }
    }, 100);
  }, [status, winnerCount]);

  const resetLottery = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIds(initialIds);
    setWinners([]);
    setStatus("idle");
  }, [initialIds]);

  return { ids, status, winners, startLottery, resetLottery };
};