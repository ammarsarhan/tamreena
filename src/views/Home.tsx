import { NavLink } from "react-router";

export default function Home () {
    return (
        <div className="h-full">
            <div className="h-full md:w-1/2 md:text-left flex flex-col text-center justify-center gap-y-6 px-10">
                <h1 className="text-4xl font-semibold">Unlock Your Potential Through Personalized Workout Plans.</h1>
                <p className="w-full text-gray-600">Tamreena provides you with an <span className="underline">easy</span> and <span className="underline">reliable</span> way to create workouts on the go without any extra effort!</p>
                <div className="mt-4">
                    <NavLink to="/app" className="px-6 py-3 rounded-xl bg-black text-white text-sm hover:bg-gray-900 transition-colors">Start the generator!</NavLink>
                </div>
            </div>
        </div>
    )
}