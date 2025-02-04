import { getAuth, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { app } from './main';

export const auth = getAuth(app);

export async function createUserWithCredentials(name: string, email: string, password: string) : Promise<{ message: string, data?: User }> {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        if (!res.user) {
            return {
                message: "Could not create new user. Please try again later."
            }
        }

        await updateProfile(res.user, {
            displayName: name
        })
        
        return {
            message: "Successfully created new user.",
            data: res.user
        }
    } catch(error) {
        return {
            message: `Failed to create new user. ${error.message}`
        }
    }
}

export async function signInUserWithCredentials(email: string, password: string) : Promise<{ message: string, data?: User }> {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);

        if (!res.user) {
            return {
                message: "Could not sign user in. Please try again later."
            }
        }
        return {
            message: "Successfully signed user in.",
            data: res.user
        }
    } catch(error) {
        return {
            message: `Failed to sign user in. ${error.message}`
        }
    }
}

export async function signOutUser() {
    try {
        await signOut(auth);

        return {
            message: "Successfully signed user out.",
            success: true
        }
    } catch(error) {
        return {
            message: `Failed to sign user out. ${error.message}`,
            success: false
        }
    }
}
