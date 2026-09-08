import type { Metadata } from "next";
import BrandNav, { Wordmark } from "@/components/v/BrandNav";
import Skin from "@/components/v/Skin";
import { SITE } from "@/lib/config";
import AccessForm from "./AccessForm";
import s from "@/components/v/brandnav.module.css";

export const metadata: Metadata = { title: "Zugang" };

/** Zugangsseite für die passwortgeschützte Vorschau (PROMPT.md §8, SITE_PASSWORD). */
export default function Zugang() {
  return (
    <div className={s.page}>
      <Skin name="fixfertig" />
      <BrandNav />
      <div className={s.center}>
        <div className="card access-card">
          <h1>
            <Wordmark />
          </h1>
          <p>Diese Vorschau ist passwortgeschützt.</p>
          <AccessForm />
        </div>
      </div>
    </div>
  );
}
