"use client";

import { useState, useEffect } from "react";
import type { Listing } from "./listings";

interface Props {
  listing: Listing | null;
  onClose: () => void;
}

const TYPE_ACCENT: Record<string, string> = {
  "Open Plot":    "#00ff87",
  "Warehouse":    "#60efff",
  "Ground Floor": "#a78bfa",
  "Mixed-use":    "#ffc850",
};

const TYPE_BG: Record<string, string> = {
  "Open Plot":    "rgba(0,255,135,0.06)",
  "Warehouse":    "rgba(96,239,255,0.06)",
  "Ground Floor": "rgba(167,139,250,0.06)",
  "Mixed-use":    "rgba(255,200,80,0.06)",
};

type Step = "detail" | "form" | "success";

// Always mounted — open/close driven purely by CSS transform
export default function SpaceDrawer({ listing, onClose }: Props) {
  const [step, setStep] = useState<Step>("detail");
  const isOpen = listing !== null;

  // Reset to detail view whenever a new listing is selected
  useEffect(() => {
    if (listing) setStep("detail");
  }, [listing]);

  // Escape key
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape" && isOpen) onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [isOpen, onClose]);

  const accent = listing ? (TYPE_ACCENT[listing.propertyType] ?? "#00ff87") : "#00ff87";
  const tileBg = listing ? (TYPE_BG[listing.propertyType] ?? "rgba(0,255,135,0.06)") : "rgba(0,255,135,0.06)";

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          top: 56,
          zIndex: 1000,
          background: "rgba(0,0,0,0.5)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.25s ease",
        }}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: "fixed",
          top: 56,
          right: 0,
          bottom: 0,
          zIndex: 1001,
          width: "min(440px, 100vw)",
          display: "flex",
          flexDirection: "column",
          background: "#111111",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
          overflow: "hidden",
        }}
      >
        {/* Only render content when we have a listing */}
        {listing && (
          <>
            {step === "detail" && (
              <DetailView
                listing={listing}
                accent={accent}
                tileBg={tileBg}
                onClose={onClose}
                onRequest={() => setStep("form")}
              />
            )}
            {step === "form" && (
              <RequestForm
                listing={listing}
                accent={accent}
                onBack={() => setStep("detail")}
                onSuccess={() => setStep("success")}
              />
            )}
            {step === "success" && (
              <SuccessView
                listing={listing}
                accent={accent}
                onClose={onClose}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}

// ── Detail view ───────────────────────────────────────────────────────────────
function DetailView({ listing: l, accent, tileBg, onClose, onRequest }: {
  listing: Listing; accent: string; tileBg: string; onClose: () => void; onRequest: () => void;
}) {
  return (
    <>
      {/* Hero */}
      <div className="relative shrink-0 h-48 flex items-center justify-center overflow-hidden" style={{ background: tileBg }}>
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-black/40 text-white/60 hover:text-white hover:bg-black/60 transition-colors z-10"
        >
          <XIcon />
        </button>
        <PlotIllustration accent={accent} type={l.propertyType} />
        {l.verified && (
          <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ background: "rgba(0,0,0,0.65)", color: accent, border: `1px solid ${accent}40` }}>
            <CheckSm color={accent} /> Spothub Verified
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Title + rent */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white">{l.title}</h2>
            <p className="text-xs text-white/60 mt-0.5">{l.locality}, Hyderabad</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-2xl font-black text-white">₹{(l.rent / 1000).toFixed(0)}K</p>
            <p className="text-xs text-white/50">/month</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          <Tag label={l.propertyType} color={accent} />
          {l.tags.map(t => <Tag key={t} label={t} />)}
        </div>

        <HR />

        {/* Specs */}
        <div>
          <Label>Plot details</Label>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <SpecCard icon="⬛" label="Plot area"       value={`${l.area} sq yds`} accent={accent} />
            <SpecCard icon="⊙"  label="Delivery radius" value={l.isochrone}        accent={accent} />
            <SpecCard icon="⇥"  label="Road access"     value={l.road}             accent={accent} />
            <SpecCard icon="⚡" label="Power supply"    value={l.power}            accent={accent} />
          </div>
        </div>

        <HR />

        {/* Compliance */}
        <div>
          <Label>Compliance & verification</Label>
          <div className="mt-3 space-y-2.5">
            {[
              { label: "GHMC C1 Zoning",          done: l.verified },
              { label: "Title clarity confirmed",  done: l.verified },
              { label: "FSSAI pre-screened",       done: l.tags.some(t => t.includes("FSSAI")) },
              { label: "Minimum road width met",   done: true },
              { label: "Grid power verified",      done: true },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center"
                  style={{ background: item.done ? `${accent}18` : "rgba(255,255,255,0.04)", border: `1px solid ${item.done ? `${accent}50` : "rgba(255,255,255,0.1)"}` }}>
                  {item.done
                    ? <CheckSm color={accent} size={7} />
                    : <XSm />}
                </div>
                <span className={`text-sm ${item.done ? "text-white/80" : "text-white/45"}`}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <HR />

        {/* Why here */}
        <div>
          <Label>Why this location</Label>
          <div className="mt-3 space-y-2">
            {[
              `${l.isochrone} delivery isochrone — high-density residential catchment`,
              `${l.road} frontage — unobstructed loading & delivery access`,
              `${l.power} grid supply — refrigeration + CCTV ready, no upgrades needed`,
            ].map(point => (
              <div key={point} className="flex gap-2 text-sm text-white/50 leading-relaxed">
                <span className="shrink-0 mt-0.5" style={{ color: accent }}>→</span>
                {point}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="shrink-0 p-4 border-t border-white/[0.06]">
        <button
          onClick={onRequest}
          className="w-full h-12 rounded-xl text-sm font-semibold text-[#0a0a0a] hover:opacity-90 active:opacity-75 transition-opacity"
          style={{ background: `linear-gradient(135deg, ${accent}, #60efff)` }}
        >
          Request this space →
        </button>
        <p className="text-center text-xs text-white/50 mt-2">No commitment · Team follows up within 24 hrs</p>
      </div>
    </>
  );
}

// ── Request form ──────────────────────────────────────────────────────────────
type FS = { name: string; email: string; phone: string; company: string; useCase: string; timeline: string; notes: string };

function RequestForm({ listing: l, accent, onBack, onSuccess }: {
  listing: Listing; accent: string; onBack: () => void; onSuccess: () => void;
}) {
  const [form, setForm] = useState<FS>({ name:"", email:"", phone:"", company:"", useCase:"", timeline:"", notes:"" });
  const [errors, setErrors] = useState<Partial<FS>>({});

  const set = (k: keyof FS) => (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [k]: e.target.value }));
    setErrors(er => ({ ...er, [k]: "" }));
  };

  function validate() {
    const next: Partial<FS> = {};
    if (!form.name.trim())    next.name    = "Required";
    if (!form.email.trim())   next.email   = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Invalid email";
    if (!form.phone.trim())   next.phone   = "Required";
    if (!form.company.trim()) next.company = "Required";
    if (!form.useCase)        next.useCase = "Required";
    if (!form.timeline)       next.timeline = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  return (
    <>
      <div className="shrink-0 flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
        <button onClick={onBack} className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors">
          <BackIcon />
        </button>
        <div>
          <p className="text-sm font-semibold text-white">Request this space</p>
          <p className="text-xs text-white/55 truncate max-w-[260px]">{l.title}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <FF label="Full name" error={errors.name} required><FI value={form.name} onChange={set("name")} placeholder="Your name" error={!!errors.name} /></FF>
          <FF label="Company"   error={errors.company} required><FI value={form.company} onChange={set("company")} placeholder="Blinkit / Swiggy…" error={!!errors.company} /></FF>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FF label="Email" error={errors.email} required><FI type="email" value={form.email} onChange={set("email")} placeholder="you@company.com" error={!!errors.email} /></FF>
          <FF label="Phone" error={errors.phone} required><FI type="tel"   value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" error={!!errors.phone} /></FF>
        </div>
        <FF label="Intended use" error={errors.useCase} required>
          <FS_ value={form.useCase} onChange={set("useCase")} error={!!errors.useCase}
            options={["Dark Store / Quick Commerce","Cloud Kitchen","Last-mile Hub","Warehousing","Other"]}
            placeholder="Select use case" />
        </FF>
        <FF label="Move-in timeline" error={errors.timeline} required>
          <FS_ value={form.timeline} onChange={set("timeline")} error={!!errors.timeline}
            options={["Within 2 weeks","1 month","2–3 months","Flexible"]}
            placeholder="Select timeline" />
        </FF>
        <FF label="Additional notes">
          <textarea value={form.notes} onChange={set("notes")} rows={3}
            placeholder="Power load, modifications, lease term…"
            className="w-full px-3.5 py-2.5 rounded-xl text-sm text-white placeholder-white/40 border border-white/10 bg-white/5 focus:border-[#00ff87]/40 focus:outline-none resize-none" />
        </FF>
      </div>

      <div className="shrink-0 p-4 border-t border-white/[0.06]">
        <button onClick={() => { if (validate()) onSuccess(); }}
          className="w-full h-12 rounded-xl text-sm font-semibold text-[#0a0a0a] hover:opacity-90 active:opacity-75 transition-opacity"
          style={{ background: `linear-gradient(135deg, ${accent}, #60efff)` }}>
          Submit request →
        </button>
        <p className="text-center text-xs text-white/50 mt-2">We respond within 24 hours</p>
      </div>
    </>
  );
}

// ── Success ───────────────────────────────────────────────────────────────────
function SuccessView({ listing: l, accent, onClose }: { listing: Listing; accent: string; onClose: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 text-center px-8 gap-5">
      <div className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: `${accent}18`, border: `1px solid ${accent}40` }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-2">Request sent!</h3>
        <p className="text-white/50 text-sm leading-relaxed max-w-xs">
          Our team will reach out within 24 hours for <span className="text-white font-medium">{l.title}</span>.
        </p>
      </div>
      <button onClick={onClose}
        className="h-10 px-6 rounded-xl text-sm font-semibold text-[#0a0a0a] hover:opacity-90 transition-opacity"
        style={{ background: `linear-gradient(135deg, ${accent}, #60efff)` }}>
        Back to listings
      </button>
    </div>
  );
}

// ── Tiny shared components ────────────────────────────────────────────────────
function HR() { return <div className="h-px bg-white/[0.06]" />; }
function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold tracking-widest uppercase text-white/50">{children}</p>;
}
function Tag({ label, color }: { label: string; color?: string }) {
  return (
    <span className="px-2 py-0.5 rounded-full text-[11px] font-medium border"
      style={color
        ? { color, borderColor: `${color}30`, background: `${color}0d` }
        : { color: "rgba(96,239,255,0.8)", borderColor: "rgba(96,239,255,0.15)", background: "rgba(96,239,255,0.05)" }}>
      {label}
    </span>
  );
}
function SpecCard({ label, value, accent }: { icon: string; label: string; value: string; accent: string }) {
  return (
    <div className="flex flex-col gap-0.5 p-3 rounded-xl border border-white/[0.06] bg-white/[0.03]">
      <p className="text-xs text-white/50">{label}</p>
      <p className="text-sm font-semibold" style={{ color: accent }}>{value}</p>
    </div>
  );
}
function FF({ label, error, required, children }: { label: string; error?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-white/60">{label}{required && <span className="text-[#00ff87] ml-0.5">*</span>}</label>
      {children}
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}
function FI({ error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return <input {...props} className={`w-full h-10 px-3.5 rounded-xl text-sm text-white placeholder-white/40 border focus:outline-none transition-colors ${error ? "border-red-500/40 bg-red-500/5" : "border-white/10 bg-white/5 focus:border-[#00ff87]/40"}`} />;
}
function FS_({ options, placeholder, error, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { options: string[]; placeholder: string; error?: boolean }) {
  return (
    <select {...props}
      className={`w-full h-10 px-3.5 rounded-xl text-sm text-white border focus:outline-none appearance-none cursor-pointer ${error ? "border-red-500/40 bg-red-500/5" : "border-white/10 bg-white/5 focus:border-[#00ff87]/40"}`}
      style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.25)' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat:"no-repeat", backgroundPosition:"right 10px center", paddingRight:"32px" }}>
      <option value="" disabled style={{ background:"#1a1a1a" }}>{placeholder}</option>
      {options.map(o => <option key={o} value={o} style={{ background:"#1a1a1a" }}>{o}</option>)}
    </select>
  );
}
function CheckSm({ color, size = 8 }: { color: string; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>;
}
function XSm() {
  return <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>;
}
function XIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>;
}
function BackIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>;
}

function PlotIllustration({ accent, type }: { accent: string; type: string }) {
  return (
    <svg viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full px-8 py-4" aria-hidden="true">
      <ellipse cx="150" cy="140" rx="130" ry="12" fill={`${accent}08`} />
      {type === "Warehouse" || type === "Ground Floor" ? (
        <>
          <polygon points="60,115 150,70 240,115 240,140 60,140" fill={`${accent}08`} stroke={`${accent}25`} strokeWidth="1.2"/>
          <polygon points="60,115 150,70 150,95 60,140"           fill={`${accent}05`} stroke={`${accent}20`} strokeWidth="1"/>
          <polygon points="150,70 240,115 240,140 150,95"          fill={`${accent}10`} stroke={`${accent}25`} strokeWidth="1"/>
          <polygon points="55,116 150,65 245,116" fill="none" stroke={`${accent}35`} strokeWidth="1.5"/>
          <rect x="130" y="112" width="20" height="28" rx="1" fill={`${accent}12`} stroke={`${accent}40`} strokeWidth="1"/>
          <rect x="80"  y="108" width="16" height="12" rx="1" fill={`${accent}10`} stroke={`${accent}30`} strokeWidth="0.8"/>
          <rect x="204" y="108" width="16" height="12" rx="1" fill={`${accent}10`} stroke={`${accent}30`} strokeWidth="0.8"/>
        </>
      ) : (
        <>
          <polygon points="50,130 150,80 250,130 150,148" fill={`${accent}06`} stroke={`${accent}25`} strokeWidth="1.2"/>
          {[0.33,0.66].map(t=>(
            <g key={t}>
              <line x1={50+(100*t)} y1={130-(50*t)} x2={150+(100*t)} y2={148-(18*t)} stroke={`${accent}18`} strokeWidth="0.8"/>
              <line x1={50+(100*t)} y1={130+(18*t)} x2={150-(100*t)+200} y2={80+(50*t)} stroke={`${accent}18`} strokeWidth="0.8"/>
            </g>
          ))}
          <circle cx="150" cy="105" r="8"   fill={`${accent}20`} stroke={accent} strokeWidth="1.5"/>
          <circle cx="150" cy="105" r="3.5" fill={accent}/>
          <line x1="150" y1="113" x2="150" y2="124" stroke={accent} strokeWidth="1.5" strokeLinecap="round"/>
        </>
      )}
      <circle cx="68"  cy="72"  r="2"   fill={`${accent}50`}/>
      <circle cx="230" cy="65"  r="1.5" fill="rgba(255,255,255,0.2)"/>
      <circle cx="260" cy="95"  r="1"   fill={`${accent}40`}/>
    </svg>
  );
}
