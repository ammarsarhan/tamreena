import { FormEvent, ReactNode } from "react"
import { BicepsFlexed, Timer, Goal, Bookmark, X } from "lucide-react"
import { useFilterContext } from "../context/useFilterContext"
import { IntensityType } from "../utils/types/filter"
import { buttonStyle } from "./Button"

import Select from "./Select"

export function FilterButton ({
    children,
    label,
    disabled = false,
    onClick,
}: {
    children: ReactNode
    label: string
    disabled?: boolean
    onClick?: () => void
}) {
    return (
        <div className="relative flex-center group">
            <button
                className="text-gray-700 hover:bg-gray-100 transition-all p-2 rounded-md"
                onClick={onClick}
                disabled={disabled}
            >
                {children}
            </button>
            <div className="z-50 absolute -bottom-11 bg-black text-white text-xs p-2 text-nowrap rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <span>{label}</span>
            </div>
            <div className="z-50 absolute -bottom-3 border-l-8 border-r-8 border-b-8 border-transparent border-b-black opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
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
    const isLoading = context.loading;

    return (
        <div className="sm:border-t-0 sm:static flex items-center justify-between px-6 py-3 border-b-[1px]">
            <span className="lg:block hidden text-sm text-gray-500">Press the spacebar to generate a new set of exercises.</span>
            <div className="flex flex-wrap items-center justify-between md:justify-end gap-x-2 gap-y-4 w-full">
                <div className="hidden md:flex items-center gap-x-6 px-6 border-l-[1px] text-sm">
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
                <div className="flex items-center gap-x-4 md:pl-6 md:border-l-[1px]">
                    <FilterButton label="Save workout">
                        <Bookmark className="w-5 h-5"/>
                    </FilterButton>
                    <FilterButton 
                        label="Select muscules"
                        onClick={() => context.actions.setActiveOverlay("muscles")}
                        disabled={isLoading}
                    >
                        <BicepsFlexed className={`w-5 h-5 ${isLoading && "text-gray-400"}`}/>
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
                <button className={buttonStyle.color + "block md:hidden !text-sm"}>Generate!</button>
            </div>
        </div>
    )
}