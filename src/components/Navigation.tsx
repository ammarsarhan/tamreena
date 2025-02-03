import { NavLink } from "react-router";
import { buttonStyle } from "./Button";
import { Search, ChevronDown } from "lucide-react";
import useAuthContext from "../context/useAuthContext";
import ProfileAvatar from "./ProfileAvatar";

export default function Navigation () {
    const auth = useAuthContext();

    return (
        <nav className="flex items-center justify-between px-6 py-4 border-b-[1px]">
            <div>
                <NavLink to="/" className="font-semibold text-lg">Tamreena</NavLink>
            </div>
            <div className="flex items-center gap-x-4">
                <div className="flex items-center gap-x-4 text-sm">
                    <NavLink to="/trainers" className="hidden md:flex items-center gap-x-2">
                        Trainers <ChevronDown className="w-3 h-3"/>
                    </NavLink>
                    <NavLink to="/company" className="hidden md:flex items-center gap-x-2">
                        Company <ChevronDown className="w-3 h-3"/>
                    </NavLink>
                    <NavLink to="/plans" className="hidden sm:block text-blue-700 font-medium">Go Pro</NavLink>
                </div>
                <NavLink to="/search" className="hidden sm:block p-2 mr-2">
                    <Search className="w-4 h-4"/>
                </NavLink>
                {
                    auth.user ?
                    <ProfileAvatar/> :
                    <div className="flex items-center gap-x-3">
                        <NavLink to="/auth/log-in" className={buttonStyle.primary}>Log In</NavLink>
                        <NavLink to="/auth/sign-up" className={buttonStyle.outline}>Sign Up</NavLink>
                    </div>
                }
            </div>
        </nav>
    )
}