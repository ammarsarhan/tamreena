import { MuscleType } from "./filter";

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

export const exercises: ExerciseType[] = [
    {
        name: "Flat Bench Press",
        musclesTargeted: [
            {
                muscle: {
                    name: "Chest",
                    size: "Large"
                },
                activation: "High"
            },
            {
                muscle: {
                    name: "Upper Chest",
                    size: "Large"
                },
                activation: "Moderate"
            }
        ],
        exerciseType: "Compound",
        priority: "High",
        baseSets: 4,
        baseReps: 10
    },
    {
        name: "Incline Dumbbell Press",
        musclesTargeted: [
            {
                muscle: {
                    name: "Upper Chest",
                    size: "Large"
                },
                activation: "High"
            },
            {
                muscle: {
                    name: "Front Delts",
                    size: "Small"
                },
                activation: "Moderate"
            }
        ],
        exerciseType: "Compound",
        priority: "High",
        baseSets: 3,
        baseReps: 12
    },
    {
        name: "Pull-Ups",
        musclesTargeted: [
            {
                muscle: {
                    name: "Lats",
                    size: "Large"
                },
                activation: "High"
            },
            {
                muscle: {
                    name: "Biceps",
                    size: "Small"
                },
                activation: "Moderate"
            }
        ],
        exerciseType: "Compound",
        priority: "High",
        baseSets: 4,
        baseReps: 8
    },
    {
        name: "Barbell Deadlift",
        musclesTargeted: [
            {
                muscle: {
                    name: "Lower Back",
                    size: "Large"
                },
                activation: "High"
            },
            {
                muscle: {
                    name: "Glutes",
                    size: "Large"
                },
                activation: "High"
            },
            {
                muscle: {
                    name: "Hamstrings",
                    size: "Large"
                },
                activation: "High"
            }
        ],
        exerciseType: "Compound",
        priority: "High",
        baseSets: 4,
        baseReps: 6
    },
    {
        name: "Bicep Curls",
        musclesTargeted: [
            {
                muscle: {
                    name: "Biceps",
                    size: "Small"
                },
                activation: "High"
            }
        ],
        exerciseType: "Isolation",
        priority: "Moderate",
        baseSets: 3,
        baseReps: 15
    },
    {
        name: "Tricep Pushdowns",
        musclesTargeted: [
            {
                muscle: {
                    name: "Triceps",
                    size: "Small"
                },
                activation: "High"
            }
        ],
        exerciseType: "Isolation",
        priority: "Moderate",
        baseSets: 3,
        baseReps: 15
    },
    {
        name: "Lateral Raises",
        musclesTargeted: [
            {
                muscle: {
                    name: "Lateral Delts",
                    size: "Small"
                },
                activation: "High"
            }
        ],
        exerciseType: "Isolation",
        priority: "Moderate",
        baseSets: 3,
        baseReps: 15
    },
    {
        name: "Barbell Squats",
        musclesTargeted: [
            {
                muscle: {
                    name: "Quads",
                    size: "Large"
                },
                activation: "High"
            },
            {
                muscle: {
                    name: "Glutes",
                    size: "Large"
                },
                activation: "High"
            },
            {
                muscle: {
                    name: "Lower Back",
                    size: "Large"
                },
                activation: "Moderate"
            }
        ],
        exerciseType: "Compound",
        priority: "High",
        baseSets: 4,
        baseReps: 10
    },
    {
        name: "Romanian Deadlifts",
        musclesTargeted: [
            {
                muscle: {
                    name: "Hamstrings",
                    size: "Large"
                },
                activation: "High"
            },
            {
                muscle: {
                    name: "Glutes",
                    size: "Large"
                },
                activation: "High"
            }
        ],
        exerciseType: "Compound",
        priority: "High",
        baseSets: 4,
        baseReps: 8
    },
    {
        name: "Standing Calf Raises",
        musclesTargeted: [
            {
                muscle: {
                    name: "Calves",
                    size: "Small"
                },
                activation: "High"
            }
        ],
        exerciseType: "Isolation",
        priority: "Moderate",
        baseSets: 4,
        baseReps: 20
    },
    {
        name: "Plank",
        musclesTargeted: [
            {
                muscle: {
                    name: "Core",
                    size: "Small"
                },
                activation: "High"
            }
        ],
        exerciseType: "Isolation",
        priority: "Moderate",
        baseSets: 3,
        baseDuration: 60
    },
    {
        name: "Cable Rows",
        musclesTargeted: [
            {
                muscle: {
                    name: "Upper Back",
                    size: "Large"
                },
                activation: "High"
            },
            {
                muscle: {
                    name: "Biceps",
                    size: "Small"
                },
                activation: "Moderate"
            }
        ],
        exerciseType: "Compound",
        priority: "High",
        baseSets: 3,
        baseReps: 12
    },
    {
        name: "Seated Dumbbell Shoulder Press",
        musclesTargeted: [
            {
                muscle: {
                    name: "Front Delts",
                    size: "Small"
                },
                activation: "High"
            },
            {
                muscle: {
                    name: "Lateral Delts",
                    size: "Small"
                },
                activation: "Moderate"
            }
        ],
        exerciseType: "Compound",
        priority: "High",
        baseSets: 3,
        baseReps: 10
    },
    {
        name: "Leg Press",
        musclesTargeted: [
            {
                muscle: {
                    name: "Quads",
                    size: "Large"
                },
                activation: "High"
            },
            {
                muscle: {
                    name: "Glutes",
                    size: "Large"
                },
                activation: "Moderate"
            }
        ],
        exerciseType: "Compound",
        priority: "Moderate",
        baseSets: 4,
        baseReps: 12
    },
    {
        name: "Dumbbell Flyes",
        musclesTargeted: [
            {
                muscle: {
                    name: "Chest",
                    size: "Large"
                },
                activation: "High"
            }
        ],
        exerciseType: "Isolation",
        priority: "Moderate",
        baseSets: 3,
        baseReps: 12
    },
    {
        name: "Overhead Tricep Extensions",
        musclesTargeted: [
            {
                muscle: {
                    name: "Triceps",
                    size: "Small"
                },
                activation: "High"
            }
        ],
        exerciseType: "Isolation",
        priority: "Moderate",
        baseSets: 3,
        baseReps: 12
    },
    {
        name: "Front Squats",
        musclesTargeted: [
            {
                muscle: {
                    name: "Quads",
                    size: "Large"
                },
                activation: "High"
            },
            {
                muscle: {
                    name: "Core",
                    size: "Small"
                },
                activation: "Moderate"
            }
        ],
        exerciseType: "Compound",
        priority: "High",
        baseSets: 4,
        baseReps: 8
    },
    {
        name: "Lat Pulldowns",
        musclesTargeted: [
            {
                muscle: {
                    name: "Lats",
                    size: "Large"
                },
                activation: "High"
            },
            {
                muscle: {
                    name: "Biceps",
                    size: "Small"
                },
                activation: "Moderate"
            }
        ],
        exerciseType: "Compound",
        priority: "High",
        baseSets: 4,
        baseReps: 10
    },
    {
        name: "Face Pulls",
        musclesTargeted: [
            {
                muscle: {
                    name: "Rear Delts",
                    size: "Small"
                },
                activation: "High"
            },
            {
                muscle: {
                    name: "Traps",
                    size: "Small"
                },
                activation: "Moderate"
            }
        ],
        exerciseType: "Isolation",
        priority: "Moderate",
        baseSets: 3,
        baseReps: 15
    },
    {
        name: "Glute Bridges",
        musclesTargeted: [
            {
                muscle: {
                    name: "Glutes",
                    size: "Large"
                },
                activation: "High"
            }
        ],
        exerciseType: "Isolation",
        priority: "Moderate",
        baseSets: 3,
        baseReps: 15
    },
    {
        name: "Good Mornings",
        musclesTargeted: [
            {
                muscle: {
                    name: "Hamstrings",
                    size: "Large"
                },
                activation: "High"
            },
            {
                muscle: {
                    name: "Lower Back",
                    size: "Large"
                },
                activation: "Moderate"
            }
        ],
        exerciseType: "Compound",
        priority: "Moderate",
        baseSets: 3,
        baseReps: 12
    },
    {
        name: "Arnold Press",
        musclesTargeted: [
            {
                muscle: {
                    name: "Front Delts",
                    size: "Small"
                },
                activation: "High"
            },
            {
                muscle: {
                    name: "Lateral Delts",
                    size: "Small"
                },
                activation: "Moderate"
            }
        ],
        exerciseType: "Compound",
        priority: "Moderate",
        baseSets: 3,
        baseReps: 12
    }
];