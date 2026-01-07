"use client";
import { Button } from "@/components/ui/button";
import { IdTag } from "./IdTag";
import { motion, AnimatePresence } from "framer-motion";
import { useLottery } from "@/hooks/useLottery";

interface LotteryStageProps {
  initialIds: string[];
  winnerCount: number;
  onBack: () => void; // 「設定に戻る」用
}

export const LotteryStage = ({ initialIds, winnerCount, onBack }: LotteryStageProps) => {
  // 自作フックを使用
  const { ids, status, winners, startLottery, resetLottery } = useLottery(initialIds, winnerCount);

  return (
    <div className="max-w-4xl mx-auto mt-10 text-center space-y-8">
      {/* 抽選エリア */}
      <div className="flex flex-wrap justify-center items-start gap-3 p-10 border rounded-xl bg-white/50 backdrop-blur-sm shadow-inner">
        <AnimatePresence>
          {ids.map((id) => (
            <IdTag 
              key={id} 
              id={id} 
              isWinner={winners.includes(id)} 
              status={status}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* 操作ボタン */}
      <div className="flex justify-center gap-4">
        {status === "idle" && (
          <>
            <Button variant="outline" onClick={onBack}>設定に戻る</Button>
            <Button size="lg" onClick={startLottery} className="bg-gradient-to-r from-blue-500 to-indigo-600">
              抽選開始！
            </Button>
          </>
        )}
        
        {status === "completed" && (
          <>
            <Button variant="outline" onClick={onBack}>トップへ</Button>
            <Button size="lg" onClick={resetLottery}>もう一度抽選</Button>
          </>
        )}
      </div>
      
      {/* 結果表示 */}
      {status === "completed" && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 border-2 border-dashed border-blue-400 rounded-lg bg-blue-50"
        >
          <p className="text-blue-600 font-bold mb-2">当選者</p>
          <div className="flex justify-center gap-2 flex-wrap">
            {winners.map(w => (
              <span key={w} className="text-2xl font-black text-slate-800"><a href={`https://instagram.com/${w}/`} target="_blank">@{w}</a></span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};