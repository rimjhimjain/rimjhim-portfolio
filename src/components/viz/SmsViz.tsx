export function SmsViz() {
  return (
    <div className="viz">
      <svg
        viewBox="0 0 400 200"
        role="img"
        aria-label="An SMS campaign selects a sender, prepares an AI reply using conversation context, and records the conversation outcome."
      >
        <defs>
          <linearGradient id="smsFlow" x1="0" x2="1">
            <stop stopColor="#819EBB" />
            <stop offset="1" stopColor="#F3D735" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="#45443D" strokeWidth="1.2">
          <path d="M100 100H147M247 100H292" />
          <path d="M146 100l-6-4m6 4-6 4M291 100l-6-4m6 4-6 4" />
        </g>
        <g fill="#11110F" stroke="#45443D">
          <rect x="24" y="67" width="76" height="66" rx="3" />
          <rect x="147" y="57" width="100" height="86" rx="3" />
          <rect x="292" y="67" width="84" height="66" rx="3" />
        </g>
        <g fill="#EAE8E2" fontFamily="var(--font-display)" textAnchor="middle">
          <text x="62" y="91" fontSize="9">campaign</text>
          <text x="62" y="108" fontSize="8" fill="#AAA79C">sender + contacts</text>
          <text x="197" y="87" fontSize="9">AI reply</text>
          <text x="197" y="104" fontSize="8" fill="#AAA79C">context + knowledge</text>
          <text x="197" y="120" fontSize="8" fill="#AAA79C">structured response</text>
          <text x="334" y="91" fontSize="9">outcome</text>
          <text x="334" y="108" fontSize="8" fill="#AAA79C">conversation state</text>
        </g>
        <circle className="sms-pulse sms-pulse-one" cx="124" cy="100" r="4" fill="#F3D735" />
        <circle className="sms-pulse sms-pulse-two" cx="270" cy="100" r="4" fill="#F3D735" />
        <rect x="162" y="154" width="70" height="16" rx="2" fill="#11110F" stroke="#45443D" />
        <text x="197" y="165" textAnchor="middle" fontFamily="var(--font-display)" fontSize="7.5" fill="#D4D1C6">duplicate-aware</text>
      </svg>
    </div>
  );
}
