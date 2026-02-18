"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TerminalLine {
  type: "command" | "output" | "progress" | "success" | "box" | "split-header";
  content: string;
  delay?: number;
}

const terminalSequence: TerminalLine[] = [
  { type: "command", content: "git add .", delay: 400 },
  { type: "command", content: "inyeon auto --staged", delay: 300 },
  { type: "progress", content: "Running pipeline...", delay: 1600 },
  {
    type: "split-header",
    content: "Pipeline: 4 steps",
    delay: 100,
  },
  {
    type: "box",
    content: "[1/4] Splitting → 3 atomic commits",
    delay: 400,
  },
  {
    type: "box",
    content: "[2/4] feat(auth): add session management",
    delay: 400,
  },
  {
    type: "box",
    content: "[3/4] Reviewing code quality...",
    delay: 400,
  },
  {
    type: "box",
    content: "[4/4] Generating PR description...",
    delay: 400,
  },
  { type: "success", content: "Done! 3 commits created, PR ready.", delay: 600 },
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
      {showCursor && <span className="cursor-blink text-aurora-cyan">|</span>}
    </span>
  );
}

function ProgressIndicator({ onComplete }: { onComplete: () => void }) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setDots(".".repeat(count % 4));
      if (count >= 10) {
        clearInterval(interval);
        onComplete();
      }
    }, 180);
    return () => clearInterval(interval);
  }, [onComplete]);

  return <span className="text-zinc-500">Analyzing{dots}</span>;
}

export default function TerminalDemo() {
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
            <span className="text-aurora-purple flex-shrink-0">$</span>
            {isActive ? (
              <TypeWriter
                text={line.content}
                onComplete={handleStepComplete}
                speed={50}
              />
            ) : (
              <span className="text-white">{line.content}</span>
            )}
          </div>
        );

      case "progress":
        return (
          <div key={index} className="pl-4">
            {isActive ? (
              <ProgressIndicator onComplete={handleStepComplete} />
            ) : (
              <span className="text-zinc-500">{line.content}</span>
            )}
          </div>
        );

      case "split-header":
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onAnimationComplete={isActive ? handleStepComplete : undefined}
            className="pl-4 my-2"
          >
            <div className="border border-border rounded-md px-3 py-1.5 inline-block">
              <span className="text-white text-[11px] sm:text-xs md:text-sm font-medium">
                {line.content}
              </span>
            </div>
          </motion.div>
        );

      case "box":
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onAnimationComplete={isActive ? handleStepComplete : undefined}
            className="pl-4 my-1"
          >
            <span className="text-aurora-cyan text-[11px] sm:text-xs md:text-sm">
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
            className="flex items-center gap-2 text-aurora-green pl-4"
          >
            <svg
              className="w-3 h-3 flex-shrink-0"
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
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6" ref={ref}>
      <motion.div
        className="max-w-2xl mx-auto w-full"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        {/* Terminal window */}
        <div className="code-block overflow-hidden aurora-glow w-full">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border-b border-border">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500/70" />
            </div>
            <span className="text-zinc-500 text-xs ml-2">terminal</span>
            <div className="flex-1" />
            <button
              onClick={startDemo}
              className="text-zinc-600 hover:text-zinc-400 transition-colors text-xs"
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
                <span className="text-aurora-purple">$</span>
                <span className="cursor-blink text-aurora-cyan">|</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
