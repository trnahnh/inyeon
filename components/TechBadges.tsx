"use client";

import { motion } from "framer-motion";

const technologies = [
  "Python",
  "FastAPI",
  "LangGraph",
  "Gemini",
  "Ollama",
  "ChromaDB",
  "scikit-learn",
  "NumPy",
  "Docker",
];

export default function TechBadges() {
  return (
    <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6">
      <motion.div
        className="max-w-3xl mx-auto w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <p className="label-mono text-center mb-4 sm:mb-6">Built with</p>
        <div className="flex flex-wrap justify-center -ml-px -mt-px">
          {technologies.map((tech, index) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="ml-px mt-px px-3 sm:px-4 py-1.5 sm:py-2 text-zinc-500 text-xs sm:text-sm font-mono tracking-wide border border-border hover:text-zinc-300 hover:border-border-hover transition-colors"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
