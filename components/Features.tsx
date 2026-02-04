"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Multi-Agent System",
    description: "CommitAgent, ReviewAgent, and Orchestrator working in harmony",
    accentColor: "#1e3a5f",
    titleColor: "text-navy",
  },
  {
    title: "RAG-Powered",
    description: "ChromaDB indexes your codebase for semantic understanding",
    accentColor: "#722f37",
    titleColor: "text-bordeaux",
  },
  {
    title: "Dual LLM Support",
    description: "Local with Ollama or cloud with Gemini 2.5 Flash",
    accentColor: "#b8860b",
    titleColor: "text-golden",
  },
];

export default function Features() {
  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
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
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group w-full"
            >
              <div
                className="w-1 h-6 sm:h-8 mb-3 sm:mb-4 group-hover:h-10 sm:group-hover:h-12 transition-all duration-300"
                style={{ backgroundColor: feature.accentColor }}
              />
              <h3 className={`${feature.titleColor} font-semibold text-base sm:text-lg mb-2`}>
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
