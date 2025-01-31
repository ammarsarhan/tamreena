// import { randomInt, randomlySelectFromArray } from './random';
// import { IntensityType, SupersetType, DurationType, GoalType } from './types/filter';
// import { ExerciseType } from './types/exercise';
// import { MuscleType } from './types/muscle';

import { IntensityType, SupersetType, DurationType, GoalType } from "./types/filter";
import { MuscleType } from "./types/muscle";
import { fetchExercises } from "../firebase/db";
import { ExerciseType } from "./types/exercise";

// function calculateSelection (total: number, large: number) : {large: number, small: number} {    
//     return {
//         large: randomInt(3, 4),
//         small: 1
//     }
// }

export async function fetchExerciseList (targets: MuscleType[], muscles: MuscleType[]) {
    const exercises: ExerciseType[] = [];

    for await (const target of targets) {
        const data = await fetchExercises(target, muscles);
        exercises.push(...data);
    }

    return exercises;
}

export function generateWorkout (list: ExerciseType[]) {
    
}
