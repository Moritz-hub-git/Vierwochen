import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prozess-Check",
  robots: { index: false, follow: true },
};

export default function LegacyBookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
