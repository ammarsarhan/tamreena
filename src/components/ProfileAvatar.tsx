import { NavLink } from "react-router";
import useAuthContext from "../context/useAuthContext";
import { User } from "lucide-react";

export default function ProfileAvatar () {
    const auth = useAuthContext();
    const source = auth.user?.photoURL;

    return (
        <NavLink to="/auth/sign-out" className="flex-center rounded-full w-7 h-7 border-[1px] border-gray-300 overflow-hidden">
            {
                source ?
                <img src={source} alt="" className="w-full h-full object-fit bg-black"/> :
                <User className="w-4 h-4 text-gray-500"/>
            }
        </NavLink>
    )
}