"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";

const pipelineSteps = [
  {
    step: "01",
    title: "Split",
    description: "Changes grouped into atomic commits by AI clustering",
    accentColor: "#a85462",
    borderColor: "rgba(168, 84, 98, 0.35)",
  },
  {
    step: "02",
    title: "Commit",
    description: "Conventional commit messages generated and applied",
    accentColor: "#4a7cb5",
    borderColor: "rgba(74, 124, 181, 0.35)",
  },
  {
    step: "03",
    title: "Review",
    description: "Security, quality, and pattern insights surfaced",
    accentColor: "#d4a847",
    borderColor: "rgba(212, 168, 71, 0.35)",
  },
  {
    step: "04",
    title: "PR",
    description: "Pull request description drafted and ready to paste",
    accentColor: "#a855f7",
    borderColor: "rgba(168, 85, 247, 0.35)",
  },
];

const autoCommands = [
  {
    cmd: "inyeon auto --staged",
    desc: "Full pipeline in one command",
  },
  {
    cmd: "inyeon auto --all --dry-run",
    desc: "Preview the pipeline without committing",
  },
  {
    cmd: "inyeon auto --staged --no-review",
    desc: "Skip code review step",
  },
  {
    cmd: "inyeon auto --staged --no-pr",
    desc: "Skip PR generation step",
  },
];

export default function WorkflowShowcase() {
  return (
    <section
      id="workflow"
      className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative"
    >
      {/* Subtle section glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(168, 85, 247, 0.04) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-10 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-aurora-purple/30 bg-aurora-purple/5 mb-4 sm:mb-6">
            <span className="text-aurora-purple text-xs font-medium">
              v3.0.0
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            <span className="text-aurora-purple">Full workflow</span> automation
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-lg mx-auto px-2">
            One command runs the entire pipeline — split, commit, review, and
            generate a PR description automatically.
          </p>
        </motion.div>

        {/* Pipeline steps */}
        <motion.div
          className="mb-10 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row lg:items-stretch gap-3 sm:gap-4 lg:gap-0">
            {pipelineSteps.map((step, index) => (
              <Fragment key={step.step}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="lg:flex-1 lg:min-w-0"
                >
                  <TiltCard className="group h-full">
                    <div
                      className="glass-card glass-card-glow p-5 sm:p-6 h-full"
                      style={{ borderColor: step.borderColor }}
                    >
                      <div
                        className="text-xs font-mono mb-3"
                        style={{ color: step.accentColor, opacity: 0.75 }}
                      >
                        {step.step}
                      </div>
                      <h3
                        className="font-bold text-lg sm:text-xl mb-2"
                        style={{ color: step.accentColor }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </TiltCard>
                </motion.div>

                {/* Arrow — sits between cards as a flex child, desktop only */}
                {index < pipelineSteps.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center w-10 flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-zinc-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </motion.div>

        {/* Cost optimization note */}
        <motion.div
          className="mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-card p-5 sm:p-6 border border-aurora-green/20 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-shrink-0 w-1.5 h-10 bg-aurora-green rounded-full" />
            <div>
              <p className="text-aurora-green text-sm sm:text-base font-medium mb-1">
                Cost-optimized short-circuits
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Skips split for single-file changes · Skips review for small
                diffs (&lt;500 chars) · As few as 2 LLM calls for simple changes
              </p>
            </div>
          </div>
        </motion.div>

        {/* Auto command examples */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {autoCommands.map((item, i) => (
            <div
              key={i}
              className="p-4 sm:p-5 glass-card glass-card-glow group"
            >
              <code className="text-aurora-purple text-sm sm:text-base group-hover:text-aurora-cyan transition-colors">
                {item.cmd}
              </code>
              <p className="text-zinc-400 text-sm mt-2">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
