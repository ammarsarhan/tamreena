import { getAuth } from 'firebase/auth';
import { app } from './main';

export const auth = getAuth(app);

export async function createUserWithCredentials(email: string, password: string) {
    
}

export async function signInUserWithCredentials(email: string, password: string) {
    
}
