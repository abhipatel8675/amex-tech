import LocalLandingPage, { localPageMetadata } from "@/components/local/LocalLandingPage";
import { getLocalPage } from "@/data/localPages";

const page = getLocalPage("google-business-profile-setup");

export const metadata = localPageMetadata(page);

export default function Page() {
  return <LocalLandingPage page={page} />;
}
