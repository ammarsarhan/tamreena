import { FormEvent, InputHTMLAttributes, ReactNode } from "react"
import { Hash, BicepsFlexed, Timer, Goal, Bookmark, X } from "lucide-react"
import { useFilterContext } from "../context/useFilterContext"
import Select from "./Select"
import { IntensityType, SupersetType } from "../utils/types/filter"

export function FilterButton ({
    children,
    label,
    onClick
}: {
    children: ReactNode
    label: string
    onClick?: () => void
}) {
    return (
        <div className="relative flex-center group">
            <button
                className="text-gray-700 hover:bg-gray-100 transition-all p-2 rounded-md"
                onClick={onClick}
            >
                {children}
            </button>
            <div className="absolute -bottom-11 bg-black text-white text-xs p-2 text-nowrap rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <span>{label}</span>
            </div>
            <div className="absolute -bottom-3 border-l-8 border-r-8 border-b-8 border-transparent border-b-black opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        </div>
    );
}

export function FilterOverlay ({children, options} : {
    children: ReactNode,
    options: {
        label: string,
        description: string
    }
}) {
    const context = useFilterContext();

    return (
        <div className="flex-center fixed top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-10">
            <div className="flex-center flex-col relative gap-y-2 text-center bg-white rounded-md p-10 mx-4">
                <button 
                    className="absolute top-5 right-5" 
                    onClick={() => context.actions.setActiveOverlay(null)}
                >
                    <X className="w-4 h-4"/>
                </button>
                <span className="font-medium">{options.label}</span>
                <p className="text-gray-600 text-sm max-w-80">{options.description}</p>
                {children}
            </div>
        </div>
    )
}

export default function Filter () {
    const context = useFilterContext();

    return (
        <div className="flex items-center justify-between px-6 py-3 border-b-[1px]">
            <span className="text-sm text-gray-500">Press the spacebar to generate a new set of exercises.</span>
            <div className="flex items-center">
                <div className="flex items-center gap-x-6 px-6 border-l-[1px] text-sm">
                    <div className="flex items-center gap-x-3">
                        <span>Intensity</span>
                        <Select 
                            value={context.data.intensity} 
                            onChange={(e: FormEvent<HTMLSelectElement>) => context.actions.setIntensity(e.currentTarget.value as IntensityType)}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Very High">Very High</option>
                        </Select>
                    </div>
                    <div className="flex items-center gap-x-3">
                        <span>Include supersets?</span>
                        <input
                            type="checkbox" 
                            name="supersets"
                            checked={context.data.superset}
                            onChange={(e: FormEvent<HTMLInputElement>) => context.actions.setSuperset(e.currentTarget.checked)}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-x-4 pl-6 border-l-[1px]">
                    <FilterButton label="Save workout">
                        <Bookmark className="w-5 h-5"/>
                    </FilterButton>
                    <FilterButton 
                        label="Number of exercises"
                        onClick={() => context.actions.setActiveOverlay("quantity")}
                    >
                        <Hash className="w-5 h-5"/>
                    </FilterButton>
                    <FilterButton 
                        label="Select muscules"
                        onClick={() => context.actions.setActiveOverlay("muscles")}
                    >
                        <BicepsFlexed className="w-5 h-5"/>
                    </FilterButton>
                    <FilterButton 
                        label="Workout duration"
                        onClick={() => context.actions.setActiveOverlay("duration")}
                    >
                        <Timer className="w-5 h-5"/>
                    </FilterButton>
                    <FilterButton 
                        label="Set goal"
                        onClick={() => context.actions.setActiveOverlay("goal")}
                    >
                        <Goal className="w-5 h-5"/>
                    </FilterButton>
                </div>
            </div>
        </div>
    )
}