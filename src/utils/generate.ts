// import { randomInt, randomlySelectFromArray } from './random';
// import { IntensityType, SupersetType, DurationType, GoalType } from './types/filter';
// import { ExerciseType } from './types/exercise';
// import { MuscleType } from './types/muscle';

import { IntensityType, SupersetType, DurationType, GoalType } from "./types/filter";
import { MuscleType } from "./types/muscle";
import { fetchExercises } from "../firebase/db";
import { ExerciseType } from "./types/exercise";

// const exercises: ExerciseType[] = [];

// export function queryExercises(targetMuscle: MuscleType) {
//     const targetExercises = exercises.filter(exercise => {
//         return exercise.musclesTargeted.some(el => {
//             return el.muscle.name === targetMuscle.name && (el.activation === "High" || el.activation === "Moderate")
//         })
//     })

//     return targetExercises;
// }

// function calculateSelection (total: number, large: number) : {large: number, small: number} {    
//     return {
//         large: randomInt(3, 4),
//         small: 1
//     }
// }

// export function generateWorkout (options: {
//     intensity: IntensityType,
//     superset: SupersetType,
//     muscles: MuscleType[],
//     duration: DurationType,
//     goal: GoalType
// }) {
//     const list: ExerciseType[] = [];

//     const largeMuscles = options.muscles.filter(muscle => muscle.size === "Large");
//     const smallMuscles = options.muscles.filter(muscle => muscle.size === "Small");

//     const totalQuantity = options.muscles.length;
//     const largeQuantity = largeMuscles.length;

//     largeMuscles.forEach(muscle => {
//         const selection = calculateSelection(totalQuantity, largeQuantity).large;
//         const targetExercises = queryExercises(muscle);
//         const product = randomlySelectFromArray(targetExercises, selection);
//         list.push(...product);
//     });
    
//     smallMuscles.forEach(muscle => {
//         const selection = calculateSelection(totalQuantity, largeQuantity).small;
//         const targetExercises = queryExercises(muscle);
//         const product = randomlySelectFromArray(targetExercises, selection);
//         list.push(...product);
//     });

//     return list;
// }

export async function generateWorkout (
    targetMuscles: MuscleType[], 
    options: {intensity: IntensityType, superset: SupersetType, duration: DurationType, goal: GoalType}
) : Promise<ExerciseType[]> {
    const largeMuscles = targetMuscles.filter(muscle => muscle.size == "Large");
    const smallMuscles = targetMuscles.filter(muscle => muscle.size == "Small");

    // const quantity = targetMuscles.length;
    // const largeQuantity = largeMuscles.length;

    const exercises: ExerciseType[] = [];

    for await (const muscle of largeMuscles) {
        const res = await fetchExercises(muscle.id);
        exercises.push(...res);
    }
    
    for await (const muscle of smallMuscles) {
        const res = await fetchExercises(muscle.id);
        exercises.push(...res);
    }

    return exercises;
}

export async function simulateWorkoutRequest () {
    console.log("Simulating request.");

    return new Promise<ExerciseType[]>(resolve => {
        setTimeout(() => {
            console.log("Request complete after 2 seconds!")
            resolve([]);
        }, 2000);
    })
}