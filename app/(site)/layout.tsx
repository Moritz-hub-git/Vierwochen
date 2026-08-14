import Header from "@/components/Header";
import ChatDock from "@/components/chat/ChatDock";

/**
 * Layout der Hauptseite: Kopfzeile + Dialog-Dock. Die Design-Varianten unter
 * /v haben eigene Kopfzeilen und bekommen den Dialog über ihr eigenes Layout —
 * deshalb liegt beides hier und nicht mehr im Root-Layout.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <ChatDock />
    </>
  );
}
