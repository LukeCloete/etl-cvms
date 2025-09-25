import Navbar from "@/components/Navbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <html lang="en" suppressHydrationWarning>
      <body className="pt-16">
        <Navbar />
        {children}
      </body>

    </html>
  );
}
