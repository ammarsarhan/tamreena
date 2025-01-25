import { createContext, useContext, ReactNode, useReducer, useState, FormEvent } from "react";
import { IntensityType, SupersetType, QuantityType, MusculesType, DurationType, GoalType, musclesList } from "../utils/types/filter";
import { Minus, Plus } from "lucide-react";
import { FilterOverlay } from "../components/Filter";
import { buttonStyle } from "../components/Button";
import Select from "../components/Select";

type ActiveOverlayType = "quantity" | "muscles" | "duration" | "goal";
type FilterContextType = {
    data: {
        intensity: IntensityType,
        superset: SupersetType,
        quantity: QuantityType,
        muscles: MusculesType[],
        duration: DurationType,
        goal: GoalType
    },
    actions: {
        setIntensity: (value: IntensityType) => void
        setSuperset: (value: SupersetType) => void
        setQuantity: (value: QuantityType) => void
        appendMuscle: (value: MusculesType) => void
        popMuscle: (value: number) => void
        setDuration: (value: DurationType) => void
        setGoal: (value: GoalType) => void
        setActiveOverlay: (overlay: ActiveOverlayType | null) => void
    }
}

export const useFilterOptions = () => {
    const [intensity, setIntensity] = useState<IntensityType>("Medium");
    const [superset, setSuperset] = useState<SupersetType>(false);
    const [quantity, setQuantity] = useState<QuantityType>(5);
    const [muscles, setMuscles] = useState<MusculesType[]>(["Chest", "Biceps"]);
    const [duration, setDuration] = useState<DurationType>("Moderate");
    const [goal, setGoal] = useState<GoalType>("Hypertrophy");

    return {
        intensity, superset, quantity, muscles, duration, goal,
        setIntensity, setSuperset, setQuantity, setMuscles, setDuration, setGoal
    }
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function useFilterContext() {
    const context = useContext(FilterContext);

    if (!context) {
        throw new Error("useFilterContext must be used within an AuthContextProvider");
    }

    return context;
}

const QuantityOverlay = () => {
    const context = useFilterContext();

    const disableIncrement = context.data.quantity > 9;
    const disableDecrement = context.data.quantity < 6;

    const options = {
        label: "Set number of exercises",
        description: "Choose the total number of exercises you want included in a workout session.",
    };

    const handleIncrement = () => {
        if (!disableIncrement) {
            context.actions.setQuantity(context.data.quantity + 1 as QuantityType)
        }
    }

    const handleDecrement = () => {
        if (!disableDecrement) {
            context.actions.setQuantity(context.data.quantity - 1 as QuantityType)
        }
    }

    return (
        <FilterOverlay options={options}>
            <div className="mt-4 flex gap-x-2">
                <button 
                    className={buttonStyle.primary}
                    onClick={handleDecrement}
                >-</button>
                <input
                    type="number"
                    className="p-2 border-[1px] text-center text-sm rounded-md"
                    placeholder="From 5 to 10"
                    value={context.data.quantity}
                    readOnly
                />
                <button 
                    className={buttonStyle.primary}
                    onClick={handleIncrement}
                >+</button>
            </div>
        </FilterOverlay>
    );
};

const MusclesOverlay = () => {
    const context = useFilterContext();

    const availableQuantity = 5 - context.data.muscles.length;

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

    return (
        <FilterOverlay options={options}>
            <div className="w-full mt-4">
                <span className="block text-sm text-left mb-3">Selected muscles</span>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-[1px] p-4 rounded-md w-full max-w-96 max-h-60 overflow-y-scroll">
                    {
                        context.data.muscles.map((name, index) => {
                            return (
                                <MusclesOverlayItem 
                                    label={name} 
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
                        musclesList.map((name, index) => {
                            if (context.data.muscles.includes(name)) {
                                return (
                                    <MusclesOverlayItem 
                                        label={name} 
                                        key={index}
                                        type="disabled"
                                    />
                                )
                            }

                            return (
                                <MusclesOverlayItem 
                                    label={name} 
                                    key={index}
                                    type="append"
                                    onClick={() => context.actions.appendMuscle(name)}
                                />
                            )
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
                    <option value="Short">Short {"(< 1hr)"}</option>
                    <option value="Moderate">Moderate {"(< 1hr 30mins)"}</option>
                    <option value="Long">Long {"(< 2hrs)"}</option>
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

export function FilterContextProvider({ children } : { children: ReactNode }) {
    const {
        intensity, superset, quantity, muscles, duration, goal,
        setIntensity, setSuperset, setQuantity, setMuscles, setDuration, setGoal
    } = useFilterOptions();

    const [overlay, updateOverlay] = useReducer((_overlay: ReactNode, action: ActiveOverlayType | null) => {
        switch (action) {
            case "quantity":
                return <QuantityOverlay/>
            case "muscles":
                return <MusclesOverlay/>
            case "duration":
                return <DurationOverlay/>
            case "goal":
                return <GoalOverlay/>
            default:
                return null
        }
    }, null)

    const addMuscle = (muscle: MusculesType) => {
        if (muscles.length >= 5 || muscles.includes(muscle)) {
            return;
        }

        const temp = [...muscles];
        temp.push(muscle);
        setMuscles([...temp]);
    }

    const removeMuscle = (index: number) => {
        if (index > muscles.length - 1 || muscles.length == 1) {
            return;
        }

        const temp = [...muscles];
        temp.splice(index, 1);
        setMuscles([...temp]);
    }

    return (
        <FilterContext.Provider value={{
            data: {
                intensity: intensity,
                superset: superset,
                quantity: quantity,
                muscles: muscles,
                duration: duration,
                goal: goal
            },
            actions: {
                setIntensity: (value: IntensityType) => setIntensity(value),
                setSuperset: (value: SupersetType) => setSuperset(value),
                setQuantity: (value: QuantityType) => setQuantity(value),
                appendMuscle: (value: MusculesType) => addMuscle(value),
                popMuscle: (value: number) => removeMuscle(value),
                setDuration: (value: DurationType) => setDuration(value),
                setGoal: (value: GoalType) => setGoal(value),
                setActiveOverlay: (value: ActiveOverlayType | null) => updateOverlay(value)
            }
        }}>
            {overlay}
            {children}
        </FilterContext.Provider>
    );
}
