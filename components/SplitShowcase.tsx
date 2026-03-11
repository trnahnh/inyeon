"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import TiltCard from "./TiltCard";

const strategies = [
  {
    name: "directory",
    description: "Group by folder structure",
    label: "DIR",
    accentColor: "#4a7cb5",
  },
  {
    name: "semantic",
    description: "Group by code similarity",
    label: "SEM",
    accentColor: "#a08090",
  },
  {
    name: "conventional",
    description: "Group by commit type",
    label: "CNV",
    accentColor: "#c4a35a",
  },
  {
    name: "hybrid",
    description: "Combine all strategies",
    label: "HYB",
    accentColor: "#6b8db5",
  },
];

const splitCommands = [
  {
    cmd: "inyeon split --staged --preview",
    desc: "Preview how changes will be split",
  },
  {
    cmd: "inyeon split --staged --interactive",
    desc: "Approve each commit individually",
  },
  {
    cmd: "inyeon split --staged --execute",
    desc: "Auto-commit all groups",
  },
  {
    cmd: "inyeon split --staged --strategy semantic",
    desc: "Use a specific clustering strategy",
  },
];

export default function SplitShowcase() {
  return (
    <section
      id="split"
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
              v2.0.0
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-3 sm:mb-4">
            <span className="text-bordeaux">Atomic</span> commit splitting
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base max-w-lg mx-auto px-2">
            Intelligently group your staged changes into smaller, logical
            commits using multi-agent AI and clustering strategies.
          </p>
        </motion.div>

        {/* Screenshot showcase */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-10 sm:mb-16 md:mb-20"
        >
          <div className="relative overflow-hidden border border-border hud-corners">
            {/* Terminal title bar */}
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border-b border-border bg-[#050505]">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-zinc-700" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-zinc-700" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-zinc-700" />
              </div>
              <span className="text-zinc-600 text-xs ml-2 font-mono tracking-wider truncate">
                inyeon split --staged --execute
              </span>
            </div>
            {/* Screenshot */}
            <div className="relative w-full overflow-hidden bg-[#050505] max-h-[250px] sm:max-h-[400px] md:max-h-none">
              <Image
                src="/split.png"
                alt="Inyeon split command splitting staged changes into 6 atomic commit groups"
                width={1920}
                height={1080}
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        {/* Strategies grid */}
        <motion.div
          className="mb-10 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="label-mono text-center mb-6 sm:mb-8">
            Clustering Strategies
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {strategies.map((strategy, index) => (
              <motion.div
                key={strategy.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <TiltCard className="h-full">
                  <div className="group p-4 sm:p-5 bg-black hover:bg-white/2 transition-colors h-full">
                    {/* Accent top line */}
                    <div
                      className="w-6 h-px mb-3 sm:mb-4 group-hover:w-10 transition-all duration-300"
                      style={{ backgroundColor: strategy.accentColor }}
                    />
                    <p
                      className="font-mono text-xs tracking-wider mb-1"
                      style={{ color: strategy.accentColor }}
                    >
                      {strategy.label}
                    </p>
                    <p className="text-zinc-300 text-xs sm:text-sm font-medium mb-1">
                      {strategy.name}
                    </p>
                    <p className="text-zinc-600 text-sm leading-relaxed">
                      {strategy.description}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Split command examples */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {splitCommands.map((item, i) => (
            <div
              key={i}
              className="p-3 sm:p-5 bg-black group hover:bg-white/2 transition-colors"
            >
              <code className="text-cold-blue text-xs sm:text-sm font-mono group-hover:text-warm-gold transition-colors break-all">
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
