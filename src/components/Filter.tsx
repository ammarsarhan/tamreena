import { Hash, BicepsFlexed, Timer, Goal } from "lucide-react"
import { ReactNode } from "react"
import Select from "./Select"

export function FilterButton ({children}: {
    children: ReactNode
}) {
    return (
        <button className="text-gray-700 hover:bg-gray-100 transition-all p-2 rounded-md">
            {children}
        </button>
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
                    <FilterButton>
                        <Hash className="w-5 h-5"/>
                    </FilterButton>
                    <FilterButton>
                        <BicepsFlexed className="w-5 h-5"/>
                    </FilterButton>
                    <FilterButton>
                        <Timer className="w-5 h-5"/>
                    </FilterButton>
                    <FilterButton>
                        <Goal className="w-5 h-5"/>
                    </FilterButton>
                </div>
            </div>
        </div>
    )
}