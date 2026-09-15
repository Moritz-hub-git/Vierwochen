import Header from "@/components/site/Header";
import ChatDock from "@/components/chat/ChatDock";
import Footer from "@/components/site/Footer";
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <ChatDock />
    </>
  );
}
