import { Routes, Route } from "react-router"
import Login from "../views/Login"
import Signup from "../views/Signup"

export default function AuthLayout() {
    return (
        <Routes>
            <Route path="/auth/log-in" element={<Login/>} />
            <Route path="/auth/sign-up" element={<Signup/>} />
        </Routes>
    )
}