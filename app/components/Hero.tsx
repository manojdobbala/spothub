export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 grid-bg overflow-hidden">
      {/* Background glow blobs */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,255,135,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Badge */}
      <div className="fade-in-up fade-in-up-delay-1 mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-white/60">
        <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-[#00ff87]" />
        Now live in Hyderabad
      </div>

      {/* Headline */}
      <h1 className="fade-in-up fade-in-up-delay-2 max-w-3xl text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05]">
        Urban land,{" "}
        <span className="gradient-text">finally</span>
        <br />
        put to work
      </h1>

      {/* Sub */}
      <p className="fade-in-up fade-in-up-delay-3 mt-6 max-w-xl text-lg text-white/50 leading-relaxed">
        Spothub connects vacant plot owners with quick-commerce brands and cloud
        kitchen operators — verified, fast, and friction-free.
      </p>

      {/* Dual CTA */}
      <div className="fade-in-up fade-in-up-delay-4 mt-10 flex flex-col sm:flex-row items-center gap-4">
        <a
          id="list-land"
          href="#for-landowners"
          className="group flex items-center gap-2 h-12 px-6 rounded-full border border-white/15 bg-white/5 text-sm font-medium text-white hover:bg-white/10 hover:border-white/25 transition-all"
        >
          <LandIcon />
          I have land to rent
        </a>
        <a
          id="find-space"
          href="#for-enterprises"
          className="group flex items-center gap-2 h-12 px-6 rounded-full text-sm font-medium text-[#0a0a0a] transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #00ff87, #60efff)" }}
        >
          <SearchIcon />
          I need a location
        </a>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="text-xs tracking-widest uppercase text-white/50">Scroll</span>
        <ChevronDown />
      </div>
    </section>
  );
}

function LandIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 20h18" />
      <path d="M5 20V10l7-7 7 7v10" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
