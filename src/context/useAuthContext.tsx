import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth } from "../firebase/auth";

interface AuthContextType {
    user: User | null,
    loading: boolean
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((res) => {
            setUser(res);
            setLoading(false);
        });

        return unsubscribe;
    }, [])

    return (
        <AuthContext.Provider value={{user: user, loading: loading}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}