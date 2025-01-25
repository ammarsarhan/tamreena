import { ChevronDown } from "lucide-react";
import { ReactNode, FormEvent } from "react";
import { IntensityType } from "../utils/types/filter";

interface SelectProps {
    children: ReactNode,
    value: IntensityType,
    onChange: (e: FormEvent<HTMLSelectElement>) => void
}

export default function Select ({children, value, onChange}: SelectProps) {
    return (
        <div className="flex-center relative">
            <ChevronDown className="w-3 h-3 absolute right-1"/>
            <select 
                name="intensity" 
                className="border-[1px] pl-2 pr-6 py-1 rounded-md appearance-none" 
                value={value}
                onChange={onChange}
            >
                {children}
            </select>
        </div>
    )
}