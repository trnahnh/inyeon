"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const query = "(pointer: fine)";

function subscribe(callback: () => void) {
  const match = window.matchMedia(query);
  match.addEventListener("change", callback);
  return () => match.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(query).matches;
}

function getServerSnapshot() {
  return false;
}

export default function CursorSpotlight() {
  const isPointerFine = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPointerFine) return;

    const handleMove = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(196, 163, 90, 0.03), transparent 70%)`;
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [isPointerFine]);

  if (!isPointerFine) return null;

  return <div ref={ref} className="fixed inset-0 pointer-events-none z-40" />;
}
