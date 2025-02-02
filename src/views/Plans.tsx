import { NavLink } from "react-router"
import formatInEGP from "../utils/currency"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from "../assets/styles/plans.module.css"

interface PlanCardProps {
    type: "Free" | "Pro" | "Enterprise",
    price: number,
    description: string,
    actionLink: string,
    label: string,
    features: string[]
}

export function PlanCard ({type, price, description, actionLink, label, features} : PlanCardProps) {
    return (
        <div className="border-[1px] p-6 rounded-xl max-w-96">
            <div className="flex flex-col gap-y-4 border-b-[1px] pb-4">
                <h3 className="text-lg">{type}</h3>
                <div className="flex flex-col gap-y-1">
                    <span className="text-sm text-gray-600">Starts at</span>
                    <h2 className="text-xl font-semibold">{formatInEGP(price)}</h2>
                    <span className="text-sm text-gray-600">{price === 2000 ? "per month" : "per month/user"}</span>
                </div>
                <p className="text-sm">{description}</p>
                <div className="my-3 w-full">
                    <NavLink to={actionLink} className="border-[1px] border-blue-800 text-blue-800 hover:bg-blue-50 hover:bg-opacity-20 transition-all px-4 py-3 rounded-md text-sm block text-center">{price === 0 ? "Start for Free" : "Upgrade Now"}</NavLink>
                </div>
            </div>
            <div className="pt-6">
                <h1>{label}</h1>
                <ul className="text-sm my-3">
                    {
                        features.map((el, index) => <li key={index} className="before:content-['-'] before:mr-2">{el}</li>)
                    }
                </ul>
            </div>
        </div>
    )
}

export default function Plans () {
    return (
        <div className="p-4">
            <header className="flex-center my-10 mx-4">
                <div className="lg:w-1/2 flex flex-col text-center justify-center gap-y-6">
                    <h1 className="text-4xl font-semibold">Simple Pricing Plans Tailored To Your Specific Needs.</h1>
                    <p className="w-full text-gray-600">Explore a diverse selection of plans, each designed with cutting-edge features, tailored to meet your specific needs and enhance your overall fitness experience.</p>
                </div>
            </header>
            <div className="flex-center flex-wrap gap-4 my-4">
                <PlanCard type="Free" price={0} description="Perfect for beginners looking to explore the platform with essential features at no cost." actionLink="/app" label="Free, forever." features={["Up to 50 generations/day.", "Save workouts.", "Search exercises."]}/>
                <PlanCard type="Pro" price={50} description="Designed for fitness enthusiasts and professionals who need unlimited access and premium support." actionLink="/plans/pro" label="Most popular choice!" features={["Unlimited generations.", "No ads.", "Priority support."]}/>
                <PlanCard type="Enterprise" price={2000} description="Built for gyms and businesses that need scalable, enterprise-grade solutions with powerful features." actionLink="/plans/enterprise" label="Large. Powerful." features={["Feature 1", "Feature 2", "Feature 3"]}/>
            </div>
        </div>
    )
}