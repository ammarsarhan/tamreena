import { exercises, ExerciseType } from './types/exercise';
import { IntensityType, SupersetType, MuscleType, DurationType, GoalType } from './types/filter';

export function queryExercises(targetMuscle: MuscleType) {
    const targetExercises = exercises.filter(exercise => {
        return exercise.musclesTargeted.some(el => {
            return el.muscle.name === targetMuscle.name && el.activation === "High"
        })
    })

    return targetExercises;
}

export function randomlySelectFromArray(arr: ExerciseType[], quantity: number): ExerciseType[] {
    if (quantity > arr.length) {
        throw new Error("Cannot select more elements than array length.");
    }

    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, quantity);
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

    const durationFactor = {
        short: 6,
        moderate: 10,
        long: 14
    };

    const totalExercises = durationFactor.long;
    const largeMuscleExercises = Math.round((totalExercises * 2) / 3);
    const smallMuscleExercises = totalExercises - largeMuscleExercises;

    largeMuscles.forEach(muscle => {
        const targetExercises = queryExercises(muscle);
        const quantity = Math.min(largeMuscleExercises / largeMuscles.length, targetExercises.length);
        list.push(...randomlySelectFromArray(targetExercises, Math.floor(quantity)));
    });

    smallMuscles.forEach(muscle => {
        const targetExercises = queryExercises(muscle);
        const quantity = Math.min(smallMuscleExercises / smallMuscles.length, targetExercises.length);
        list.push(...randomlySelectFromArray(targetExercises, Math.floor(quantity)));
    });

    console.log("Generated new list!");
    return list;
}
