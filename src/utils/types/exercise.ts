import { MuscleType } from "./muscle";

export interface ExerciseType {
    name: string,
    musclesTargeted: {
        muscle: MuscleType,
        activation: "Low" | "Moderate" | "High"
    }[],
    exerciseType: "Isolation" | "Compound",
    priority: "Low" | "Moderate" | "High",
    baseSets: number,
    baseReps?: number,
    baseDuration?: number
}
