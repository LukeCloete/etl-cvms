

import Link from "next/link";
import COMPANY_LOGO from "../public/etl-logo.png";
import Image from "next/image";
import NavbarUserContent from "./NavbarUserContent";
import { Agents } from "@/lib/definitions";

// Define the links
const Links = [
  { name: "Home", href: "/home" },
  { name: "Rewards", href: "/rewards" },
  { name: "History", href: "/history" },
];

export default function Navbar({ 
  agent, 
  activeMsisdn 
}: { 
  agent: Agents | null;
  activeMsisdn: string | null;
}) {
  return (
    <nav className="fixed top-0 px-8 py-2 w-full flex items-center justify-center h-fit z-50">
      <div className="px-2 bg-white flex justify-between rounded-lg border border-blue-800/20 shadow-md shadow-blue-800/20 w-full">
        <div className="flex flex-row items-center justify-center gap-4 ">
          <div className="w-24 h-auto relative">
            <Image
              src={COMPANY_LOGO}
              width={512}
              height={512}
              alt="EcoNet Logo w-full h-auto"
            />
          </div>
          <div className="flex items-center justify-center gap-2 font-semibold text-econetBlue space-x-3">
            {Links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Dynamic Data passed as prop */}
        <NavbarUserContent agent={agent} activeMsisdn={activeMsisdn} />
      </div>
    </nav>
  );
}
