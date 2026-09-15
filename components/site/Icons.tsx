export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Check() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m5 12 4 4L19 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="29"
      height="29"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="28" height="28" rx="8" fill="currentColor" />
      <path
        d="m9 16 4.5 4.5L23 11"
        stroke="var(--mark-check, #f8f8f5)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function ProcessIcon({ kind = 0 }: { kind?: number }) {
  const paths = [
    "M7 3h7l5 5v13H5V3h2m7 0v6h5M8 13h8m-8 4h5",
    "M4 5h16v12H9l-5 4V5m4 4h8m-8 4h5",
    "m12 3 9 4v6c0 4-9 8-9 8S3 17 3 13V7l9-4m-4 9 3 3 5-6",
    "M4 20V4m0 16h17M9 16v-5m5 5V7m5 9V3",
    "M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0M4 21v-3a8 8 0 0 1 12-7m0 6 2 2 4-5",
  ];
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={paths[kind % paths.length]}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
