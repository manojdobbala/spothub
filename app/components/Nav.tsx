"use client";

import { useState, useEffect } from "react";
import Logo from "./Logo";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10, 10, 10, 0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* ── Logo with spotlight glow ── */}
        <a href="#" className="relative flex items-center group" aria-label="Spothub home">

          {/* Layer 1: wide outer halo — barely visible, large spread */}
          <span
            className="absolute pointer-events-none"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 220,
              height: 120,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(0,255,135,0.12) 0%, transparent 70%)",
              filter: "blur(18px)",
              animation: "logoGlow 3s ease-in-out infinite",
            }}
            aria-hidden="true"
          />

          {/* Layer 2: tight bright core — punchy centre */}
          <span
            className="absolute pointer-events-none"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 100,
              height: 60,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(0,255,135,0.32) 0%, transparent 65%)",
              filter: "blur(8px)",
              animation: "logoGlow 3s ease-in-out infinite",
              animationDelay: "0.15s",
            }}
            aria-hidden="true"
          />

          {/* Layer 3: tiny hot-spot directly under the cube mark */}
          <span
            className="absolute pointer-events-none"
            style={{
              left: 19,         /* centre of the cube mark at height=38 */
              top: "50%",
              transform: "translateY(-50%)",
              width: 38,
              height: 38,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(96,239,255,0.45) 0%, transparent 70%)",
              filter: "blur(6px)",
              animation: "logoGlow 3s ease-in-out infinite",
              animationDelay: "0.3s",
            }}
            aria-hidden="true"
          />

          {/* Actual logo — sits on top, drop-shadow reinforces the "emitting" feel */}
          <span
            style={{
              position: "relative",
              filter:
                "drop-shadow(0 0 6px rgba(0,255,135,0.6)) drop-shadow(0 0 18px rgba(0,255,135,0.3))",
              transition: "filter 0.3s ease",
            }}
            className="group-hover:[filter:drop-shadow(0_0_10px_rgba(0,255,135,0.9))_drop-shadow(0_0_28px_rgba(0,255,135,0.5))]"
          >
            <Logo height={38} variant="light" />
          </span>
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {["How it works", "For Landowners", "For Enterprises"].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
              className="nav-link text-sm text-white/60 hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#list-land"
            className="hidden sm:inline-flex text-sm text-white/70 hover:text-white transition-colors"
          >
            List your land
          </a>
          <a
            href="/find-space"
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-sm font-medium text-[#0a0a0a] transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #00ff87, #60efff)" }}
          >
            Find a space
          </a>
        </div>
      </nav>

      {/* Keyframe — defined once in the header so it only renders when Nav mounts */}
      <style>{`
        @keyframes logoGlow {
          0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 1;   transform: translate(-50%, -50%) scale(1.12); }
        }
      `}</style>
    </header>
  );
}
