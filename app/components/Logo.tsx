interface LogoProps {
  height?: number;
  /** "light" = white on dark (default) | "color" = gradient mark | "dark" = black on light */
  variant?: "light" | "color" | "dark";
  className?: string;
}

export default function Logo({ height = 32, variant = "light", className = "" }: LogoProps) {
  const stroke = variant === "dark" ? "#0a0a0a" : "#ffffff";
  const fill   = variant === "dark" ? "#0a0a0a" : "#ffffff";

  // ViewBox: 220 wide × 56 tall — cube mark ~56×56, wordmark to the right
  const vbW = 220;
  const vbH = 56;
  const scale = height / vbH;
  const width = Math.round(vbW * scale);

  // ── Isometric cube geometry (fits in 0,0 → 56,56) ──
  // Six key vertices:
  //   top-center:    (28,  4)
  //   top-left:      ( 4, 17)
  //   top-right:     (52, 17)
  //   mid-left:      ( 4, 39)
  //   mid-center:    (28, 52)
  //   mid-right:     (52, 39)
  const TL  = "4,17";
  const TC  = "28,4";
  const TR  = "52,17";
  const ML  = "4,39";
  const MC  = "28,52";
  const MR  = "52,39";

  // Top face: TC → TR → MR(projected up) … actually top rhombus TC-TR-"28,30"-TL
  // Left face:  TL → TC → MC_left_mid → ML
  // Right face: TC → TR → MR → MC_right

  // Recompute cleanly:
  // Top face vertices:  TL(4,17) TC(28,4) TR(52,17) center-mid(28,30)
  const topFace    = "4,17 28,4 52,17 28,30";
  // Left face:          TL(4,17) mid-top(28,30) MC(28,52) ML(4,39)
  const leftFace   = "4,17 28,30 28,52 4,39";
  // Right face:         TR(52,17) MR(52,39) MC(28,52) mid-top(28,30)
  const rightFace  = "52,17 52,39 28,52 28,30";

  // Stripe lines across top face (left-to-right, parallel to TC→TL edge)
  // Top face: TL→TC is one edge, TL→"28,30" is the other
  // Stripes run parallel to the TC→TR direction across the top face
  const stripeCount = 6;
  const stripes: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
  for (let i = 1; i <= stripeCount; i++) {
    const t = i / (stripeCount + 1);
    // Interpolate left edge of top face: TL(4,17) → "28,30"
    const lx = 4  + (28 - 4)  * t;
    const ly = 17 + (30 - 17) * t;
    // Interpolate right edge of top face: TC(28,4) → TR(52,17)  … wait
    // Right edge of top face going same direction: TC(28,4) → (28,30)
    // Actually top face is TL(4,17) TC(28,4) TR(52,17) CM(28,30)
    // Left edge:  TL→CM  (bottom-left of top face going down)
    // Right edge: TC→TR  (going right)
    // Stripes parallel to TL→TC: from left-edge to right-edge
    // Left edge: TL(4,17) → CM(28,30), parametric t
    // Right edge: TC(28,4) → TR(52,17), parametric t  ← same t gives parallel lines
    const rx = 28 + (52 - 28) * t;
    const ry = 4  + (17 - 4)  * t;
    stripes.push({ x1: lx, y1: ly, x2: rx, y2: ry });
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${vbW} ${vbH}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Spothub"
      role="img"
    >
      {/* ── Cube mark ── */}
      <g>
        {/* Outline faces — filled dark so stripes are visible */}
        {/* Top face */}
        <polygon
          points={topFace}
          fill={variant === "color" ? "url(#cubeGrad)" : fill}
          opacity="1"
        />
        {/* Left face — slightly dimmed */}
        <polygon
          points={leftFace}
          fill={variant === "color" ? "url(#cubeGrad)" : fill}
          opacity={variant === "color" ? 0.6 : 0.45}
        />
        {/* Right face */}
        <polygon
          points={rightFace}
          fill={variant === "color" ? "url(#cubeGrad)" : fill}
          opacity={variant === "color" ? 0.8 : 0.7}
        />

        {/* Cube edges */}
        {/* Outer outline */}
        <polyline points={`${TC} ${TR} ${MR} ${MC} ${ML} ${TL} ${TC}`} stroke={stroke} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
        {/* Internal vertical center */}
        <line x1="28" y1="4"  x2="28" y2="30" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
        {/* Internal bottom-left to center */}
        <line x1="4"  y1="39" x2="28" y2="30" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
        {/* Internal bottom-right to center */}
        <line x1="52" y1="39" x2="28" y2="30" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />

        {/* Stripes on top face */}
        <clipPath id="topFaceClip">
          <polygon points={topFace} />
        </clipPath>
        <g clipPath="url(#topFaceClip)">
          {stripes.map((s, i) => (
            <line
              key={i}
              x1={s.x1} y1={s.y1}
              x2={s.x2} y2={s.y2}
              stroke={variant === "dark" ? "#ffffff" : "#0a0a0a"}
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          ))}
        </g>
      </g>

      {/* ── Wordmark ── */}
      <text
        x="68"
        y="41"
        fontFamily="var(--font-geist-sans), -apple-system, 'Helvetica Neue', Arial, sans-serif"
        fontSize="30"
        fontWeight="800"
        letterSpacing="-0.8"
        fill={fill}
      >
        spothub
      </text>

      {/* Gradient defs */}
      {variant === "color" && (
        <defs>
          <linearGradient id="cubeGrad" x1="4" y1="52" x2="52" y2="4" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00ff87" />
            <stop offset="100%" stopColor="#60efff" />
          </linearGradient>
        </defs>
      )}
    </svg>
  );
}
