import type { Metadata } from "next";
import Landing from "../fixfertig/Landing";

export const metadata: Metadata = {
  title: "neoapp.studio — Die Gleichung",
};

export default function Page() {
  return <Landing variant="formel" />;
}
