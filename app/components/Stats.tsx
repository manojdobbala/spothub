const metrics = [
  {
    value: "45→7",
    unit: "days",
    label: "Site search compressed",
    description: "From legacy broker timelines to platform-close",
  },
  {
    value: "92%",
    unit: "",
    label: "Friction eliminated",
    description: "Drop-offs from opaque records & zoning gaps",
  },
  {
    value: "₹1.5Cr",
    unit: "",
    label: "Year 1 target GMV",
    description: "Across 50 enterprise node placements",
  },
  {
    value: "2–3km",
    unit: "",
    label: "Isochrone accuracy",
    description: "Travel-time delivery boundary, not straight-line",
  },
];

export default function Stats() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Highlight strip */}
        <div
          className="rounded-2xl p-10 md:p-14 border border-white/[0.06] relative overflow-hidden"
          style={{ background: "#0f0f0f" }}
        >
          {/* BG glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 60% 0%, rgba(0,255,135,0.06) 0%, transparent 60%)",
            }}
            aria-hidden="true"
          />

          <div className="relative text-center mb-12">
            <p className="text-xs font-medium tracking-widest uppercase text-white/50 mb-4">
              By the numbers
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              The gap we&apos;re closing
            </h2>
          </div>

          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((m) => (
              <div key={m.label} className="text-center">
                <div className="flex items-baseline justify-center gap-1 mb-1">
                  <span className="text-4xl md:text-5xl font-black tracking-tight gradient-text">
                    {m.value}
                  </span>
                  {m.unit && (
                    <span className="text-lg font-medium text-white/60">{m.unit}</span>
                  )}
                </div>
                <p className="text-sm font-medium text-white mb-1">{m.label}</p>
                <p className="text-xs text-white/60 leading-relaxed">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
