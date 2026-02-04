"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TerminalLine {
  type: "command" | "output" | "progress" | "success" | "box";
  content: string;
  delay?: number;
}

const terminalSequence: TerminalLine[] = [
  { type: "command", content: "git add .", delay: 400 },
  { type: "command", content: "inyeon commit --staged", delay: 300 },
  { type: "progress", content: "Analyzing changes...", delay: 1800 },
  {
    type: "box",
    content: `feat(auth): add session timeout and type hints`,
    delay: 100,
  },
  { type: "success", content: "Commit created", delay: 600 },
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
      setShowCursor(false);
      onComplete();
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
      setDots(".".repeat((count % 4)));
      if (count >= 10) {
        clearInterval(interval);
        onComplete();
      }
    }, 180);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <span className="text-zinc-500">
      Analyzing{dots}
    </span>
  );
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

  const handleStepComplete = useCallback(() => {
    setCompletedSteps((prev) => [...prev, currentStep]);
    const nextStep = currentStep + 1;

    if (nextStep < terminalSequence.length) {
      const delay = terminalSequence[nextStep].delay || 200;
      setTimeout(() => {
        setCurrentStep(nextStep);
      }, delay);
    } else {
      setIsPlaying(false);
      setTimeout(() => {
        startDemo();
      }, 5000);
    }
  }, [currentStep, startDemo]);

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

      case "box":
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onAnimationComplete={isActive ? handleStepComplete : undefined}
            className="pl-4 my-2 sm:my-3"
          >
            <div className="aurora-border rounded-md p-2 sm:p-3 inline-block max-w-full">
              <span className="text-aurora-cyan text-[11px] sm:text-xs md:text-sm break-all">{line.content}</span>
            </div>
          </motion.div>
        );

      case "success":
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onAnimationComplete={isActive ? handleStepComplete : undefined}
            className="flex items-center gap-2 text-aurora-green pl-4"
          >
            <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
          {/* Title bar - minimal */}
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border-b border-border">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-zinc-700" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-zinc-700" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-zinc-700" />
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
            className="p-3 sm:p-4 md:p-5 font-mono text-[11px] sm:text-xs md:text-sm min-h-[160px] sm:min-h-[180px] overflow-x-auto"
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
