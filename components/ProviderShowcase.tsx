"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useInView } from "framer-motion";
import TiltCard from "./TiltCard";

const providers = [
  {
    name: "OpenAI",
    model: "GPT-4.1",
    description: "Cloud-hosted, high accuracy",
    label: "OAI",
    accentColor: "#10b981",
  },
  {
    name: "Gemini",
    model: "2.5 Flash",
    description: "Cloud-hosted, cost-efficient",
    label: "GEM",
    accentColor: "#c4a35a",
  },
  {
    name: "Ollama",
    model: "Local models",
    description: "Self-hosted, fully private",
    label: "OLL",
    accentColor: "#6b8db5",
  },
];

const providerCommands = [
  {
    cmd: "inyeon providers",
    desc: "List available providers on the backend",
  },
  {
    cmd: "inyeon commit --staged -p openai",
    desc: "Use OpenAI for this command",
  },
  {
    cmd: "inyeon review --all --provider gemini",
    desc: "Use Gemini for this command",
  },
  {
    cmd: "export INYEON_LLM_PROVIDER=openai",
    desc: "Set a default provider via env var",
  },
];

interface TerminalLine {
  type: "command" | "output" | "header" | "provider" | "success";
  content: string;
  delay?: number;
}

const terminalSequence: TerminalLine[] = [
  { type: "command", content: "inyeon providers", delay: 400 },
  { type: "header", content: "Available LLM Providers", delay: 300 },
  {
    type: "provider",
    content: "openai    GPT-4.1 mini       [active]",
    delay: 200,
  },
  {
    type: "provider",
    content: "gemini    Gemini 2.5 Flash    [available]",
    delay: 200,
  },
  {
    type: "provider",
    content: "ollama    qwen2.5-coder:7b    [available]",
    delay: 200,
  },
  { type: "command", content: "inyeon commit --staged -p gemini", delay: 600 },
  {
    type: "output",
    content: "Using provider: gemini (Gemini 2.5 Flash)",
    delay: 800,
  },
  {
    type: "success",
    content: "feat(auth): implement session management",
    delay: 400,
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

export default function ProviderShowcase() {
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

      case "header":
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onAnimationComplete={isActive ? handleStepComplete : undefined}
            className="pl-4 mt-2 mb-1"
          >
            <span className="text-zinc-300 text-xs sm:text-sm font-medium">
              {line.content}
            </span>
          </motion.div>
        );

      case "provider":
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onAnimationComplete={isActive ? handleStepComplete : undefined}
            className="pl-4 my-0.5"
          >
            <span className="text-cold-blue text-xs sm:text-sm">
              {line.content}
            </span>
          </motion.div>
        );

      case "output":
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onAnimationComplete={isActive ? handleStepComplete : undefined}
            className="pl-4 my-1"
          >
            <span className="text-zinc-500 text-xs sm:text-sm">
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
            className="flex items-center gap-2 text-emerald-500 pl-4"
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
            <span className="text-xs sm:text-sm">{line.content}</span>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <section
      id="providers"
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
              v3.5.0
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-3 sm:mb-4">
            <span className="text-emerald-500">Multi-LLM</span> provider support
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base max-w-lg mx-auto px-2">
            Switch between OpenAI, Gemini, and Ollama per-command or set a
            default — use the best model for every task.
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
                terminal
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
              className="p-3 sm:p-4 md:p-5 font-mono text-xs sm:text-sm min-h-[180px] sm:min-h-[220px] overflow-x-auto"
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

        {/* Provider cards */}
        <motion.div
          className="mb-10 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="label-mono text-center mb-6 sm:mb-8">
            Supported Providers
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border">
            {providers.map((provider, index) => (
              <motion.div
                key={provider.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <TiltCard className="h-full">
                  <div className="group p-4 sm:p-5 bg-black hover:bg-white/2 transition-colors h-full">
                    <div
                      className="w-6 h-px mb-3 sm:mb-4 group-hover:w-10 transition-all duration-300"
                      style={{ backgroundColor: provider.accentColor }}
                    />
                    <p
                      className="font-mono text-xs tracking-wider mb-1"
                      style={{ color: provider.accentColor }}
                    >
                      {provider.label}
                    </p>
                    <p className="text-zinc-300 text-xs sm:text-sm font-medium mb-1">
                      {provider.name}
                    </p>
                    <p className="text-zinc-600 text-xs mb-2">
                      {provider.model}
                    </p>
                    <p className="text-zinc-600 text-sm leading-relaxed">
                      {provider.description}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
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
          {providerCommands.map((item, i) => (
            <div
              key={i}
              className="p-3 sm:p-5 bg-black group hover:bg-white/2 transition-colors"
            >
              <code className="text-emerald-500 text-xs sm:text-sm font-mono group-hover:text-warm-gold transition-colors break-all">
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
