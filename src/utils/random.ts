import { ExerciseType } from "./types/exercise";

export function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
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