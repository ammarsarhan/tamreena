import { NavLink, useNavigate } from "react-router";
import { AuthNavigation } from "../components/Navigation";
import { FormEvent, useState, useEffect, useCallback } from "react";
import { z } from "zod";
import { signInUserWithCredentials } from "../firebase/auth";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);
    const [mask, setMask] = useState<"password" | "text">("password");
    const switchMask = () => setMask(mask == "text" ? "password" : "text");

    useEffect(() => {
        if (error) {
            const timeout = setInterval(() => {
                setError("");
            }, 2000) 
    
            return () => clearTimeout(timeout);
        }
    }, [error])

    const schema = z.object({
        email: z.string().email("Please provide a valid email address."),
        password: z.string().min(8, "Incorrect email or password. Please provide valid credentials.").max(4096, "Incorrect email or password. Please provide valid credentials.").regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/, 
            "Incorrect email or password. Please provide valid credentials."
        )
    })

    const signInUser = useCallback(async (email: string, password: string) => {
        const request = await signInUserWithCredentials(email, password);
        if (!request.data) {
            setError(request.message);
            setLoading(false);
            return;
        }
        navigate("/app");
    }, [navigate]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        const parseResult = schema.safeParse({email, password});
        
        if (!parseResult.success) {
            setError(parseResult.error.errors[0].message);
            setLoading(false);
            return;
        }

        signInUser(parseResult.data.email, parseResult.data.password);
    }

    
    return (
        <>
            <div className="col-span-3 lg:col-span-1 relative flex flex-col h-full border-r-[1px]" onSubmit={handleSubmit}>
                <AuthNavigation/>
                <form className="h-full w-full flex-center">
                    <div className="relative flex flex-col gap-y-10 px-8">
                        <div>
                            { 
                                error &&
                                <div className="w-full flex-center text-center ">
                                    <span className="w-96 text-sm text-center text-red-500 mb-6">{error}</span> 
                                </div>
                            }
                            <h1 className="text-2xl font-medium mb-2">Sign In</h1>
                            <p className="text-sm text-gray-600">Enter your email and password to sign back in to Tamreena.</p>
                        </div>
                        <div className="w-full">
                            <div className="w-full">
                                <span className="block mb-2 text-[0.8125rem] text-gray-600">Email</span>
                                <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="border-[1px] py-2 px-4 text-sm rounded-md w-full mb-4" placeholder="Email address"/>
                            </div>
                            <div className="w-full">
                                <span className="block mb-2 text-[0.8125rem] text-gray-600">Password</span>
                                <input value={password} onChange={e => setPassword(e.target.value)} type={mask} className="mb-4 border-[1px] py-2 px-4 text-sm rounded-md w-full" placeholder="Password"/>
                                <div className="flex items-center gap-x-2">
                                    <input type="checkbox" checked={mask == "text"} onChange={switchMask}/>
                                    <span className="text-[0.8125rem]" onClick={switchMask}>Show password</span>
                                </div>
                            </div>
                        </div>
                        <button type="submit" disabled={loading} className={`w-full lg:w-96 px-2 py-3 rounded-lg text-sm transition-colors ${loading ? "bg-gray-200" : "bg-blue-800 hover:bg-blue-700 text-white"}`}>Sign in</button>
                    </div>
                </form>
                <div className="absolute bottom-6 w-full text-center">
                    <p className="text-gray-600 text-[0.8125rem]">Don't have an account? <NavLink to="/auth/sign-up" className="text-black underline">Create an account</NavLink> for free!</p>
                </div>
            </div>
            <div className="hidden h-full lg:block lg:col-span-2">
            </div>
        </>
    )
}