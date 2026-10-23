import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Logo height={28} variant="light" />
          <span className="text-sm text-white/30">— B2B Urban Land Marketplace</span>
        </div>

        <div className="flex items-center gap-6 text-xs text-white/30">
          <span>Hyderabad, India</span>
          <a href="mailto:hello@spothub.in" className="hover:text-white/60 transition-colors">
            hello@spothub.in
          </a>
          <span>© 2025 Spothub</span>
        </div>
      </div>
    </footer>
  );
}
