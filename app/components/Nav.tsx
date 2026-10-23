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
        background: scrolled
          ? "rgba(10, 10, 10, 0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <Logo height={38} variant="light" />
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
    </header>
  );
}
