import { getAgentWithActiveMsisdn } from "@/lib/getAgent";
import NavbarUserContent from "./NavbarUserContent";

export default async function NavbarUserContentWrapper() {
  const data = await getAgentWithActiveMsisdn();

  return (
    <NavbarUserContent
      agent={data?.agent || null}
      activeMsisdn={data?.activeMsisdn || null}
    />
  );
}
