/**
 * VALOR Mark — Standalone "V" Monogram
 * Bold geometric letter "V" in Valor Gold.
 * Luxury brand aesthetic — no surrounding shape.
 */
export default function ValorMark({ size = 28, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Bold geometric V — luxury monogram style */}
      <path
        d="M18 16 L50 88 L82 16"
        stroke="#C5A44E"
        strokeWidth="12"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Subtle inner highlight for depth */}
      <path
        d="M26 22 L50 78 L74 22"
        stroke="#C5A44E"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.35"
      />
    </svg>
  );
}
