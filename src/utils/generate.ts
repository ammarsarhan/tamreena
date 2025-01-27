import { randomInt, randomlySelectFromArray } from './random';
import { exercises, ExerciseType } from './types/exercise';
import { IntensityType, SupersetType, MuscleType, DurationType, GoalType } from './types/filter';

export function queryExercises(targetMuscle: MuscleType) {
    const targetExercises = exercises.filter(exercise => {
        return exercise.musclesTargeted.some(el => {
            return el.muscle.name === targetMuscle.name && (el.activation === "High" || el.activation === "Moderate")
        })
    })

    return targetExercises;
}

function calculateSelection (total: number, large: number) : {large: number, small: number} {
    if (total <= 2) {
        if (large != 0) {
            return {
                large: randomInt(3, 4),
                small: randomInt(1, 2)
            }
        }
        
        return {
            large: 0,
            small: 3
        }
    }

    if (large > 1) {
        return {
            large: randomInt(1, 2),
            small: randomInt(1, 2)
        }
    }
    
    return {
        large: 2,
        small: 1
    }
}

export function generateWorkout (options: {
    intensity: IntensityType,
    superset: SupersetType,
    muscles: MuscleType[],
    duration: DurationType,
    goal: GoalType
}) {
    const list: ExerciseType[] = [];

    const largeMuscles = options.muscles.filter(muscle => muscle.size === "Large");
    const smallMuscles = options.muscles.filter(muscle => muscle.size === "Small");

    const totalQuantity = options.muscles.length;
    const largeQuantity = largeMuscles.length;

    largeMuscles.forEach(muscle => {
        const selection = calculateSelection(totalQuantity, largeQuantity).large;
        const targetExercises = queryExercises(muscle);
        const product = randomlySelectFromArray(targetExercises, selection);
        list.push(...product);
    });
    
    smallMuscles.forEach(muscle => {
        const selection = calculateSelection(totalQuantity, largeQuantity).small;
        const targetExercises = queryExercises(muscle);
        const product = randomlySelectFromArray(targetExercises, selection);
        list.push(...product);
    });

    return list;
}
