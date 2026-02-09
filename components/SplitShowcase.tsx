"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const strategies = [
  {
    name: "directory",
    description: "Group by folder structure",
    icon: "📁",
    accentColor: "#1e3a5f",
  },
  {
    name: "semantic",
    description: "Group by code similarity",
    icon: "🧠",
    accentColor: "#722f37",
  },
  {
    name: "conventional",
    description: "Group by commit type",
    icon: "📝",
    accentColor: "#b8860b",
  },
  {
    name: "hybrid",
    description: "Combine all strategies",
    icon: "⚡",
    accentColor: "#a855f7",
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
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative">
      {/* Subtle section glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(114, 47, 55, 0.04) 0%, transparent 60%)",
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
              v2.0.0
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            <span className="text-bordeaux">Atomic</span> commit splitting
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-lg mx-auto px-2">
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
          <div className="relative rounded-lg overflow-hidden aurora-glow border border-border">
            {/* Terminal title bar */}
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border-b border-border bg-[#050505]">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500/70" />
              </div>
              <span className="text-zinc-500 text-xs ml-2 truncate">
                inyeon split --staged --execute
              </span>
            </div>
            {/* Screenshot */}
            <div className="relative w-full overflow-hidden bg-[#050505]">
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
          <p className="text-zinc-500 text-xs text-center tracking-[0.2em] uppercase mb-6 sm:mb-8">
            Clustering Strategies
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {strategies.map((strategy, index) => (
              <motion.div
                key={strategy.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group relative p-4 sm:p-5 rounded-lg border border-border hover:border-zinc-600 transition-all"
              >
                {/* Accent top bar */}
                <div
                  className="absolute top-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: strategy.accentColor }}
                />
                <div className="text-lg sm:text-xl mb-2 sm:mb-3">
                  {strategy.icon}
                </div>
                <p className="text-white text-xs sm:text-sm font-medium mb-1">
                  {strategy.name}
                </p>
                <p className="text-zinc-500 text-xs leading-relaxed">
                  {strategy.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Split command examples */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {splitCommands.map((item, i) => (
            <div
              key={i}
              className="p-3 sm:p-4 rounded-lg border border-border hover:border-aurora-purple/40 transition-colors group"
            >
              <code className="text-aurora-cyan text-xs sm:text-sm group-hover:text-aurora-purple transition-colors">
                {item.cmd}
              </code>
              <p className="text-text-secondary text-xs mt-2">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
