import type { Metadata } from "next";
import Landing from "../fixfertig/Landing";

export const metadata: Metadata = {
  title: "neoapp.studio — Die zwei Wege",
};

export default function Page() {
  return <Landing variant="wege" />;
}
