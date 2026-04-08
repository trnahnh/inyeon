"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useInView } from "framer-motion";
import TiltCard from "./TiltCard";

interface TerminalLine {
  type: "command" | "status" | "node" | "success";
  content: string;
  delay?: number;
}

const terminalSequence: TerminalLine[] = [
  { type: "command", content: "inyeon commit --staged --local", delay: 400 },
  {
    type: "status",
    content: "Using: Ollama (qwen2.5-coder:7b)",
    delay: 500,
  },
  { type: "node", content: "✓ analyze_diff", delay: 350 },
  { type: "node", content: "✓ generate_message", delay: 350 },
  { type: "node", content: "✓ format_output", delay: 300 },
  {
    type: "success",
    content: "feat(auth): add session token rotation",
    delay: 400,
  },
];

const engines = [
  {
    name: "LocalEngine",
    description: "In-process agents, no server needed",
    label: "LOCAL",
    accentColor: "#c4a35a",
  },
  {
    name: "HttpEngine",
    description: "Remote backend via SSE",
    label: "REMOTE",
    accentColor: "#4a7cb5",
  },
];

const localCommands = [
  {
    cmd: "inyeon commit --staged --local",
    desc: "Run commit agent in-process with Ollama",
  },
  {
    cmd: "inyeon auto --staged --local",
    desc: "Full pipeline without a backend server",
  },
  {
    cmd: "inyeon commit --staged --local -p gemini",
    desc: "Local mode with Gemini API (no backend, still cloud LLM)",
  },
  {
    cmd: "inyeon review --all --local -p openai",
    desc: "Local mode with OpenAI API",
  },
];

function TypeWriter({
  text,
  onComplete,
  speed = 40,
}: {
  text: string;
  onComplete: () => void;
  speed?: number;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setShowCursor(false);
        onComplete();
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, text, speed, onComplete]);

  return (
    <span>
      {displayedText}
      {showCursor && <span className="cursor-blink text-warm-gold">|</span>}
    </span>
  );
}

export default function LocalModeShowcase() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const startDemo = useCallback(() => {
    setCurrentStep(0);
    setCompletedSteps([]);
    setIsPlaying(true);
  }, []);

  const stepTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleStepComplete = useCallback(() => {
    setCompletedSteps((prev) => [...prev, currentStep]);
    const nextStep = currentStep + 1;

    if (nextStep < terminalSequence.length) {
      const delay = terminalSequence[nextStep].delay || 200;
      stepTimeoutRef.current = setTimeout(() => {
        setCurrentStep(nextStep);
      }, delay);
    } else {
      setIsPlaying(false);
      stepTimeoutRef.current = setTimeout(() => {
        startDemo();
      }, 5000);
    }
  }, [currentStep, startDemo]);

  useEffect(() => {
    return () => {
      if (stepTimeoutRef.current) {
        clearTimeout(stepTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isInView && !isPlaying && currentStep === -1) {
      const timeout = setTimeout(startDemo, 800);
      return () => clearTimeout(timeout);
    }
  }, [isInView, isPlaying, currentStep, startDemo]);

  const renderLine = (line: TerminalLine, index: number) => {
    const isActive = currentStep === index;
    const isCompleted = completedSteps.includes(index);

    if (!isActive && !isCompleted) return null;

    switch (line.type) {
      case "command":
        return (
          <div key={index} className="flex items-start gap-2">
            <span className="text-warm-gold shrink-0">$</span>
            {isActive ? (
              <TypeWriter
                text={line.content}
                onComplete={handleStepComplete}
                speed={50}
              />
            ) : (
              <span className="text-zinc-300">{line.content}</span>
            )}
          </div>
        );

      case "status":
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onAnimationComplete={isActive ? handleStepComplete : undefined}
            className="pl-4 mt-2 mb-1"
          >
            <span className="text-warm-gold text-xs sm:text-sm">
              {line.content}
            </span>
          </motion.div>
        );

      case "node":
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onAnimationComplete={isActive ? handleStepComplete : undefined}
            className="pl-4 my-0.5"
          >
            <span className="text-emerald-500 text-xs sm:text-sm">
              {line.content}
            </span>
          </motion.div>
        );

      case "success":
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onAnimationComplete={isActive ? handleStepComplete : undefined}
            className="flex items-center gap-2 text-cold-blue pl-4 mt-2"
          >
            <svg
              className="w-3 h-3 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs sm:text-sm font-medium">
              {line.content}
            </span>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <section
      id="local"
      className="py-10 sm:py-16 md:py-24 px-4 sm:px-6 relative"
    >
      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-10 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-border mb-4 sm:mb-6">
            <span className="text-warm-gold text-xs font-mono tracking-wider">
              v4.0.0
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-3 sm:mb-4">
            <span className="text-golden">Offline</span> mode
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base max-w-lg mx-auto px-2">
            Run agents directly in the CLI process — no backend server needed.
            Use Ollama for fully private, air-gapped operation, or any cloud
            provider without a middleman.
          </p>
        </motion.div>

        {/* Terminal demo */}
        <motion.div
          className="max-w-2xl mx-auto mb-10 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          ref={ref}
        >
          <div className="code-block overflow-hidden hud-corners w-full">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-zinc-700" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-zinc-700" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-zinc-700" />
              </div>
              <span className="text-zinc-600 text-xs ml-2 font-mono tracking-wider">
                terminal — local mode
              </span>
              <div className="flex-1" />
              <button
                onClick={startDemo}
                className="text-zinc-700 hover:text-zinc-400 transition-colors text-xs font-mono tracking-wider"
              >
                replay
              </button>
            </div>

            {/* Terminal content */}
            <div
              className="p-3 sm:p-4 md:p-5 font-mono text-xs sm:text-sm min-h-[160px] sm:min-h-[200px] overflow-x-auto"
              style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
            >
              <div className="space-y-2">
                {terminalSequence.map((line, index) => renderLine(line, index))}
              </div>

              {currentStep === -1 && (
                <div className="flex items-center gap-2">
                  <span className="text-warm-gold">$</span>
                  <span className="cursor-blink text-warm-gold">|</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Execution engine cards */}
        <motion.div
          className="mb-10 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="label-mono text-center mb-6 sm:mb-8">
            Execution Engines
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border max-w-2xl mx-auto">
            {engines.map((engine, index) => (
              <motion.div
                key={engine.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <TiltCard className="h-full">
                  <div className="group p-4 sm:p-5 bg-black hover:bg-white/2 transition-colors h-full">
                    <div
                      className="w-6 h-px mb-3 sm:mb-4 group-hover:w-10 transition-all duration-300"
                      style={{ backgroundColor: engine.accentColor }}
                    />
                    <p
                      className="font-mono text-xs tracking-wider mb-1"
                      style={{ color: engine.accentColor }}
                    >
                      {engine.label}
                    </p>
                    <p className="text-zinc-300 text-xs sm:text-sm font-medium mb-1">
                      {engine.name}
                    </p>
                    <p className="text-zinc-600 text-sm leading-relaxed">
                      {engine.description}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Clarification note */}
        <motion.div
          className="mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="panel p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            style={{ borderLeft: "2px solid #c4a35a" }}
          >
            <div>
              <p className="text-warm-gold text-sm sm:text-base font-medium mb-1 tracking-wide">
                &quot;Local&quot; means no backend server
              </p>
              <p className="text-zinc-600 text-sm leading-relaxed">
                <code className="text-zinc-400">--local --provider gemini</code>{" "}
                still calls Gemini&apos;s API — the agents just run in your CLI
                process instead of on a remote server. For fully offline
                operation, use Ollama.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Command examples */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {localCommands.map((item, i) => (
            <div
              key={i}
              className="p-3 sm:p-5 bg-black group hover:bg-white/2 transition-colors"
            >
              <code className="text-warm-gold text-xs sm:text-sm font-mono group-hover:text-cold-blue transition-colors break-all">
                {item.cmd}
              </code>
              <p className="text-zinc-600 text-xs sm:text-sm mt-2">
                {item.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
