import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth } from "../firebase/auth";

interface AuthContextType {
    user: User | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function useAuthContext () {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }

    return context;
}

export function AuthContextProvider ({ children } : { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        return auth.onAuthStateChanged(setUser);
    }, [])

    return (
        <AuthContext.Provider value={{user: user}}>
            {children}
        </AuthContext.Provider>
    )
}