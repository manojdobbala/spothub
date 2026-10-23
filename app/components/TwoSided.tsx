export default function TwoSided() {
  return (
    <section id="for-landowners" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <p className="text-center text-xs font-medium tracking-widest uppercase text-white/30 mb-16">
          Two sides. One platform.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Landowner Card */}
          <div
            id="for-landowners"
            className="card-hover relative rounded-2xl p-8 border border-white/8 overflow-hidden"
            style={{ background: "#111111" }}
          >
            {/* Accent glow */}
            <div
              className="absolute top-0 left-0 w-full h-1 rounded-t-2xl"
              style={{ background: "linear-gradient(90deg, #00ff87, #60efff)" }}
            />

            <div className="mb-6 w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,255,135,0.1)" }}>
              <LandIcon />
            </div>

            <div className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-full text-xs font-medium text-[#00ff87] border border-[#00ff87]/20 bg-[#00ff87]/5">
              Landowners
            </div>

            <h2 className="text-2xl font-bold tracking-tight mb-3">
              Your vacant plot is a revenue stream
            </h2>
            <p className="text-white/50 leading-relaxed mb-8">
              List your urban land — 100 sq yards or more — and get matched with
              verified enterprise tenants. No brokers, no delays.
            </p>

            <ul className="space-y-3 mb-10">
              {[
                "Free to list, verified for trust",
                "Real-time demand heatmaps",
                "Transparent lease terms",
                "End-to-end escrow processing",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-white/70">
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="/list-land"
              className="inline-flex items-center gap-2 h-10 px-5 rounded-full text-sm font-medium text-[#0a0a0a] transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #00ff87, #60efff)" }}
            >
              List your land →
            </a>
          </div>

          {/* Enterprise Card */}
          <div
            id="for-enterprises"
            className="card-hover relative rounded-2xl p-8 border border-white/8 overflow-hidden"
            style={{ background: "#111111" }}
          >
            <div
              className="absolute top-0 left-0 w-full h-1 rounded-t-2xl"
              style={{ background: "linear-gradient(90deg, #60efff, #a78bfa)" }}
            />

            <div className="mb-6 w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(96,239,255,0.1)" }}>
              <BuildingIcon />
            </div>

            <div className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-full text-xs font-medium text-[#60efff] border border-[#60efff]/20 bg-[#60efff]/5">
              Enterprises
            </div>

            <h2 className="text-2xl font-bold tracking-tight mb-3">
              Find your next dark store or cloud kitchen in days
            </h2>
            <p className="text-white/50 leading-relaxed mb-8">
              Stop losing weeks to dead-end site searches. Every listing is
              pre-vetted for zoning, infrastructure, and delivery isochrones.
            </p>

            <ul className="space-y-3 mb-10">
              {[
                "2–3km delivery isochrone mapping",
                "GHMC zoning & FSSAI pre-screened",
                "Grid power & road access verified",
                "45-day search cut to under 7 days",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-white/70">
                  <CheckIcon color="#60efff" />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="/find-space"
              className="inline-flex items-center gap-2 h-10 px-5 rounded-full text-sm font-medium text-[#0a0a0a] transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #60efff, #a78bfa)" }}
            >
              Find a space →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon({ color = "#00ff87" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function LandIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00ff87" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 20h18" />
      <path d="M5 20V10l7-7 7 7v10" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60efff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  );
}
