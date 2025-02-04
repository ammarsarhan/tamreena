import { FormEvent, useState, useEffect, useCallback } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthNavigation } from "../components/Navigation";
import { z } from "zod";
import { createUserWithCredentials } from "../firebase/auth";

export default function Signup() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
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
        name: z.string(),
        email: z.string().email("Please provide a valid email address."),
        password: z.string().min(8, "Password must be at least 8 characters.").max(4096, "Password must be less than 100 characters.").regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/, 
            "Must contain at least one uppercase letter, one lowercase letter, and one number."
        ),
        repassword: z.string({message: "Please re-enter the password once again."})
    }).refine(data => data.repassword === data.password, { message: "Passwords must match one another." })

    const createUser = useCallback(async (name: string, email: string, password: string) => {
        const request = await createUserWithCredentials(name, email, password);
        if (!request.data) {
            setError(request.message);
            setLoading(false);
            return;
        }
        navigate("/app");
    }, [navigate])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        const parseResult = schema.safeParse({name, email, password, repassword});
        
        if (!parseResult.success) {
            setError(parseResult.error.errors[0].message);
            setLoading(false);
            return;
        }

        createUser(parseResult.data.name, parseResult.data.email, parseResult.data.password);
    }

    return (
        <>
            <div className="col-span-3 lg:col-span-2 relative flex flex-col h-full border-r-[1px]" onSubmit={handleSubmit}>
                <AuthNavigation/>
                <form className="h-full w-full flex-center">
                    <div className="lg:w-3/4 relative flex flex-col gap-y-10 px-8">
                        <div>
                            { 
                                error &&
                                <div className="w-full flex-center text-center ">
                                    <span className="w-96 text-sm text-center text-red-500 mb-6">{error}</span> 
                                </div>
                            }
                            <h1 className="text-2xl font-medium mb-2">Sign Up</h1>
                            <p className="text-sm text-gray-600">Create a free Tamreena account by using an email and password.</p>
                        </div>
                        <div className="w-full">
                            <div className="w-full">
                                <span className="block mb-2 text-[0.8125rem] text-gray-600">Name</span>
                                <input value={name} onChange={e => setName(e.target.value)} type="text" className="border-[1px] py-2 px-4 text-sm rounded-md w-full mb-4" placeholder="Full name"/>
                            </div>
                            <div className="w-full">
                                <span className="block mb-2 text-[0.8125rem] text-gray-600">Email</span>
                                <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="border-[1px] py-2 px-4 text-sm rounded-md w-full mb-4" placeholder="Email address"/>
                            </div>
                            <div className="lg:flex gap-x-8">
                                <div className="w-full">
                                    <span className="block mb-2 text-[0.8125rem] text-gray-600">Password</span>
                                    <input value={password} onChange={e => setPassword(e.target.value)} type={mask} className="mb-4 border-[1px] py-2 px-4 text-sm rounded-md w-full" placeholder="Password"/>
                                    <div className="hidden lg:flex items-center gap-x-2">
                                        <input type="checkbox" checked={mask == "text"} onChange={switchMask}/>
                                        <span className="text-[0.8125rem]" onClick={switchMask}>Show password</span>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <span className="block mb-2 text-[0.8125rem] text-gray-600">Re-enter Password</span>
                                    <input value={repassword} onChange={e => setRepassword(e.target.value)} type={mask} className="mb-4 border-[1px] py-2 px-4 text-sm rounded-md w-full" placeholder="Password"/>
                                    <div className="flex lg:hidden items-center gap-x-2">
                                        <input type="checkbox" checked={mask == "text"} onChange={switchMask}/>
                                        <span className="text-[0.8125rem]" onClick={switchMask}>Show password</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-center w-full">
                            <button type="submit" disabled={loading} className={`w-full lg:w-96 px-2 py-3 rounded-lg text-sm transition-colors ${loading ? "bg-gray-200" : "bg-blue-800 hover:bg-blue-700 text-white"}`}>Sign up</button>
                        </div>
                    </div>
                </form>
                <div className="absolute bottom-6 w-full text-center">
                    <p className="text-gray-600 text-[0.8125rem]">Already have an account? <NavLink to="/auth/log-in" className="text-black underline">Sign in</NavLink> here!</p>
                </div>
            </div>
            <div className="hidden h-full lg:block lg:col-span-1">
            </div>
        </>
    )
}