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
        <p className="text-zinc-400 text-xs sm:text-sm text-center tracking-[0.2em] uppercase mb-4 sm:mb-6">
          Built with
        </p>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {technologies.map((tech, index) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-zinc-300 text-sm sm:text-base rounded-full glass-badge hover:text-white"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
