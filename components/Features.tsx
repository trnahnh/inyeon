"use client";

import { motion } from "framer-motion";
import TiltCard from "./TiltCard";

const features = [
  {
    title: "Full Workflow Automation",
    description:
      "Split, commit, review, and generate PRs in one command with inyeon auto",
    accentColor: "#a08090",
  },
  {
    title: "Atomic Commit Splitting",
    description:
      "Intelligently group changes into smaller, logical commits with 4 clustering strategies",
    accentColor: "#4a7cb5",
  },
  {
    title: "AI Conflict Resolution",
    description:
      "Understands both sides of a merge conflict and produces clean, merged code",
    accentColor: "#c4a35a",
  },
  {
    title: "Changelog Generation",
    description:
      "Groups commits by type with narrative summaries — write to file or stdout",
    accentColor: "#6b8db5",
  },
  {
    title: "RAG-Powered Context",
    description:
      "ChromaDB indexes your codebase for semantic understanding and smart retrieval",
    accentColor: "#6b7a8d",
  },
  {
    title: "Smart Code Review",
    description:
      "AI-powered insights on security, code quality, and patterns — runs inside auto pipeline",
    accentColor: "#10b981",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="label-mono mb-3 sm:mb-4">Features</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
            Everything you need for{" "}
            <span className="gradient-text-warm">smarter git</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border"
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
              <TiltCard className="h-full">
                <div className="p-5 sm:p-6 bg-black hover:bg-white/2 transition-colors h-full">
                  <div
                    className="w-6 h-px mb-4 group-hover:w-12 transition-all duration-300"
                    style={{ backgroundColor: feature.accentColor }}
                  />
                  <h3
                    className="font-medium text-base sm:text-lg mb-2"
                    style={{ color: feature.accentColor }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-zinc-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
