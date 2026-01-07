"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface EntryFormProps {
  onStart: (ids: string[], count: number) => void;
}

export const EntryForm = ({ onStart }: EntryFormProps) => {
  const [inputText, setInputText] = useState("");
  const [winnerCount, setWinnerCount] = useState(1);

  const handleSubmit = () => {
    const ids = inputText
      .split(/\n|,/)
      .map((s) => s.trim().replace(/^@/, ""))
      .filter((s) => s !== "");
    
    if (ids.length < winnerCount) {
      alert("参加者数が当選人数より少ないです！");
      return;
    }
    onStart(ids, winnerCount);
  };

  return (
    <Card className="max-w-xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>抽選設定</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="ids-input">Instagram ID (改行またはカンマ区切り)</Label>
          <Textarea
            id="ids-input" 
            placeholder="user_id_1&#10;user_id_2&#10;user_id_3"
            className="h-48"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="winner-count">当選人数</Label>
          <Input
            id="winner-count"
            type="number"
            min={1}
            value={winnerCount}
            onChange={(e) => setWinnerCount(Number(e.target.value))}
          />
        </div>
        <Button className="w-full" onClick={handleSubmit} disabled={!inputText}>
          抽選ページへ進む
        </Button>
      </CardContent>
    </Card>
  );
};