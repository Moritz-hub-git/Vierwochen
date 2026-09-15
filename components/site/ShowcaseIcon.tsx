type IconName =
  | "invoice"
  | "report"
  | "order"
  | "case"
  | "mail"
  | "table"
  | "check"
  | "arrow"
  | "clock"
  | "search"
  | "user"
  | "pause"
  | "play"
  | "close"
  | "folder"
  | "link"
  | "spark"
  | "mic"
  | "download"
  | "send";
const paths: Record<IconName, string> = {
  spark: "m12 3 2.6 6.4L21 12l-6.4 2.6L12 21l-2.6-6.4L3 12l6.4-2.6L12 3Z",
  mic: "M9 5a3 3 0 0 1 6 0v7a3 3 0 0 1-6 0V5Zm-3 6v1a6 6 0 0 0 12 0v-1M12 18v4m-4 0h8",
  download: "M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5",
  send: "m3 3 18 9-18 9 4-9-4-9Zm4 9h14",
  invoice: "M7 3h7l4 4v14H6V3h1m8 0v5h4M9 12h6m-6 4h6",
  report: "M4 20h16M7 16v-5m5 5V5m5 11V8",
  order: "m3 7 9-4 9 4v10l-9 4-9-4V7Zm0 0 9 4 9-4M12 11v10M7 5l10 4",
  case: "M5 4h14v13h-8l-6 4V4Zm4 5h6m-6 4h4",
  mail: "M3 5h18v14H3V5Zm0 1 9 7 9-7",
  table: "M3 4h18v16H3V4Zm0 5h18M3 14h18M9 4v16m6-16v16",
  check: "m5 12 4 4L19 6",
  arrow: "M4 12h16m-6-6 6 6-6 6",
  clock: "M12 8v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0",
  search: "m16 16 5 5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
  user: "M20 21v-2a8 8 0 0 0-16 0v2M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
  pause: "M8 5v14M16 5v14",
  play: "m8 4 12 8-12 8V4Z",
  close: "m6 6 12 12M6 18 18 6",
  folder: "M3 6h7l2 3h9v11H3V6Z",
  link: "m9 15 6-6m-8 5-2 2a3 3 0 0 0 4 4l3-3m0-10 3-3a3 3 0 0 1 4 4l-2 2",
};
export default function ShowcaseIcon({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
