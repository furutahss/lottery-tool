"use client";
import { motion } from "framer-motion";

interface IdTagProps {
  id: string;
  isWinner: boolean;
  status: "idle" | "shuffling" | "completed";
}

export const IdTag = ({ id, isWinner, status }: IdTagProps) => {
  return (
    <motion.div
      layout // レイアウト変更を自動アニメーション化
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: isWinner && status === "completed" ? 1.2 : 1,
        y: isWinner && status === "completed" ? -10 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`
        px-3 py-1 rounded-md text-sm font-medium border transition-colors duration-500
        ${isWinner && status === "completed"
          ? "bg-[#3ea8ff] text-white border-[#3ea8ff] shadow-lg z-10" // 当選時
          : "bg-[#f2f2f2] text-[#333] border-transparent"} 
      `}
    >
      @{id}
    </motion.div>
  );
};