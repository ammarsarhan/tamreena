import { ReactNode } from "react"
import { Hash, BicepsFlexed, Timer, Goal } from "lucide-react"
import Select from "./Select"

export function FilterButton ({children, label} : {
    children: ReactNode,
    label: string
}) {
    return (
        <div className="relative flex-center group">
            <button className="text-gray-700 hover:bg-gray-100 transition-all p-2 rounded-md">
                {children}
            </button>
            <div className="absolute -bottom-11 bg-black text-white text-xs p-2 text-nowrap rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <span>{label}</span>
            </div>
            <div className="absolute -bottom-3 border-l-8 border-r-8 border-b-8 border-transparent border-b-black opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        </div>
    )
}

export default function Filter () {
    return (
        <div className="flex items-center justify-between px-6 py-3 border-b-[1px]">
            <span className="text-sm text-gray-500">Press the spacebar to generate a new set of exercises.</span>
            <div className="flex items-center">
                <div className="flex items-center gap-x-6 px-6 border-l-[1px] text-sm">
                    <div className="flex items-center gap-x-3">
                        <span>Intensity</span>
                        <Select>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="low">Very High</option>
                        </Select>
                    </div>
                    <div className="flex items-center gap-x-3">
                        <span>Include supersets?</span>
                        <input type="checkbox" name="supersets"/>
                    </div>
                </div>
                <div className="flex items-center gap-x-4 pl-6 border-l-[1px]">
                    <FilterButton label="Number of exercises">
                        <Hash className="w-5 h-5"/>
                    </FilterButton>
                    <FilterButton label="Select muscules">
                        <BicepsFlexed className="w-5 h-5"/>
                    </FilterButton>
                    <FilterButton label="Workout duration">
                        <Timer className="w-5 h-5"/>
                    </FilterButton>
                    <FilterButton label="Set goals">
                        <Goal className="w-5 h-5"/>
                    </FilterButton>
                </div>
            </div>
        </div>
    )
}