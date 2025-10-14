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
    <html lang="en" suppressHydrationWarning>
      <body className="pt-16">
        <Navbar agent={data?.agent || null} activeMsisdn={data?.activeMsisdn || null} />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
