const steps = [
  {
    number: "01",
    title: "List or search",
    description:
      "Landowners post their plot dimensions, road access, and power specs. Enterprises set their catchment requirements.",
    color: "#00ff87",
  },
  {
    number: "02",
    title: "Verified & matched",
    description:
      "Our platform audits every listing — zoning compliance, infrastructure capacity, and delivery isochrones — then surfaces the right fit.",
    color: "#60efff",
  },
  {
    number: "03",
    title: "Close in days",
    description:
      "Lease terms are agreed on-platform with escrow processing. What used to take 45 days now takes under 7.",
    color: "#a78bfa",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-medium tracking-widest uppercase text-white/50 mb-4">
            How it works
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Simple by design
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="card-hover relative rounded-2xl p-8 border border-white/8"
              style={{ background: "#111111" }}
            >
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-12 -right-3 w-6 h-px"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                  aria-hidden="true"
                />
              )}

              <span
                className="block text-5xl font-black mb-6 tracking-tighter"
                style={{ color: step.color, opacity: 0.15 }}
                aria-hidden="true"
              >
                {step.number}
              </span>

              <div
                className="w-8 h-0.5 rounded-full mb-5"
                style={{ background: step.color }}
              />

              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
