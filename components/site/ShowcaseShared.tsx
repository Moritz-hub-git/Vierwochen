"use client";
import { useRef, useState, type ReactNode } from "react";
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
  const root = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(0);
  const sections =
    name === "Projekt-Cockpit"
      ? [
          { label: "Übersicht", icon: "folder", target: "cockpit" },
          { label: "Aktivitäten", icon: "clock", target: "digest" },
          { label: "Entscheidungen", icon: "check", target: "decisionHeading" },
        ]
      : name === "Kundenplattform"
        ? [
            { label: "Kundenbereich", icon: "user", target: "portal" },
            { label: "Service-Inbox", icon: "mail", target: "serviceOverview" },
          ]
        : name === "Dokumentenstudio"
          ? [
              {
                label: "Neues Dokument",
                icon: "invoice",
                target: "configurator",
              },
              { label: "Vorschau", icon: "table", target: "documentStage" },
            ]
          : [
              { label: "Modell", icon: "table", target: "assumptions" },
              {
                label: "Auswertung",
                icon: "report",
                target: "economicsResults",
              },
              { label: "Szenarien", icon: "folder", target: "scenarioHeading" },
            ];
  return (
    <div ref={root} className={s.app + " " + className}>
      <header className={s.appHeader}>
        <span className={s.logoMark}>
          <Icon name="check" />
        </span>
        <b>
          Opsrid<span>.</span>
        </b>
        <span className={s.appName}>{name}</span>
        <span className={s.demoBadge}>Interaktive Demo · Beispieldaten</span>
        <span className={s.appAvatar} title="Beispiel-Workspace">
          OP
        </span>
      </header>
      <div className={s.appShell}>
        <nav className={s.appSidebar} aria-label={name + " – Bereiche"}>
          <small>WORKSPACE</small>
          {sections.map((item, index) => (
            <button
              key={item.label}
              aria-pressed={selected === index}
              title={item.label}
              onClick={() => {
                setSelected(index);
                const target = root.current?.querySelector<HTMLElement>(
                  "." + s[item.target],
                );
                target?.scrollIntoView({
                  behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)",
                  ).matches
                    ? "instant"
                    : "smooth",
                  block: "center",
                });
              }}
            >
              <Icon name={item.icon as Parameters<typeof Icon>[0]["name"]} />
              <span>{item.label}</span>
            </button>
          ))}
          <div className={s.workspaceNote}>
            <i />
            Demo-Workspace
          </div>
        </nav>
        <div className={s.appCanvas}>
          <div className={s.workspaceToolbar}>
            <b>{name}</b>
            <span>Workspace / {sections[selected].label}</span>
          </div>
          {children}
        </div>
      </div>
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
