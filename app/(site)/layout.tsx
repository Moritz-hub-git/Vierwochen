import ChatDock from "@/components/chat/ChatDock";

/**
 * Layout der Hauptseite: nur der Dialog-Funnel. Eine Kopfzeile gibt es hier
 * bewusst nicht mehr — die Startseite bringt ihre eigene Navigation mit, die
 * Unterseiten nutzen BrandNav (components/v/BrandNav). So gibt es genau eine
 * Marke und einen Skin, ohne dass zwei Kopfzeilen übereinanderliegen.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ChatDock />
    </>
  );
}
