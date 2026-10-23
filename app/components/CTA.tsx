export default function CTA() {
  return (
    <section className="py-24 px-6 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Landowner CTA */}
          <div
            className="card-hover relative rounded-2xl p-10 border overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(0,255,135,0.06) 0%, rgba(0,0,0,0) 100%)",
              borderColor: "rgba(0,255,135,0.15)",
            }}
          >
            <div
              className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(0,255,135,0.08) 0%, transparent 70%)" }}
              aria-hidden="true"
            />

            <p className="text-xs font-medium tracking-widest uppercase text-[#00ff87] mb-4">
              For Landowners
            </p>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
              Your land can earn{" "}
              <span className="gradient-text">₹1.5L+ / month</span>
            </h3>
            <p className="text-white/50 text-sm leading-relaxed mb-8">
              List your vacant urban plot for free. We verify it, market it, and
              handle the paperwork.
            </p>
            <a
              href="/list-land"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-full text-sm font-semibold text-[#0a0a0a] transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #00ff87, #60efff)" }}
            >
              List your land — it&apos;s free
            </a>
          </div>

          {/* Enterprise CTA */}
          <div
            className="card-hover relative rounded-2xl p-10 border overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(96,239,255,0.06) 0%, rgba(0,0,0,0) 100%)",
              borderColor: "rgba(96,239,255,0.15)",
            }}
          >
            <div
              className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(96,239,255,0.08) 0%, transparent 70%)" }}
              aria-hidden="true"
            />

            <p className="text-xs font-medium tracking-widest uppercase text-[#60efff] mb-4">
              For Enterprises
            </p>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
              Open your next node{" "}
              <span style={{ color: "#60efff" }}>in under 7 days</span>
            </h3>
            <p className="text-white/50 text-sm leading-relaxed mb-8">
              Browse verified, zoning-compliant urban plots matched to your
              delivery radius — no brokers needed.
            </p>
            <a
              href="/find-space"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-full text-sm font-semibold text-[#0a0a0a] transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #60efff, #a78bfa)" }}
            >
              Search locations now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
