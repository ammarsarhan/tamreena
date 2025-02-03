import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from './main';

export const auth = getAuth(app);

export async function createUserWithCredentials(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
        if (!res.user) {
            throw new Error("Could not create new user.")
        }
    })
    .catch((error) => {
        throw new Error(`Failed to create new user. (${error.message})`)
    })
}

export async function signInUserWithCredentials(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
        if (!res.user) {
            throw new Error("Could not create new user.")
        }
    })
    .catch((error) => {
        throw new Error(`Failed to create new user. (${error.message})`)
    })
}
