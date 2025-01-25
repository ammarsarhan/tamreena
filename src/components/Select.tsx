import { ChevronDown } from "lucide-react";
import { ReactNode, FormEvent } from "react";

interface SelectProps {
    children: ReactNode,
    className?: string,
    value: string,
    onChange: (e: FormEvent<HTMLSelectElement>) => void
}

export default function Select ({children, value, className, onChange}: SelectProps) {
    return (
        <div className="flex-center relative w-full">
            <ChevronDown className="w-3 h-3 absolute right-1"/>
            <select 
                name="intensity" 
                className={`border-[1px] pl-2 pr-6 py-1 rounded-md appearance-none ${className}`} 
                value={value}
                onChange={onChange}
            >
                {children}
            </select>
        </div>
    )
}