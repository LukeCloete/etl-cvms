import NavbarWrapper from "@/components/NavbarWrapper";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NavbarWrapper />
      <body>{children}</body>
    </html>
  );
}
