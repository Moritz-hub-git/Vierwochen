"use client";

import { openDialog } from "@/components/Header";

export default function CtaButton({ label }: { label: string }) {
  return (
    <button type="button" className="btn btn-primary" onClick={() => openDialog()} style={{ fontSize: "1.05rem", padding: "0.9rem 1.9rem" }}>
      {label}
    </button>
  );
}
