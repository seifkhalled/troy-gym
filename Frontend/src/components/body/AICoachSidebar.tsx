"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useSelection } from "@/store/selectionEngine";
import { MUSCLES } from "@/lib/anatomy/muscleRegistry";
import { Send, Bot, User } from "lucide-react";

interface Message {
  role: "ai" | "user";
  text: string;
}

export function AICoachSidebar() {
  const muscleId = useSelection((s) => s.muscle);
  const entry = muscleId ? MUSCLES[muscleId] : null;
  const [messages, setMessages] = useState<Message[]>(() => {
    if (!entry) return [];
    return [
      {
        role: "ai",
        text: `I see you're looking at the ${entry.label}. Based on your selection, I can help with training advice, form cues, and recovery strategies. What would you like to know?`,
      },
    ];
  });
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: input.trim() }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: `Great question about the ${entry?.label ?? "target muscle"}. For the most tailored advice, I'd recommend focusing on controlled eccentrics and proper warm-up protocols. Would you like specific exercise recommendations or form tips?`,
        },
      ]);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full bg-card/40 backdrop-blur-xl border-l border-border rounded-2xl overflow-hidden border-t-2 border-t-primary">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between bg-black/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40">
            <Bot className="size-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Achilles AI</h3>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse-glow" />
              <span className="text-[10px] text-muted-foreground">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex gap-3 max-w-[90%] ${msg.role === "user" ? "ml-auto justify-end" : ""}`}
          >
            {msg.role === "ai" && (
              <div className="w-6 h-6 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center border border-primary/30 mt-1">
                <Bot className="size-3 text-primary" />
              </div>
            )}
            <div
              className={`rounded-2xl p-3 text-sm ${
                msg.role === "ai"
                  ? "bg-card border border-border rounded-tl-sm text-foreground/80"
                  : "bg-primary/10 border border-primary/20 rounded-tr-sm text-foreground"
              }`}
            >
              {msg.text}
            </div>
            {msg.role === "user" && (
              <div className="w-6 h-6 rounded-full bg-card flex-shrink-0 flex items-center justify-center border border-border mt-1">
                <User className="size-3 text-muted-foreground" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border bg-black/20">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
            placeholder="Ask about training, recovery..."
            className="w-full bg-card border border-border text-sm text-foreground px-4 py-3 rounded-xl focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/50 pr-10"
          />
          <button
            onClick={handleSend}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-foreground transition-colors p-1"
          >
            <Send className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
