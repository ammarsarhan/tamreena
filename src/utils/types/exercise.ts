import { MuscleType } from "./muscle";

export type ActivationType = "Low" | "Moderate" | "High";

export interface ExerciseMuscleType {
    muscle: MuscleType,
    activation: ActivationType
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
