import { Outlet } from "react-router";

export default function AuthLayout() {
    return (
        <main className="grid grid-cols-3 h-screen">
            <Outlet/>
        </main>
    )
}