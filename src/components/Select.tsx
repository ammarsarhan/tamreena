import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";

export default function Select ({children}: {children: ReactNode}) {
    return (
        <div className="flex-center relative">
            <ChevronDown className="w-3 h-3 absolute right-1"/>
            <select name="intensity" className="border-[1px] pl-2 pr-6 py-1 rounded-md appearance-none">
                {children}
            </select>
        </div>
    )
}