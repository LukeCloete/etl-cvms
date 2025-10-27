import Image from "next/image";
import { Loader2 } from "lucide-react";
import LOGO from "@/public/etl-logo.png";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <div className="flex flex-col items-center space-y-6">
        <Image src={LOGO} alt="Econet Logo" width={240} height={120} priority />
        <Loader2 className="h-10 w-10 animate-spin text-econetBlue" />
      </div>
    </div>
  );
}
