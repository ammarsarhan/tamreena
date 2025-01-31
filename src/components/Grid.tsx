import Skeleton from "react-loading-skeleton";
import { useFilterContext } from "../context/useFilterContext";
import { ExerciseType } from "../utils/types/exercise";
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchExercisesList } from "../utils/generate";

export function GridCardSkeleton () {
    return (
        <Skeleton height={"100%"} className="p-2 !rounded-none"/>
    )
}

export function GridCard({ data }: { data: ExerciseType }) {
    return (
        <div className="flex-center border-b-[1px] border-r-[1px] bg-white">
            { data.name }
        </div>
    );
}

export default function Grid() {
    const context = useFilterContext();

    const filter = context.data;

    const [loading, setLoading] = useState(true);
    const [exercises, setExercises] = useState<ExerciseType[]>([]);
    const [current, setCurrent] = useState<ExerciseType[]>([]);

    const previous = useRef(filter);

    const getWorkout = useCallback(async () => {
        setLoading(true);

        const workout = await fetchExercisesList(filter.selectedMuscles, filter.muscles);
        setExercises(workout);

        if (current.length == 0) {
            setCurrent(workout);
        }

        setLoading(false);
    }, [current.length, filter.muscles, filter.selectedMuscles])

    useEffect(() => {
        if (!filter.isOverlayOpen) {
            const prev = previous.current;
            const match = prev.intensity !== filter.intensity || prev.superset !== filter.superset || prev.duration !== filter.duration || prev.goal !== filter.goal || JSON.stringify(prev.selectedMuscles) !== JSON.stringify(filter.selectedMuscles);

            if (match) {
                getWorkout();
            }

            previous.current = { ...filter };
        }
    }, [filter, getWorkout])

    if (context.loading || loading) {
        return (
            <div className="bg-white grid grid-cols-1 h-full md:grid-cols-2">
                {
                    Array(5).fill(<GridCardSkeleton/>)
                }
            </div>
        )
    }

    return (
        <div className="bg-gray-50 grid grid-cols-1 h-full md:grid-cols-2">
            {
                exercises.map((el, index) => {
                    return <GridCard data={el} key={index}/>
                })
            }
        </div>
    );
}