import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getAgentWithActiveMsisdn } from "@/lib/getAgent";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getAgentWithActiveMsisdn();

  return (
    <section>
      <Navbar
        agent={data?.agent || null}
        activeMsisdn={data?.activeMsisdn || null}
      />
      {children}
      <Footer />
    </section>
  );
}
