export function BillingViz() {
  return (
    <div className="viz">
      <svg
        viewBox="0 0 400 200"
        role="img"
        aria-label="Encrypted Stripe test and live keys are switched in Super Admin, then active prices sync at runtime."
      >
        <g fill="#11110F" stroke="#45443D">
          <rect x="22" y="45" width="104" height="112" rx="3" />
          <rect x="157" y="45" width="86" height="112" rx="3" />
          <rect x="274" y="45" width="104" height="112" rx="3" />
        </g>
        <g fontFamily="var(--font-display)" textAnchor="middle">
          <text x="74" y="66" fontSize="8" fill="#EAE8E2">Super Admin</text>
          <text x="74" y="84" fontSize="7" fill="#AAA79C">Stripe account</text>
          <rect x="41" y="96" width="66" height="24" rx="3" fill="#11110F" stroke="#45443D" />
          <text x="58" y="106" fontSize="7" fill="#D4D1C6">TEST</text>
          <text x="91" y="106" fontSize="7" fill="#D4D1C6">LIVE</text>
          <text x="200" y="66" fontSize="8" fill="#EAE8E2">encrypted keys</text>
          <path d="M186 94v-7a14 14 0 0 1 28 0v7" fill="none" stroke="#ED513F" strokeWidth="1.5" />
          <rect x="181" y="94" width="38" height="30" rx="3" fill="#11110F" stroke="#45443D" />
          <circle cx="200" cy="106" r="3" fill="#F3D735" />
          <path d="M200 109v5" stroke="#F3D735" />
          <text x="326" y="66" fontSize="8" fill="#EAE8E2">runtime</text>
          <text x="326" y="102" fontSize="9" fill="#F3D735">price sync</text>
          <text x="326" y="119" fontSize="7" fill="#AAA79C">no redeploy</text>
        </g>
        <path d="M126 101h31m86 0h31" stroke="#45443D" strokeWidth="1.2" />
        <path d="m152 97 5 4-5 4m91-8 5 4-5 4" fill="none" stroke="#ED513F" strokeWidth="1.2" />
        <circle className="billing-active" cx="58" cy="113" r="2" fill="#F3D735" />
        <path d="M31 142h86" stroke="#3B3A34" />
        <text x="74" y="151" textAnchor="middle" fontFamily="var(--font-display)" fontSize="7" fill="#AAA79C">configuration fallback retained</text>
      </svg>
    </div>
  );
}
