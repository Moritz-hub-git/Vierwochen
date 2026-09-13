import "./concepts.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Eliminated from "@/components/concepts/Eliminated";
import Tailored from "@/components/concepts/Tailored";
import BusinessCase from "@/components/concepts/BusinessCase";
import People from "@/components/concepts/People";
import LiveConcept from "@/components/concepts/LiveConcept";
import ChatDock from "@/components/chat/ChatDock";

const concepts = {
  "arbeit-verschwindet": {
    title: "Die Arbeit verschwindet. Das Ergebnis bleibt.",
    component: Eliminated,
  },
  massarbeit: { title: "Für Ihren Prozess gebaut.", component: Tailored },
  "business-case": {
    title: "Was bindet Ihre Prozessarbeit?",
    component: BusinessCase,
  },
  menschen: {
    title: "Ihre besten Leute sind keine Schnittstelle.",
    component: People,
  },
  loesungsentwurf: {
    title: "Ihr Prozess. Ihre Anwendung.",
    component: LiveConcept,
  },
};
export function generateStaticParams() {
  return Object.keys(concepts).map((concept) => ({ concept }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ concept: string }>;
}): Promise<Metadata> {
  const { concept } = await params;
  const entry = concepts[concept as keyof typeof concepts];
  return {
    title: entry?.title ?? "OpsDone",
    description:
      "Geben Sie uns Ihren Prozess. Wir entwickeln und betreiben die individuelle Anwendung, die Ihre wiederkehrende Arbeit übernimmt.",
    robots: { index: false, follow: false },
  };
}
export default async function ConceptPage({
  params,
}: {
  params: Promise<{ concept: string }>;
}) {
  const { concept } = await params;
  const entry = concepts[concept as keyof typeof concepts];
  if (!entry) notFound();
  const Component = entry.component;
  return (
    <div className="concept-experience" data-concept={concept}>
      <Component />
      {concept !== "loesungsentwurf" && <ChatDock />}
    </div>
  );
}
