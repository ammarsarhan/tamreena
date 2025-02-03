import { createContext, useContext, ReactNode, useReducer, useState, FormEvent, useEffect } from "react";
import { FilterOverlay } from "../components/Filter";
import { Minus, Plus } from "lucide-react";
import { IntensityType, SupersetType, DurationType, GoalType } from "../utils/types/filter";
import { MuscleType } from "../utils/types/muscle";

import Select from "../components/Select";
import { fetchMuscles } from "../firebase/db";

type ActiveOverlayType = | "muscles" | "duration" | "goal";
type FilterContextType = {
    loading: boolean,
    data: {
        intensity: IntensityType,
        superset: SupersetType,
        muscles: MuscleType[],
        selectedMuscles: MuscleType[],
        duration: DurationType,
        goal: GoalType,
        isOverlayOpen: boolean
    },
    actions: {
        setIntensity: (value: IntensityType) => void
        setSuperset: (value: SupersetType) => void
        appendMuscle: (value: MuscleType) => void
        popMuscle: (value: number) => void
        setDuration: (value: DurationType) => void
        setGoal: (value: GoalType) => void
        setActiveOverlay: (overlay: ActiveOverlayType | null) => void
    }
}

export const useFilterOptions = () => {
    const [intensity, setIntensity] = useState<IntensityType>("Medium");
    const [superset, setSuperset] = useState<SupersetType>(false);
    const [duration, setDuration] = useState<DurationType>("Moderate");
    const [goal, setGoal] = useState<GoalType>("Hypertrophy");
    const [muscles, setMuscles] = useState<MuscleType[]>([]);
    const [selectedMuscles, setSelectedMuscles] = useState<MuscleType[]>([]);

    return {
        intensity, superset, muscles, selectedMuscles, duration, goal,
        setIntensity, setSuperset, setMuscles, setSelectedMuscles, setDuration, setGoal
    }
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function useFilterContext() {
    const context = useContext(FilterContext);

    if (!context) {
        throw new Error("useFilterContext must be used within an FilterContextProvider");
    }

    return context;
}

const MusclesOverlay = () => {
    const context = useFilterContext();
    const availableQuantity = 5 - context.data.selectedMuscles.length;

    const options = {
        label: "Select muscles",
        description: "Choose 1-5 muscles you want to primarily target throughout your workout.",
    };

    const MusclesOverlayItem = ({label, type, onClick} : {label: string, type: "append" | "pop" | "disabled", onClick?: () => void}) => {
        if (type == "disabled") {
            return (
                <div className="text-sm border-[1px] px-4 py-2 rounded-md bg-gray-100">
                    {label}
                </div>
            )
        }

        return (
            <div className="relative group">
                <div className="absolute -top-1 -right-1 rounded-full p-[0.125rem] bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {
                        type === "append" ?
                        <Plus className="w-3 h-3"/> :
                        <Minus className="w-3 h-3"/>
                    }
                </div>
                <button className="text-sm border-[1px] px-4 py-2 rounded-md cursor-pointer" onClick={onClick}>
                    {label}
                </button>
            </div>
        )
    }

    const selected = new Set(context.data.selectedMuscles.map(el => el.name));

    return (
        <FilterOverlay options={options}>
            <div className="w-full mt-4">
                <span className="block text-sm text-left mb-3">Selected muscles</span>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-[1px] p-4 rounded-md w-full max-w-96 max-h-60 overflow-y-scroll">
                    {
                        context.data.selectedMuscles.map((el, index) => {
                            return (
                                <MusclesOverlayItem 
                                    label={el.name} 
                                    key={index}
                                    type="pop"
                                    onClick={() => context.actions.popMuscle(index)}
                                />
                            )
                        })
                    }
                </div>
            </div>
            <div className="w-full mt-4">
                <span className="block text-sm text-left mb-3">Available muscles ({availableQuantity})</span>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-[1px] p-4 rounded-md w-full max-w-96 max-h-60 overflow-y-scroll">
                    {
                        context.data.muscles.map((el, index) => {
                            const match = selected.has(el.name);

                            return (
                                <MusclesOverlayItem
                                    label={el.name}
                                    key={index}
                                    type={match ? "disabled" : "append"}
                                    onClick={match ? undefined : () => context.actions.appendMuscle(el)}
                                />
                            );
                        })
                    }
                </div>
            </div>
        </FilterOverlay>
    );
};

const DurationOverlay = () => {
    const context = useFilterContext();

    const options = {
        label: "Set duration",
        description: "Choose the desired duration of your workout session.",
    };

    return (
        <FilterOverlay options={options}>
            <div className="mt-4 flex gap-x-2 w-full">
                <Select 
                    value={context.data.duration} 
                    onChange={(e: FormEvent<HTMLSelectElement>) => context.actions.setDuration(e.currentTarget.value as DurationType)}
                    className="w-full"
                >
                    <option value="Short">Short {"(< 45mins)"}</option>
                    <option value="Moderate">Moderate {"(< 1hr)"}</option>
                    <option value="Long">Long {"(< 1hr 30mins)"}</option>
                </Select>
            </div>
        </FilterOverlay>
    );
};

const GoalOverlay = () => {
    const context = useFilterContext();

    const options = {
        label: "Set goal",
        description: "Choose the desired goal of your workout session.",
    };

    return (
        <FilterOverlay options={options}>
            <div className="mt-4 flex gap-x-2 w-full">
                <Select 
                    value={context.data.goal} 
                    onChange={(e: FormEvent<HTMLSelectElement>) => context.actions.setGoal(e.currentTarget.value as GoalType)}
                    className="w-full text-center"
                >
                    <option value="Hypertrophy">Hypertrophy</option>
                    <option value="Endurance">Endurance</option>
                    <option value="Strength">Strength</option>
                    <option value="Fat Loss">Fat Loss</option>
                </Select>
            </div>
        </FilterOverlay>
    );
};

export function FilterContextProvider({ children }: { children: ReactNode }) {
    const {
        intensity, superset, muscles, selectedMuscles, duration, goal,
        setIntensity, setSuperset, setMuscles, setSelectedMuscles, setDuration, setGoal
    } = useFilterOptions();

    const [overlay, updateOverlay] = useReducer(
        (_overlay: ReactNode, action: ActiveOverlayType | null) => {
            switch (action) {
                case "muscles":
                    return <MusclesOverlay />;
                case "duration":
                    return <DurationOverlay />;
                case "goal":
                    return <GoalOverlay />;
                default:
                    return null;
            }
        },
        null
    );

    const [isLoading, setIsLoading] = useState(true);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    useEffect(() => {
        const getMuscles = async () => {
            const data = await fetchMuscles();

            setMuscles(data);
            setSelectedMuscles([data[3], data[7]]);
            
            setIsLoading(false);
        }

        getMuscles();
    }, [setMuscles, setSelectedMuscles]);
    
    const addMuscle = (muscle: MuscleType) => {
        if (selectedMuscles.length >= 5 || selectedMuscles.includes(muscle)) {
            return;
        }
        
        const temp = [...selectedMuscles];
        temp.push(muscle);
        setSelectedMuscles([...temp]);
    };
    
    const removeMuscle = (index: number) => {
        if (index > selectedMuscles.length - 1 || selectedMuscles.length === 1) {
            return;
        }

        const temp = [...selectedMuscles];
        temp.splice(index, 1);
        setSelectedMuscles([...temp]);
    };

    const setActiveOverlay = (overlay: ActiveOverlayType | null) => {
        updateOverlay(overlay);
        setIsOverlayOpen(overlay !== null);
    };

    return (
        <FilterContext.Provider
            value={{
                loading: isLoading,
                data: {
                    intensity: intensity,
                    superset: superset,
                    muscles: muscles,
                    selectedMuscles: selectedMuscles,
                    duration: duration,
                    goal: goal,
                    isOverlayOpen: isOverlayOpen
                },
                actions: {
                    setIntensity: (value: IntensityType) => setIntensity(value),
                    setSuperset: (value: SupersetType) => setSuperset(value),
                    appendMuscle: (value: MuscleType) => addMuscle(value),
                    popMuscle: (value: number) => removeMuscle(value),
                    setDuration: (value: DurationType) => setDuration(value),
                    setGoal: (value: GoalType) => setGoal(value),
                    setActiveOverlay: setActiveOverlay
                }
            }}
        >
            {overlay}
            {children}
        </FilterContext.Provider>
    )
}
