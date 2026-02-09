"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Atomic Commit Splitting",
    description:
      "Intelligently group changes into smaller, logical commits with 4 clustering strategies",
    accentColor: "#722f37",
    titleColor: "text-bordeaux",
  },
  {
    title: "Multi-Agent System",
    description:
      "CommitAgent, ReviewAgent, SplitAgent, and Orchestrator working in harmony",
    accentColor: "#1e3a5f",
    titleColor: "text-navy",
  },
  {
    title: "RAG-Powered Context",
    description:
      "ChromaDB indexes your codebase for semantic understanding and smart retrieval",
    accentColor: "#b8860b",
    titleColor: "text-golden",
  },
  {
    title: "Dual LLM Support",
    description: "Local with Ollama or cloud with Gemini 2.5 Flash",
    accentColor: "#a855f7",
    titleColor: "text-aurora-purple",
  },
  {
    title: "Conventional Commits",
    description: "Auto-generates properly formatted commit messages every time",
    accentColor: "#22d3ee",
    titleColor: "text-aurora-cyan",
  },
  {
    title: "Smart Code Review",
    description: "AI-powered insights on security, code quality, and patterns",
    accentColor: "#10b981",
    titleColor: "text-aurora-green",
  },
];

export default function Features() {
  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-zinc-500 text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 sm:mb-4">
            Features
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Everything you need for{" "}
            <span className="gradient-text-warm">smarter git</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group w-full"
            >
              <div
                className="w-1 h-6 sm:h-8 mb-3 sm:mb-4 group-hover:h-10 sm:group-hover:h-12 transition-all duration-300"
                style={{ backgroundColor: feature.accentColor }}
              />
              <h3
                className={`${feature.titleColor} font-semibold text-base sm:text-lg mb-2`}
              >
                {feature.title}
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
