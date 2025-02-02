import { ExerciseType } from "./types/exercise";

export function randomizeRest(baseRest: number) : number {
    switch (baseRest) {
        case 1:
            return [1, 1.5][Math.floor(Math.random() * 2)]
        case 1.5:
            return randomHalf(1, 2)
        case 2:
            return randomHalf(2, 3)
        case 3:
            return randomInt(3, 4)
        default:
            return 2
    }
}

export function randomHalf(min: number, max: number) {
    const values = [min, (min + max) / 2, max];
    return values[Math.floor(Math.random() * values.length)];
}

export function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

export function randomlySelectFromArray(arr: ExerciseType[], quantity: number): ExerciseType[] {
    if (quantity > arr.length) {
        throw new Error(`Cannot select more elements than array length for exercise: ${arr[0].name}`);
    }

    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, quantity);
}