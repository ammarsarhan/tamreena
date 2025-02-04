import { useEffect, useState } from "react"
import { signOutUser } from "../firebase/auth";
import { useNavigate } from "react-router";

export default function Signout () {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const signOut = async () => {
            const request = await signOutUser();
            if (!request.success) {
                setError(request.message);
                return;
            }

            navigate("/");
        }

        signOut();
    });

    return (
        <div className="h-screen w-full flex-center">
            { error && <span className="text-sm text-center text-red-500">{error}</span> }
        </div>
    )
}