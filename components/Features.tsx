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
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div
                className="w-1 h-8 mb-4 group-hover:h-12 transition-all duration-300"
                style={{ backgroundColor: feature.accentColor }}
              />
              <h3 className={`${feature.titleColor} font-semibold text-lg mb-2`}>
                {feature.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
