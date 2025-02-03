import { Routes, Route } from "react-router";

import Navigation from "../components/Navigation";
import Home from "../views/Home";
import App from "../views/App";
import Plans from "../views/Plans";


export default function MainLayout () {
    return (
        <main className="flex flex-col h-screen">
            <Navigation/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/app" element={<App/>} />
                <Route path="/plans" element={<Plans/>} />
            </Routes>
        </main>
    )
}