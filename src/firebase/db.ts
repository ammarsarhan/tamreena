import { app } from "./main";
import { collection, doc, DocumentData, getDoc, getDocs, getFirestore, query, QuerySnapshot, where } from "firebase/firestore";
import { MuscleType } from "../utils/types/muscle";
import { ExerciseMuscleType, ExerciseType } from "../utils/types/exercise";

const db = getFirestore(app);

export async function fetchMuscle(id: string) : Promise<MuscleType> {
    const docRef = doc(db, "muscles", id);
    const req = await getDoc(docRef);
    
    if (!req.exists()) {
        throw new Error("Could not fetch muscle data with specified ID.")
    }

    const muscle = req.data();

    return {
        id: req.id,
        name: muscle.name,
        size: muscle.size
    }
}

export async function fetchMuscles() : Promise<MuscleType[]> {
    const arr: MuscleType[] = [];

    const colRef = collection(db, "muscles");
    const req = await getDocs(colRef);

    req.docs.forEach(doc => {
        const data = doc.data();
        const muscle = {
            id: doc.id,
            name: data.name,
            size: data.size
        };

        arr.push(muscle);
    })

    return arr;
}

async function parseExercisesRequest(data: QuerySnapshot<DocumentData, DocumentData>, target: MuscleType, muscles: MuscleType[]) {
    const promises = data.docs.map(async doc => {
        const data = doc.data();
        const musclesTargeted: ExerciseMuscleType[] = [];

        muscles.map(el => {
            if (el.id == target.id) {
                musclesTargeted.push({ muscle: el, activation: "High" });
            }
        })

        const exercise: ExerciseType = {
            name: data.name,
            musclesTargeted: musclesTargeted,
            exerciseType: data.exerciseType,
            priority: data.priority,
            baseSets: data.baseSets
        };

        exercise.baseReps = data.baseReps ?? exercise.baseReps;
        exercise.baseDuration = data.baseDuration ?? exercise.baseDuration;

        return exercise;
    });

    const exercises = await Promise.all(promises);
    return exercises;
}

export async function fetchExercises(target: MuscleType, muscles: MuscleType[]): Promise<ExerciseType[]> {
    const colRef = collection(db, "exercises");    
    const idRef = doc(db, `/muscles/${target.id}`);

    const exercises: ExerciseType[] = [];

    for await (const el of ["High", "Moderate", "Low"]) {
        const request = query(colRef, where("musclesTargeted", "array-contains", { muscle: idRef, activation: el }));
        const response = await getDocs(request);

        const data = await parseExercisesRequest(response, target, muscles);

        if (data.length != 0) {
            exercises.push(...data);
        }
    }

    return exercises;
}