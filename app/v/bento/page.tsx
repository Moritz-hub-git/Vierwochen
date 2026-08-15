import type { Metadata } from "next";
import Landing from "../fixfertig/Landing";

export const metadata: Metadata = {
  title: "neoapp.studio — Das Featureboard",
};

export default function Page() {
  return <Landing variant="bento" />;
}
