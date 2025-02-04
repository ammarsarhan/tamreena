import { Outlet } from "react-router";

import Navigation from "../components/Navigation";

export default function MainLayout () {
    return (
        <main className="flex flex-col h-screen">
            <Navigation/>
            <Outlet/>
        </main>
    )
}