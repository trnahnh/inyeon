"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorSpotlight() {
  const [isPointerFine, setIsPointerFine] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const match = window.matchMedia("(pointer: fine)");
    setIsPointerFine(match.matches);

    if (!match.matches) return;

    const handleMove = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(168, 85, 247, 0.04), transparent 70%)`;
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  if (!isPointerFine) return null;

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none z-40"
    />
  );
}
