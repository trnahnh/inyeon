"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 7, label: "AI Agents" },
  { value: 4, label: "Clustering Strategies" },
  { value: 1, label: "Command to rule them all" },
  { value: 100, suffix: "%", label: "Open Source" },
];

function AnimatedCounter({ item, inView }: { item: StatItem; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) {
      setCount(0);
      return;
    }

    const duration = 1200;
    const steps = 30;
    const stepDuration = duration / steps;
    let current = 0;

    const interval = setInterval(() => {
      current++;
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * item.value));

      if (current >= steps) {
        clearInterval(interval);
        setCount(item.value);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [inView, item.value]);

  return (
    <span className="gradient-text text-2xl sm:text-3xl md:text-5xl font-bold tabular-nums">
      {item.prefix}
      {count}
      {item.suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.5 });

  return (
    <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6" ref={ref}>
      <motion.div
        className="max-w-4xl mx-auto w-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="glass-card p-6 sm:p-8 md:p-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((item, index) => (
              <motion.div
                key={item.label}
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <AnimatedCounter item={item} inView={inView} />
                <p className="text-zinc-500 text-xs sm:text-sm mt-2">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
