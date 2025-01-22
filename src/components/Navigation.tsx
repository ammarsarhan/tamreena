import { NavLink } from "react-router";
import { buttonStyle } from "./Button";
import { Search, ChevronDown } from "lucide-react";

export default function Navigation () {
    return (
        <nav className="flex items-center justify-between px-6 py-5 border-b-[1px]">
            <div>
                <NavLink to="/" className="font-semibold text-lg">Tamreena</NavLink>
            </div>
            <div className="flex items-center gap-x-4">
                <div className="flex items-center gap-x-4 text-sm">
                    <NavLink to="/trainers" className="flex items-center gap-x-2">
                        Trainers <ChevronDown className="w-3 h-3"/>
                    </NavLink>
                    <NavLink to="/company" className="flex items-center gap-x-2">
                        Company <ChevronDown className="w-3 h-3"/>
                    </NavLink>
                    <NavLink to="/plans/pro" className="text-blue-700 font-medium">Go Pro</NavLink>
                </div>
                <NavLink to="/search" className="p-2 mr-2">
                    <Search className="w-4 h-4"/>
                </NavLink>
                <div className="flex items-center gap-x-3">
                    <NavLink to="/auth/log-in" className={buttonStyle.primary}>Log In</NavLink>
                    <NavLink to="/auth/sign-up" className={buttonStyle.outline}>Sign Up</NavLink>
                </div>
            </div>
        </nav>
    )
}