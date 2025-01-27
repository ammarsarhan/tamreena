import { useCallback, useEffect, useState } from "react";
import { useFilterContext } from "../context/useFilterContext";
import { generateWorkout } from "../utils/generate";
import { ExerciseType } from "../utils/types/exercise";

export function GridCard({ data }: { data: ExerciseType }) {
    return (
        <div className="flex-center border-b-[1px] border-r-[1px] bg-white">
            {data.name}
        </div>
    );
}

export default function Grid() {
    const context = useFilterContext();
    const options = context.data;

    const [current, setCurrent] = useState<ExerciseType[]>([]);
    const [previous, setPrevious] = useState<ExerciseType[]>([]);

    const handleGenerate = useCallback(() => {
        const workout = generateWorkout(options);

        setCurrent((temp) => {
            if (temp.length > 0) {
                setPrevious(temp);
            }

            return workout;
        });

    }, [options]);

    useEffect(() => {
        const match = JSON.stringify(previous) == JSON.stringify(current);
        
        if (match) {
            handleGenerate();
        }
    }, [previous, current, handleGenerate])

    useEffect(() => {
        if (!options.isOverlayOpen) {
            handleGenerate();
        }
    }, [handleGenerate, options]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === " " || e.code === "Space") {
                handleGenerate();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleGenerate, options]);

    return (
        <div className="bg-gray-50 grid grid-cols-1 h-full md:grid-cols-2">
            {
                current.map((el, index) => (
                    <GridCard data={el} key={index} />
                ))
            }
        </div>
    );
}