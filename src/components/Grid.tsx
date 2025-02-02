import { useCallback, useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useFilterContext } from "../context/useFilterContext";
import { ExerciseType } from "../utils/types/exercise";
import { fetchExerciseList, generateWorkout } from "../utils/generate";
import { formatMinutes } from "../utils/time";
import { randomInt } from "../utils/random";

export function GridCardSkeleton () {
    return (
        <Skeleton height={"100%"} className="p-2 !rounded-none"/>
    )
}

export function GridCard({ data, baseRest, goal, index }: { data: ExerciseType, baseRest: number, goal: number, index: number }) {
    return (
        <div className="relative border-b-[1px] border-r-[1px] bg-white">
            <span className="absolute top-3 left-3 text-sm">{index})</span>
            <div className="absolute top-3 right-3 text-right">
                <span className="text-xs border-[1px] md:border-0 md:bg-blue-800 md:text-gray-50 px-2 py-1 rounded-md">Rest: {formatMinutes(baseRest)}</span>
            </div>
            <div className="h-full flex-center flex-col md:gap-y-1 text-center">
                {data.baseReps && <span className="md:hidden text-sm">{data.baseSets} x {data.baseReps + goal}</span>}
                {data.baseDuration && <span className="md:hidden text-sm">{data.baseSets} x {data.baseDuration}</span>}
                <h1 className="text-sm md:text-lg font-medium">{data.name}</h1>
                <div className="hidden md:flex flex-col text-sm text-gray-600">
                    <span>{data.baseSets} Sets</span>
                    {data.baseReps && <span>{data.baseReps + goal} Reps</span>}
                    {data.baseDuration && <span>{data.baseDuration} Secs</span>}
                </div>
            </div>
            <div className="absolute bottom-3 left-3 text-xs lg:text-sm">
                {
                    data.musclesTargeted.map((el, index) => {
                        const last = index == data.musclesTargeted.length - 1
                        return <span key={index}>{el.muscle.name}{!last && ", "}</span>
                    })
                }
            </div>
        </div>
    );
}

export default function Grid() {
    const context = useFilterContext();

    const filter = context.data;
    const previousFilter = useRef(filter);

    const [loading, setLoading] = useState(true);

    const [exercises, setExercises] = useState<ExerciseType[]>([]);
    const [current, setCurrent] = useState<ExerciseType[]>([]);
    const [previous, setPrevious] = useState<ExerciseType[]>([]);

    const [baseRest, setBaseRest] = useState(2);
    const [restTime, setRestTime] = useState(2);
    const [goalFactor, setGoalFactor] = useState(0);

    const getInitialWorkout = useCallback(async () => {
        setLoading(true);

        const data = await fetchExerciseList(filter.selectedMuscles, filter.muscles);
        const workout = generateWorkout(filter.selectedMuscles, data, previous);
        
        setExercises(data);

        setCurrent((temp) => {
            if (temp.length > 0) {
                setPrevious(temp);
            }
            return workout;
        });

        setLoading(false);
    }, [filter.selectedMuscles, filter.muscles, previous])

    const getWorkout = useCallback(() => {
        setLoading(true);

        const workout = generateWorkout(filter.selectedMuscles, exercises, previous);

        setCurrent((temp) => {
            if (temp.length > 0) {
                setPrevious(temp);
            }
            return workout;
        });

        setLoading(false);
    }, [exercises, filter.selectedMuscles, previous])

    useEffect(() => {
        if (!filter.isOverlayOpen) {
            const prev = previousFilter.current;
            const match = JSON.stringify(prev.selectedMuscles) !== JSON.stringify(filter.selectedMuscles);

            if (match) {
                getInitialWorkout();
            }

            previousFilter.current = { ...filter };
        }
    }, [filter, getInitialWorkout])

    useEffect(() => {
        let value = 0;

        switch (filter.intensity) {
            case "Low":
                value = 3;
                break;
            case "Medium":
                value = 2;
                break;
            case "High":
                value = 1.5;
                break;
            case "Very High":
                value = 1;
                break;
        }

        setBaseRest(value);
        setRestTime(value);
    }, [filter.intensity])

    useEffect(() => {
        if (!filter.isOverlayOpen) {
            setRestTime(() => {
                switch (filter.duration) {
                    case "Short":
                        return baseRest - 0.5;
                    case "Moderate":
                        return baseRest;
                    case "Long":
                        return baseRest + 1;
                    default:
                        return 2;
                }
            });
        }
    }, [filter.duration, filter.isOverlayOpen, baseRest]);

    useEffect(() => {
        if (!filter.isOverlayOpen) {
            setGoalFactor(() => {
                switch (filter.goal) {
                    case "Hypertrophy":
                        return 0;
                    case "Endurance":
                        return randomInt(4, 5);
                    case "Strength":
                        return randomInt(-3, -4)
                    case "Fat Loss":
                        return randomInt(4, 5);
                }
            })
        }
    }, [filter.goal, filter.isOverlayOpen])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === " " || e.code === "Space") {
                getWorkout();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [getWorkout, filter]);

    if (context.loading || loading) {
        return (
            <div className="bg-white grid grid-cols-1 h-full md:grid-cols-2">
                {
                    Array(5).fill(0).map((_, index) => (
                        <GridCardSkeleton key={index} />
                    ))
                }
            </div>
        )
    }

    return (
        <div className="bg-gray-50 grid grid-cols-1 h-full md:grid-cols-2">
            {
                current.map((el, index) => {
                    return <GridCard data={el} baseRest={restTime} goal={goalFactor} index={index + 1} key={index}/>
                })
            }
        </div>
    );
}