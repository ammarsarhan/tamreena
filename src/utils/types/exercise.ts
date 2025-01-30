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

// export const exercises: ExerciseType[] = [
//     {
//         name: "Flat Bench Press",
//         musclesTargeted: [
//             { muscle: { name: "Chest", size: "Large" }, activation: "High" }
//         ],
//         exerciseType: "Compound",
//         priority: "High",
//         baseSets: 4,
//         baseReps: 10
//     },
//     {
//         name: "Incline Bench Press",
//         musclesTargeted: [
//             { muscle: { name: "Chest", size: "Large" }, activation: "Moderate" }
//         ],
//         exerciseType: "Compound",
//         priority: "High",
//         baseSets: 4,
//         baseReps: 10
//     },
//     {
//         name: "Chest Dips",
//         musclesTargeted: [
//             { muscle: { name: "Chest", size: "Large" }, activation: "Moderate" }
//         ],
//         exerciseType: "Compound",
//         priority: "Moderate",
//         baseSets: 3,
//         baseReps: 10
//     },
//     {
//         name: "Chest Flys",
//         musclesTargeted: [
//             { muscle: { name: "Chest", size: "Large" }, activation: "Low" }
//         ],
//         exerciseType: "Isolation",
//         priority: "Moderate",
//         baseSets: 3,
//         baseReps: 12
//     },
//     {
//         name: "Incline Dumbbell Press",
//         musclesTargeted: [
//             { muscle: { name: "Upper Chest", size: "Large" }, activation: "High" },
//             { muscle: { name: "Chest", size: "Large" }, activation: "High" }
//         ],
//         exerciseType: "Compound",
//         priority: "High",
//         baseSets: 4,
//         baseReps: 10
//     },
//     {
//         name: "Decline Bench Press",
//         musclesTargeted: [
//             { muscle: { name: "Upper Chest", size: "Large" }, activation: "Moderate" }
//         ],
//         exerciseType: "Compound",
//         priority: "Moderate",
//         baseSets: 4,
//         baseReps: 10
//     },
//     {
//         name: "Cable Chest Flys (high to low)",
//         musclesTargeted: [
//             { muscle: { name: "Upper Chest", size: "Large" }, activation: "Moderate" }
//         ],
//         exerciseType: "Isolation",
//         priority: "Moderate",
//         baseSets: 3,
//         baseReps: 12
//     },
//     {
//         name: "Decline Push-Ups",
//         musclesTargeted: [
//             { muscle: { name: "Chest", size: "Large" }, activation: "High" },
//             { muscle: { name: "Upper Chest", size: "Large" }, activation: "Moderate" },
//         ],
//         exerciseType: "Compound",
//         priority: "Low",
//         baseSets: 3,
//         baseReps: 15
//     },
//     {
//         name: "Decline Bench Press",
//         musclesTargeted: [
//             { muscle: { name: "Lower Chest", size: "Large" }, activation: "High" }
//         ],
//         exerciseType: "Compound",
//         priority: "High",
//         baseSets: 4,
//         baseReps: 10
//     },
//     {
//         name: "Decline Dumbbell Press",
//         musclesTargeted: [
//             { muscle: { name: "Lower Chest", size: "Large" }, activation: "High" }
//         ],
//         exerciseType: "Compound",
//         priority: "Moderate",
//         baseSets: 4,
//         baseReps: 10
//     },
//     {
//         name: "Chest Dips (leaning forward)",
//         musclesTargeted: [
//             { muscle: { name: "Lower Chest", size: "Large" }, activation: "Moderate" }
//         ],
//         exerciseType: "Compound",
//         priority: "Moderate",
//         baseSets: 3,
//         baseReps: 10
//     },
//     {
//         name: "Cable Chest Flys (low to high)",
//         musclesTargeted: [
//             { muscle: { name: "Lower Chest", size: "Large" }, activation: "Moderate" }
//         ],
//         exerciseType: "Isolation",
//         priority: "Low",
//         baseSets: 3,
//         baseReps: 12
//     },
//     {
//         name: "Front Squats",
//         musclesTargeted: [
//             { muscle: { name: "Quads", size: "Large" }, activation: "High" }
//         ],
//         exerciseType: "Compound",
//         priority: "High",
//         baseSets: 4,
//         baseReps: 8
//     },
//     {
//         name: "Leg Press",
//         musclesTargeted: [
//             { muscle: { name: "Quads", size: "Large" }, activation: "High" }
//         ],
//         exerciseType: "Compound",
//         priority: "High",
//         baseSets: 4,
//         baseReps: 10
//     },
//     {
//         name: "Bulgarian Split Squats",
//         musclesTargeted: [
//             { muscle: { name: "Quads", size: "Large" }, activation: "High" }
//         ],
//         exerciseType: "Compound",
//         priority: "Moderate",
//         baseSets: 3,
//         baseReps: 10
//     },
//     {
//         name: "Leg Extensions",
//         musclesTargeted: [
//             { muscle: { name: "Quads", size: "Large" }, activation: "Moderate" }
//         ],
//         exerciseType: "Isolation",
//         priority: "Moderate",
//         baseSets: 3,
//         baseReps: 12
//     },
//     {
//         name: "Romanian Deadlifts",
//         musclesTargeted: [
//             { muscle: { name: "Hamstrings", size: "Large" }, activation: "High" }
//         ],
//         exerciseType: "Compound",
//         priority: "High",
//         baseSets: 4,
//         baseReps: 8
//     },
//     {
//         name: "Leg Curls",
//         musclesTargeted: [
//             { muscle: { name: "Hamstrings", size: "Large" }, activation: "High" }
//         ],
//         exerciseType: "Isolation",
//         priority: "High",
//         baseSets: 3,
//         baseReps: 12
//     },
//     {
//         name: "Glute Ham Raises",
//         musclesTargeted: [
//             { muscle: { name: "Hamstrings", size: "Large" }, activation: "Moderate" }
//         ],
//         exerciseType: "Compound",
//         priority: "Moderate",
//         baseSets: 3,
//         baseReps: 8
//     },
//     {
//         name: "Walking Lunges",
//         musclesTargeted: [
//             { muscle: { name: "Hamstrings", size: "Large" }, activation: "Moderate" }
//         ],
//         exerciseType: "Compound",
//         priority: "Moderate",
//         baseSets: 3,
//         baseReps: 10
//     },
//     {
//         name: "Hip Thrusts",
//         musclesTargeted: [
//             { muscle: { name: "Glutes", size: "Large" }, activation: "High" }
//         ],
//         exerciseType: "Compound",
//         priority: "High",
//         baseSets: 4,
//         baseReps: 10
//     },
//     {
//         name: "Squats",
//         musclesTargeted: [
//             { muscle: { name: "Glutes", size: "Large" }, activation: "High" }
//         ],
//         exerciseType: "Compound",
//         priority: "High",
//         baseSets: 4,
//         baseReps: 8
//     },
//     {
//         name: "Lunges",
//         musclesTargeted: [
//             { muscle: { name: "Glutes", size: "Large" }, activation: "Moderate" }
//         ],
//         exerciseType: "Compound",
//         priority: "Moderate",
//         baseSets: 3,
//         baseReps: 10
//     },
//     {
//         name: "Step-Ups",
//         musclesTargeted: [
//             { muscle: { name: "Glutes", size: "Large" }, activation: "Moderate" }
//         ],
//         exerciseType: "Compound",
//         priority: "Moderate",
//         baseSets: 3,
//         baseReps: 12
//     },
//     {
//         name: "Barbell Rows",
//         musclesTargeted: [
//             { muscle: { name: "Upper Back", size: "Large" }, activation: "High" }
//         ],
//         exerciseType: "Compound",
//         priority: "High",
//         baseSets: 4,
//         baseReps: 8
//     },
//     {
//         name: "Pull-Ups",
//         musclesTargeted: [
//             { muscle: { name: "Upper Back", size: "Large" }, activation: "High" }
//         ],
//         exerciseType: "Compound",
//         priority: "High",
//         baseSets: 4,
//         baseReps: 8
//     },
//     {
//         name: "T-Bar Rows",
//         musclesTargeted: [
//             { muscle: { name: "Upper Back", size: "Large" }, activation: "Moderate" }
//         ],
//         exerciseType: "Compound",
//         priority: "Moderate",
//         baseSets: 3,
//         baseReps: 10
//     },
//     {
//         name: "Face Pulls",
//         musclesTargeted: [
//             { muscle: { name: "Upper Back", size: "Large" }, activation: "Moderate" },
//             { muscle: { name: "Traps", size: "Small" }, activation: "Moderate" },
//             { muscle: { name: "Rear Delts", size: "Small" }, activation: "Moderate" }
//         ],
//         exerciseType: "Isolation",
//         priority: "Low",
//         baseSets: 3,
//         baseReps: 12
//     },
//     {
//         name: "Deadlifts",
//         musclesTargeted: [
//             { muscle: { name: "Lower Back", size: "Large" }, activation: "High" }
//         ],
//         exerciseType: "Compound",
//         priority: "High",
//         baseSets: 4,
//         baseReps: 8
//     },
//     {
//         name: "Good Mornings",
//         musclesTargeted: [
//             { muscle: { name: "Lower Back", size: "Large" }, activation: "Moderate" }
//         ],
//         exerciseType: "Compound",
//         priority: "Moderate",
//         baseSets: 3,
//         baseReps: 10
//     },
//     {
//         name: "Back Extensions",
//         musclesTargeted: [
//             { muscle: { name: "Lower Back", size: "Large" }, activation: "Moderate" }
//         ],
//         exerciseType: "Isolation",
//         priority: "Low",
//         baseSets: 3,
//         baseReps: 12
//     },
//     {
//         name: "Rack Pulls",
//         musclesTargeted: [
//             { muscle: { name: "Lower Back", size: "Large" }, activation: "High" }
//         ],
//         exerciseType: "Compound",
//         priority: "Moderate",
//         baseSets: 4,
//         baseReps: 8
//     },
//     {
//         name: "Lat Pulldowns",
//         musclesTargeted: [
//             { muscle: { name: "Lats", size: "Large" }, activation: "High" }
//         ],
//         exerciseType: "Compound",
//         priority: "High",
//         baseSets: 4,
//         baseReps: 10
//     },
//     {
//         name: "Pull-Ups",
//         musclesTargeted: [
//             { muscle: { name: "Lats", size: "Large" }, activation: "High" }
//         ],
//         exerciseType: "Compound",
//         priority: "High",
//         baseSets: 4,
//         baseReps: 8
//     },
//     {
//         name: "Barbell Rows",
//         musclesTargeted: [
//             { muscle: { name: "Lats", size: "Large" }, activation: "High" }
//         ],
//         exerciseType: "Compound",
//         priority: "Moderate",
//         baseSets: 3,
//         baseReps: 8
//     },
//     {
//         name: "Single-Arm Dumbbell Rows",
//         musclesTargeted: [
//             { muscle: { name: "Lats", size: "Large" }, activation: "Moderate" }
//         ],
//         exerciseType: "Compound",
//         priority: "Moderate",
//         baseSets: 3,
//         baseReps: 10
//     },
//     {
//         name: "Bicep Curls",
//         musclesTargeted: [
//             { muscle: { name: "Biceps", size: "Small" }, activation: "High" }
//         ],
//         exerciseType: "Isolation",
//         priority: "Moderate",
//         baseSets: 3,
//         baseReps: 12
//     },
//     {
//         name: "Hammer Curls",
//         musclesTargeted: [
//             { muscle: { name: "Biceps", size: "Small" }, activation: "Moderate" }
//         ],
//         exerciseType: "Isolation",
//         priority: "Moderate",
//         baseSets: 3,
//         baseReps: 12
//     },
//     {
//         name: "Concentration Curls",
//         musclesTargeted: [
//             { muscle: { name: "Biceps", size: "Small" }, activation: "High" }
//         ],
//         exerciseType: "Isolation",
//         priority: "Moderate",
//         baseSets: 3,
//         baseReps: 10
//     },
//     {
//         name: "Tricep Dips",
//         musclesTargeted: [
//             { muscle: { name: "Triceps", size: "Small" }, activation: "High" }
//         ],
//         exerciseType: "Compound",
//         priority: "Moderate",
//         baseSets: 3,
//         baseReps: 10
//     },
//     {
//         name: "Tricep Pushdowns",
//         musclesTargeted: [
//             { muscle: { name: "Triceps", size: "Small" }, activation: "High" }
//         ],
//         exerciseType: "Isolation",
//         priority: "Moderate",
//         baseSets: 3,
//         baseReps: 12
//     },
//     {
//         name: "Overhead Tricep Extension",
//         musclesTargeted: [
//             { muscle: { name: "Triceps", size: "Small" }, activation: "High" }
//         ],
//         exerciseType: "Isolation",
//         priority: "Moderate",
//         baseSets: 3,
//         baseReps: 10
//     },
//     {
//         name: "Lateral Raises",
//         musclesTargeted: [
//             { muscle: { name: "Lateral Delts", size: "Small" }, activation: "High" }
//         ],
//         exerciseType: "Isolation",
//         priority: "Moderate",
//         baseSets: 3,
//         baseReps: 15
//     },
//     {
//         name: "Dumbbell Shoulder Press",
//         musclesTargeted: [
//             { muscle: { name: "Lateral Delts", size: "Small" }, activation: "Moderate" }
//         ],
//         exerciseType: "Compound",
//         priority: "Moderate",
//         baseSets: 3,
//         baseReps: 10
//     },
//     {
//         name: "Cable Lateral Raises",
//         musclesTargeted: [
//             { muscle: { name: "Lateral Delts", size: "Small" }, activation: "High" }
//         ],
//         exerciseType: "Isolation",
//         priority: "Moderate",
//         baseSets: 3,
//         baseReps: 15
//     },
//     {
//         name: "Barbell Shrugs",
//         musclesTargeted: [
//             { muscle: { name: "Traps", size: "Small" }, activation: "High" }
//         ],
//         exerciseType: "Isolation",
//         priority: "Moderate",
//         baseSets: 4,
//         baseReps: 12
//     },
//     {
//         name: "Dumbbell Shrugs",
//         musclesTargeted: [
//             { muscle: { name: "Traps", size: "Small" }, activation: "High" }
//         ],
//         exerciseType: "Isolation",
//         priority: "Moderate",
//         baseSets: 4,
//         baseReps: 12
//     },
//     {
//         name: "Front Raises",
//         musclesTargeted: [
//             { muscle: { name: "Front Delts", size: "Small" }, activation: "High" }
//         ],
//         exerciseType: "Isolation",
//         priority: "Moderate",
//         baseSets: 3,
//         baseReps: 12
//     },
//     {
//         name: "Dumbbell Shoulder Press",
//         musclesTargeted: [
//             { muscle: { name: "Front Delts", size: "Small" }, activation: "Moderate" }
//         ],
//         exerciseType: "Compound",
//         priority: "Moderate",
//         baseSets: 3,
//         baseReps: 10
//     },
//     {
//         name: "Barbell Overhead Press",
//         musclesTargeted: [
//             { muscle: { name: "Front Delts", size: "Small" }, activation: "Moderate" }
//         ],
//         exerciseType: "Compound",
//         priority: "High",
//         baseSets: 3,
//         baseReps: 8
//     },
//     {
//         name: "Reverse Flys",
//         musclesTargeted: [
//             { muscle: { name: "Rear Delts", size: "Small" }, activation: "High" }
//         ],
//         exerciseType: "Isolation",
//         priority: "Moderate",
//         baseSets: 3,
//         baseReps: 12
//     },
//     {
//         name: "Reverse Cable Lateral Raises",
//         musclesTargeted: [
//             { muscle: { name: "Rear Delts", size: "Small" }, activation: "Moderate" }
//         ],
//         exerciseType: "Isolation",
//         priority: "Moderate",
//         baseSets: 3,
//         baseReps: 12
//     },
//     {
//         name: "Standing Calf Raises",
//         musclesTargeted: [
//             { muscle: { name: "Calves", size: "Small" }, activation: "High" }
//         ],
//         exerciseType: "Isolation",
//         priority: "High",
//         baseSets: 4,
//         baseReps: 15
//     },
//     {
//         name: "Seated Calf Raises",
//         musclesTargeted: [
//             { muscle: { name: "Calves", size: "Small" }, activation: "High" }
//         ],
//         exerciseType: "Isolation",
//         priority: "Moderate",
//         baseSets: 4,
//         baseReps: 15
//     },
//     {
//         name: "Donkey Calf Raises",
//         musclesTargeted: [
//             { muscle: { name: "Calves", size: "Small" }, activation: "High" }
//         ],
//         exerciseType: "Isolation",
//         priority: "Moderate",
//         baseSets: 4,
//         baseReps: 15
//     }                                             
// ];