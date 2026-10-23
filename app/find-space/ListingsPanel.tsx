"use client";

import { useRef, useEffect } from "react";
import type { Listing } from "./listings";

interface Props {
  listings: Listing[];
  activeId: number | null;
  onHover: (id: number | null) => void;
}

export default function ListingsPanel({ listings, activeId, onHover }: Props) {
  const activeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (activeId && activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeId]);

  return (
    <aside className="w-full sm:w-[360px] lg:w-[400px] shrink-0 flex flex-col border-r border-white/[0.06] overflow-hidden">
      {/* Panel header */}
      <div className="px-4 py-3 border-b border-white/[0.06]">
        <p className="text-xs text-white/30">
          Showing <span className="text-white font-medium">{listings.length}</span> verified plots
        </p>
      </div>

      {/* Cards */}
      <div className="flex-1 overflow-y-auto space-y-2 p-3">
        {listings.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center py-16">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <p className="text-white/40 text-sm">No plots match your filters</p>
            <p className="text-white/25 text-xs">Try adjusting your search</p>
          </div>
        ) : (
          listings.map((l) => (
            <ListingCard
              key={l.id}
              listing={l}
              active={activeId === l.id}
              ref={activeId === l.id ? activeRef : null}
              onHover={onHover}
            />
          ))
        )}
      </div>
    </aside>
  );
}

import React from "react";

const ListingCard = React.forwardRef<
  HTMLDivElement,
  { listing: Listing; active: boolean; onHover: (id: number | null) => void }
>(({ listing: l, active, onHover }, ref) => {
  return (
    <div
      ref={ref}
      onMouseEnter={() => onHover(l.id)}
      onMouseLeave={() => onHover(null)}
      className="group relative rounded-xl border p-4 cursor-pointer transition-all"
      style={{
        background: active ? "rgba(0,255,135,0.04)" : "rgba(255,255,255,0.02)",
        borderColor: active ? "rgba(0,255,135,0.25)" : "rgba(255,255,255,0.07)",
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {l.verified && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium text-[#00ff87] bg-[#00ff87]/10 border border-[#00ff87]/20">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#00ff87" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                Verified
              </span>
            )}
            <span className="text-[10px] text-white/30 capitalize">{l.propertyType}</span>
          </div>
          <h3 className="text-sm font-semibold text-white leading-snug truncate">{l.title}</h3>
          <p className="text-xs text-white/40 mt-0.5">{l.locality}</p>
        </div>
        {/* Rent */}
        <div className="text-right shrink-0">
          <p className="text-base font-bold text-white">
            ₹{(l.rent / 1000).toFixed(0)}K
          </p>
          <p className="text-[10px] text-white/30">/month</p>
        </div>
      </div>

      {/* Specs row */}
      <div className="flex items-center gap-3 mb-3">
        <Spec icon={<AreaIcon />} label={`${l.area} sq yds`} />
        <Spec icon={<RadiusIcon />} label={l.isochrone} />
        <Spec icon={<RoadIcon />} label={l.road} />
        <Spec icon={<PowerIcon />} label={l.power} />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {l.tags.map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 rounded-full text-[10px] font-medium border"
            style={{
              color: "rgba(96,239,255,0.8)",
              borderColor: "rgba(96,239,255,0.15)",
              background: "rgba(96,239,255,0.05)",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* CTA — shown on hover */}
      <div className={`mt-3 transition-all overflow-hidden ${active ? "max-h-12 opacity-100" : "max-h-0 opacity-0"}`}>
        <button
          className="w-full h-8 rounded-lg text-xs font-semibold text-[#0a0a0a] transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #00ff87, #60efff)" }}
        >
          Request this space →
        </button>
      </div>
    </div>
  );
});

ListingCard.displayName = "ListingCard";

function Spec({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1 text-[10px] text-white/40">
      <span className="text-white/20">{icon}</span>
      {label}
    </div>
  );
}

function AreaIcon() {
  return <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="1"/></svg>;
}
function RadiusIcon() {
  return <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>;
}
function RoadIcon() {
  return <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 22 12 2l7 20"/><path d="M9 12h6"/></svg>;
}
function PowerIcon() {
  return <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>;
}
