import type { Metadata } from "next";
import ListLandForm from "./ListLandForm";
import Logo from "../components/Logo";
import Link from "next/link";

export const metadata: Metadata = {
  title: "List Your Land — Spothub",
  description:
    "List your vacant urban plot on Spothub and get matched with verified enterprise tenants — dark stores, cloud kitchens and more.",
};

export default function ListLandPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#0a0a0a]">
      {/* ── Left panel ── */}
      <div className="relative lg:w-[45%] flex flex-col justify-between p-8 lg:p-12 overflow-hidden min-h-[340px] lg:min-h-screen">
        {/* Background layers */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #0d1f14 0%, #0a0a0a 60%, #0a0a0a 100%)",
          }}
          aria-hidden="true"
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,255,135,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,135,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />
        {/* Glow */}
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0,255,135,0.12) 0%, transparent 70%)",
            transform: "translate(-30%, 30%)",
          }}
          aria-hidden="true"
        />

        {/* Nav */}
        <div className="relative z-10">
          <Link href="/" aria-label="Back to home">
            <Logo height={34} variant="light" />
          </Link>
        </div>

        {/* Body copy */}
        <div className="relative z-10 mt-16 lg:mt-0">
          {/* Isometric land illustration — pure SVG */}
          <LandIllustration />

          <div className="mt-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00ff87]/20 bg-[#00ff87]/5 text-xs text-[#00ff87] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse" />
              Free to list · No broker fees
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] text-white">
              Your vacant plot,<br />
              <span
                style={{
                  background: "linear-gradient(135deg, #00ff87, #60efff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                earning for you
              </span>
            </h1>
            <p className="mt-4 text-white/50 leading-relaxed max-w-sm">
              List once. Get matched with verified quick-commerce and cloud kitchen operators looking for exactly your location.
            </p>

            {/* Trust signals */}
            <div className="mt-8 flex flex-col gap-3">
              {[
                "Verified enterprise tenants only",
                "Lease closed in under 7 days",
                "₹1.5L+ monthly earning potential",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-white/70">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff87" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:py-0"
        style={{ background: "#0f0f0f" }}
      >
        <div className="w-full max-w-lg">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              List your land
            </h2>
            <p className="text-white/60 text-sm mt-1">
              Takes 2 minutes. Our team will verify and go live within 24 hrs.
            </p>
          </div>

          <ListLandForm />
        </div>
      </div>
    </div>
  );
}

function LandIllustration() {
  return (
    <svg
      viewBox="0 0 360 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-sm"
      aria-hidden="true"
    >
      {/* Ground plane */}
      <ellipse cx="180" cy="155" rx="160" ry="18" fill="rgba(0,255,135,0.06)" />

      {/* Back plot outline */}
      <polygon
        points="90,110 160,75 230,110 160,145"
        fill="rgba(0,255,135,0.04)"
        stroke="rgba(0,255,135,0.15)"
        strokeWidth="1"
      />

      {/* Main isometric plot — left */}
      <polygon points="40,120 110,85 140,105 70,140" fill="rgba(0,255,135,0.08)" stroke="rgba(0,255,135,0.3)" strokeWidth="1.2" />
      {/* Grid on left plot */}
      {[0.3, 0.6].map((t) => (
        <g key={t}>
          <line
            x1={40 + (110 - 40) * t} y1={120 + (85 - 120) * t}
            x2={70 + (140 - 70) * t} y2={140 + (105 - 140) * t}
            stroke="rgba(0,255,135,0.2)" strokeWidth="0.8"
          />
          <line
            x1={40 + (70 - 40) * t} y1={120 + (140 - 120) * t}
            x2={110 + (140 - 110) * t} y2={85 + (105 - 85) * t}
            stroke="rgba(0,255,135,0.2)" strokeWidth="0.8"
          />
        </g>
      ))}

      {/* Main isometric plot — right */}
      <polygon points="160,80 240,115 240,140 160,105" fill="rgba(96,239,255,0.06)" stroke="rgba(96,239,255,0.25)" strokeWidth="1.2" />

      {/* Building / dark store on right plot */}
      {/* Front face */}
      <polygon points="175,105 225,82 225,115 175,138" fill="rgba(96,239,255,0.07)" stroke="rgba(96,239,255,0.3)" strokeWidth="1" />
      {/* Top face */}
      <polygon points="175,105 225,82 240,90 190,113" fill="rgba(96,239,255,0.1)" stroke="rgba(96,239,255,0.3)" strokeWidth="1" />
      {/* Side face */}
      <polygon points="225,82 240,90 240,123 225,115" fill="rgba(96,239,255,0.05)" stroke="rgba(96,239,255,0.25)" strokeWidth="1" />
      {/* Door */}
      <rect x="192" y="118" width="14" height="20" rx="1" fill="rgba(96,239,255,0.15)" stroke="rgba(96,239,255,0.4)" strokeWidth="0.8" />

      {/* Pin drop on left plot */}
      <circle cx="90" cy="108" r="6" fill="rgba(0,255,135,0.2)" stroke="#00ff87" strokeWidth="1.5" />
      <circle cx="90" cy="108" r="2.5" fill="#00ff87" />
      <line x1="90" y1="114" x2="90" y2="122" stroke="#00ff87" strokeWidth="1.5" strokeLinecap="round" />

      {/* Dashed connection line */}
      <line x1="96" y1="110" x2="170" y2="100" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4 3" />

      {/* Stars / sparkles */}
      <circle cx="130" cy="60" r="1.5" fill="rgba(255,255,255,0.3)" />
      <circle cx="260" cy="70" r="1" fill="rgba(0,255,135,0.5)" />
      <circle cx="50" cy="80" r="1" fill="rgba(96,239,255,0.5)" />
      <circle cx="300" cy="100" r="1.5" fill="rgba(255,255,255,0.2)" />
    </svg>
  );
}
