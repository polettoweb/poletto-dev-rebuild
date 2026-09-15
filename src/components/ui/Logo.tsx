export function Logo() {
  return (
    <svg
      viewBox="0 0 64 64"
      width="28"
      height="28"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect width="64" height="64" rx="15" fill="var(--foreground)" />
      <text
        x="32"
        y="45"
        fontFamily="Helvetica Neue, Arial, sans-serif"
        fontWeight="800"
        fontSize="38"
        fill="var(--background)"
        textAnchor="middle"
      >
        P
      </text>
    </svg>
  );
}
