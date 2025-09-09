import Link from "next/link";
import COMPANY_LOGO from "../public/etl-logo.png";
import Image from "next/image";
import { Bell, User } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "./ui/select";

const Links = [
  { name: "Home", href: "/home" },
  { name: "Rewards", href: "/rewards" },
  { name: "History", href: "/history" },
];

function Navbar() {
  return (
    <nav className="fixed p-4 bg-white flex justify-between top-0 rounded-lg border border-econetBlue/20 shadow-lg shadow-econetBlue/20 w-[92vw]">
      <div className="flex flex-row items-center justify-center gap-4">
        <div className="w-24 h-auto relative">
          <Image
            src={COMPANY_LOGO}
            width={512}
            height={512}
            alt="EcoNet Logo w-full h-auto"
          />
        </div>
        <div className="flex items-center justify-center gap-2 font-semibold text-econetBlue">
          {Links.map((link, index) => (
            <Link key={index} href={link.href}>
              {link.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 ">
        <Bell width={24} height={24} />
        <div className="flex items-center justify-center gap-2 rounded-full p-2">
          <Select>
            <SelectTrigger className="rounded-full">
              <p className=" text-econetBlue text-sm">+266 22 123 4567</p>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Badge className="border-2 border-yellow-500 bg-yellow-500/20 text-yellow-500">
            Gold
          </Badge>
        </div>
        <User />
      </div>
    </nav>
  );
}

export default Navbar;
