import { MuscleType } from "./muscle";

export interface ExerciseMuscleType {
    muscle: MuscleType,
    activation: "Low" | "Moderate" | "High"
}

export interface ExerciseType {
    name: string,
    musclesTargeted: ExerciseMuscleType[],
    exerciseType: "Isolation" | "Compound",
    priority: "Low" | "Moderate" | "High",
    baseSets: number,
    baseReps?: number,
    baseDuration?: number
}
