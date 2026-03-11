"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";

const pipelineSteps = [
  {
    step: "01",
    title: "Split",
    description: "Changes grouped into atomic commits by AI clustering",
    accentColor: "#a08090",
  },
  {
    step: "02",
    title: "Commit",
    description: "Conventional commit messages generated and applied",
    accentColor: "#6b8db5",
  },
  {
    step: "03",
    title: "Review",
    description: "Security, quality, and pattern insights surfaced",
    accentColor: "#c4a35a",
  },
  {
    step: "04",
    title: "PR",
    description: "Pull request description drafted and ready to paste",
    accentColor: "#6b8db5",
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
              v3.0.0
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-3 sm:mb-4">
            <span className="text-golden">Full workflow</span> automation
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base max-w-lg mx-auto px-2">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {pipelineSteps.map((step, index) => (
              <Fragment key={step.step}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <TiltCard className="h-full">
                    <div className="group p-5 sm:p-6 bg-black hover:bg-white/2 transition-colors h-full">
                      <div
                        className="text-xs font-mono mb-3 tracking-wider"
                        style={{ color: step.accentColor, opacity: 0.6 }}
                      >
                        {step.step}
                      </div>
                      <div
                        className="w-6 h-px mb-3 group-hover:w-10 transition-all duration-300"
                        style={{ backgroundColor: step.accentColor }}
                      />
                      <h3
                        className="font-bold text-lg sm:text-xl mb-2"
                        style={{ color: step.accentColor }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-zinc-600 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </TiltCard>
                </motion.div>
              </Fragment>
            ))}
          </div>

          {/* Connecting arrows — desktop only */}
          <div className="hidden lg:flex justify-around mt-4">
            {[0, 1, 2].map((i) => (
              <svg
                key={i}
                className="w-4 h-4 text-zinc-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 14l-7 7m0 0l-7-7"
                />
              </svg>
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
          <div
            className="panel p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            style={{ borderLeft: "2px solid #10b981" }}
          >
            <div>
              <p className="text-emerald-500 text-sm sm:text-base font-medium mb-1 tracking-wide">
                Cost-optimized short-circuits
              </p>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Skips split for single-file changes · Skips review for small
                diffs (&lt;500 chars) · As few as 2 LLM calls for simple changes
              </p>
            </div>
          </div>
        </motion.div>

        {/* Auto command examples */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {autoCommands.map((item, i) => (
            <div
              key={i}
              className="p-4 sm:p-5 bg-black group hover:bg-white/2 transition-colors"
            >
              <code className="text-warm-gold text-sm sm:text-base font-mono group-hover:text-cold-blue transition-colors">
                {item.cmd}
              </code>
              <p className="text-zinc-600 text-sm mt-2">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
