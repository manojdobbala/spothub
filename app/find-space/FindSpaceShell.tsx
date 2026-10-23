"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Logo from "../components/Logo";
import ListingsPanel from "./ListingsPanel";
import MapPanel from "./MapPanel";
import SpaceDrawer from "./SpaceDrawer";
import { listings, LOCALITIES, PROPERTY_TYPES, USE_CASES, type Listing } from "./listings";

export default function FindSpaceShell() {
  const [locality, setLocality] = useState("All Areas");
  const [propType, setPropType] = useState("All Types");
  const [useCase, setUseCase] = useState("All Uses");
  const [minArea, setMinArea] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [drawerListing, setDrawerListing] = useState<Listing | null>(null);

  const filtered = useMemo<Listing[]>(() => {
    return listings.filter((l) => {
      if (locality !== "All Areas" && l.locality !== locality) return false;
      if (propType !== "All Types" && l.propertyType !== propType) return false;
      if (useCase === "Dark Store" && !l.tags.some((t) => t.includes("Dark"))) return false;
      if (useCase === "Cloud Kitchen" && !l.tags.some((t) => t.includes("Kitchen"))) return false;
      if (minArea && l.area < parseInt(minArea)) return false;
      if (maxRent && l.rent > parseInt(maxRent.replace(/,/g, ""))) return false;
      if (verifiedOnly && !l.verified) return false;
      return true;
    });
  }, [locality, propType, useCase, minArea, maxRent, verifiedOnly]);

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] overflow-hidden">
      {/* ── Top bar ── */}
      <header className="shrink-0 h-14 flex items-center px-4 gap-4 border-b border-white/[0.06] bg-[#0a0a0a] z-30">
        <Link href="/" className="shrink-0 mr-2">
          <Logo height={28} variant="light" />
        </Link>

        <div className="flex items-center gap-2 flex-1 overflow-x-auto scrollbar-hide">
          <FilterSelect value={locality} onChange={setLocality} options={LOCALITIES} icon={<PinIcon />} />
          <FilterSelect value={propType} onChange={setPropType} options={PROPERTY_TYPES} icon={<BuildingIcon />} />
          <FilterSelect value={useCase} onChange={setUseCase} options={USE_CASES} icon={<TagIcon />} />
          <div className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-white/10 bg-white/5 text-xs text-white/60 shrink-0">
            <span className="text-white/30">≥</span>
            <input type="number" placeholder="Min sq yds" value={minArea} onChange={(e) => setMinArea(e.target.value)} className="w-20 bg-transparent outline-none placeholder-white/25 text-white" />
          </div>
          <div className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-white/10 bg-white/5 text-xs text-white/60 shrink-0">
            <span className="text-white/30">₹</span>
            <input type="number" placeholder="Max rent" value={maxRent} onChange={(e) => setMaxRent(e.target.value)} className="w-24 bg-transparent outline-none placeholder-white/25 text-white" />
          </div>
          <button
            onClick={() => setVerifiedOnly((v) => !v)}
            className={`flex items-center gap-1.5 h-8 px-3 rounded-lg border text-xs font-medium transition-colors shrink-0 ${
              verifiedOnly ? "border-[#00ff87]/40 bg-[#00ff87]/10 text-[#00ff87]" : "border-white/10 bg-white/5 text-white/50 hover:text-white"
            }`}
          >
            <ShieldIcon active={verifiedOnly} />
            Verified only
          </button>
        </div>

        <div className="shrink-0 text-xs text-white/30 hidden sm:block">
          {filtered.length} {filtered.length === 1 ? "plot" : "plots"}
        </div>
      </header>

      {/* ── Body: listings + map ── */}
      <div className="flex flex-1 min-h-0 relative">
        <ListingsPanel
          listings={filtered}
          activeId={activeId}
          onHover={setActiveId}
          onRequest={(listing) => setDrawerListing(listing)}
        />

        <div className="relative flex-1 min-w-0">
          <MapPanel
            listings={filtered}
            activeId={activeId}
            onSelect={setActiveId}
          />
        </div>

        {/* Drawer sits at the body level, overlaying only the map column */}
        <SpaceDrawer
          listing={drawerListing}
          onClose={() => setDrawerListing(null)}
        />
      </div>
    </div>
  );
}

// ── Filter select ──
function FilterSelect({
  value,
  onChange,
  options,
  icon,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  icon: React.ReactNode;
}) {
  return (
    <div className="relative flex items-center shrink-0">
      <span className="absolute left-2.5 text-white/30 pointer-events-none">{icon}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 pl-7 pr-7 rounded-lg border border-white/10 bg-white/5 text-xs text-white focus:outline-none focus:border-[#00ff87]/40 cursor-pointer appearance-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.25)' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 8px center",
        }}
      >
        {options.map((o) => (
          <option key={o} value={o} style={{ background: "#1a1a1a" }}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function PinIcon() {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 13-8 13s-8-7-8-13a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
}
function BuildingIcon() {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>;
}
function TagIcon() {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2H2v10l9.29 9.29a1 1 0 0 0 1.41 0l7.3-7.3a1 1 0 0 0 0-1.41L12 2Z"/><path d="M7 7h.01"/></svg>;
}
function ShieldIcon({ active }: { active: boolean }) {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill={active ? "rgba(0,255,135,0.3)" : "none"} stroke={active ? "#00ff87" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>;
}
