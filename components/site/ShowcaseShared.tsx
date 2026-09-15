"use client";
import type { ReactNode } from "react";
import Icon from "./ShowcaseIcon";
import s from "./Showcase.module.css";

export function AppFrame({
  name,
  children,
  className = "",
}: {
  name: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={s.app + " " + className}>
      <header className={s.appHeader}>
        <span className={s.logoMark}>
          <Icon name="check" />
        </span>
        <b>
          Opsrid<span>.</span>
        </b>
        <span className={s.appName}>{name}</span>
        <span className={s.demoBadge}>Interaktive Demo · Beispieldaten</span>
      </header>
      {children}
    </div>
  );
}
export function DoneBar({
  done,
  decisions,
}: {
  done: string;
  decisions: number;
}) {
  return (
    <div className={s.doneBar}>
      <div>
        <span className={s.spark}>
          <Icon name="spark" />
        </span>
        <span>
          <small>VON OPSRID ERLEDIGT</small>
          <b>{done}</b>
        </span>
      </div>
      <div className={s.remaining}>
        <Icon name="user" />
        <span>Sie werden noch gebraucht für:</span>
        <b>{decisions}</b>
      </div>
    </div>
  );
}
export function downloadExample(filename: string, html: string) {
  const url = URL.createObjectURL(
    new Blob([html], { type: "text/html;charset=utf-8" }),
  );
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
}
