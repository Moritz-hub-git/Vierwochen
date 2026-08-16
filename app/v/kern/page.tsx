import type { Metadata } from "next";
import Landing from "../fixfertig/Landing";

export const metadata: Metadata = {
  title: "neoapp.studio — Ein Team",
};

export default function Page() {
  return <Landing variant="kern" />;
}
