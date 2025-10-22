import { Cloud } from "lucide-react";
import { Badge } from "./ui/badge";

export default function Footer() {
    return (
        <footer className="border-t border-t-slate-200 flex justify-between items-center px-8 py-4">
           <p className=" text-xs text-slate-400 text-center py-6
           ">ⓒ 2025 CVM. All rights reserved.</p>
           <div className="flex justify-center gap-4"
           >
            <Badge className="bg-teal-700 text-teal-200 py-2 px-2 h-fit text-xs">Generally Available</Badge>
            <div className="flex gap-2 items-center justify-center"><Cloud className="text-slate-400"/><p className="text-xs text-slate-400">Version 1.0.0</p></div>
           </div>
        </footer>
    );
}