import { randomInt, randomlySelectFromArray } from './random';

import { MuscleType } from "./types/muscle";
import { fetchExercises } from "../firebase/db";
import { ExerciseType } from "./types/exercise";

export async function fetchExerciseList (targets: MuscleType[], muscles: MuscleType[]) {
    const exercises: ExerciseType[] = [];

    for await (const target of targets) {
        const data = await fetchExercises(target, muscles);
        exercises.push(...data);
    }

    return exercises;
}

function queryExercises (muscle: MuscleType, exercises: ExerciseType[]) : ExerciseType[] {
    const result: ExerciseType[] = [];

    exercises.map(exercise => {
        exercise.musclesTargeted.map(el => {
            if (el.muscle == muscle) {
                result.push(exercise);
            }
        })
    })

    return result;
}

function calculateSmallUpperBound (len: number, total: number) : number {
    if (len == total) {
        switch (len) {
            case 1:
                return 3;
            case 2:
                return 3;
            case 3:
                return 2;
            case 4:
                return randomInt(1, 2);
            case 5:
                return randomInt(1, 2);
        }
    }

    if (len >= total / 2) {
        switch (len) {
            case 1:
                return 2;
            case 2:
                if (len == total - len) return 1;
                return randomInt(1, 2);
            case 3:
                if (total - len == 1) return randomInt(1, 2);
                if (total - len == 2) return 1;
                break;
            case 4:
                return randomInt(1, 2);
        }
    }

    return randomInt(1, 2);
}

function calculateLargeUpperBound (len: number, total: number) : number {
    if (len == total) {
        switch (len) {
            case 1:
                return 4;
            case 2:
                return 3;
            case 3:
                return 2;
            case 4:
                return randomInt(1, 2);
            case 5:
                return randomInt(1, 2);
        }
    }

    if (len >= total / 2) {
        switch (len) {
            case 1:
                return 4;
            case 2:
                return 2;
            case 3:
                return randomInt(1, 2);
            case 4:
                return 1;
        }
    }

    return randomInt(2, 3);
}

export function generateWorkout (muscles: MuscleType[], list: ExerciseType[], previousList: ExerciseType[]) : ExerciseType[] {
    let result: ExerciseType[] = [];

    const large = muscles.filter(el => el.size == "Large");
    const small = muscles.filter(el => el.size == "Small");

    large.forEach(targetMuscle => {
        const upperBound = calculateLargeUpperBound(large.length, muscles.length);
        const targetExercises = queryExercises(targetMuscle, list);

        const exercises = randomlySelectFromArray(targetExercises, upperBound);
        result.push(...exercises);
    })

    small.forEach(targetMuscle => {
        const upperBound = calculateSmallUpperBound(small.length, muscles.length);
        const targetExercises = queryExercises(targetMuscle, list);

        const exercises = randomlySelectFromArray(targetExercises, upperBound);
        result.push(...exercises);
    })

    if (JSON.stringify(result) == JSON.stringify(previousList)) {
        generateWorkout(muscles, list, previousList);
    }

    result = result.filter((exercise, index, self) =>
        index === self.findIndex((e) => e.name === exercise.name)
    );

    return result;
}
