"use client";

import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

export default function CTAFooter() {
  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative">
      {/* Subtle aurora glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center bottom, rgba(168, 85, 247, 0.06) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-xl mx-auto text-center relative z-10 w-full">
        <motion.h2
          className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Transform your{" "}
          <span className="gradient-text-warm">git workflow</span>
        </motion.h2>

        <motion.p
          className="text-zinc-400 text-sm sm:text-base mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Open source. Runs locally. Ready to deploy.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <MagneticButton className="w-full sm:w-auto">
            <motion.a
              href="https://github.com/suka712/inyeon-upstream"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-white inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-full transition-all w-full"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              View on GitHub
            </motion.a>
          </MagneticButton>

          <MagneticButton className="w-full sm:w-auto">
            <motion.a
              href="https://inyeon-upstream-production.up.railway.app/docs"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-ghost inline-flex items-center justify-center gap-2 text-sm sm:text-base w-full"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Live API Docs
            </motion.a>
          </MagneticButton>
        </motion.div>

        {/* Contact nudge */}
        <motion.div
          className="mt-10 sm:mt-14 md:mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-zinc-100 text-sm mb-3">
            Have ideas or want to contribute?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <a
              href="https://github.com/suka712/inyeon-upstream/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white text-sm transition-colors"
            >
              Open an issue
            </a>
            <span className="text-zinc-600 hidden sm:inline">|</span>
            <a
              href="mailto:anhdtran.forwork@gmail.com"
              className="text-zinc-400 hover:text-white text-sm sm:text-base transition-colors break-all"
            >
              anhdtran.forwork@gmail.com
            </a>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="mt-8 sm:mt-10 md:mt-14 pt-6 sm:pt-8 border-t border-zinc-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-zinc-500 text-xs">
            &copy; Inyeon {new Date().getFullYear()}. All rights reserved.
          </p>
        </motion.footer>
      </div>
    </section>
  );
}
