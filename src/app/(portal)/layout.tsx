import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <div className="flex flex-col items-center justify-center">
        {/* <Navbar /> */}
        <body>{children}</body>
      </div>
    </html>
  );
}
