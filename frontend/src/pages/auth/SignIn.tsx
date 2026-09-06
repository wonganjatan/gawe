import { useForm } from "react-hook-form"
import { useAuthContext } from "../../context/AuthContext"
import type { SignInForm } from "../../types/Auth"
import { Link, useNavigate } from "react-router-dom"

export default function SignIn() {
    const { signIn } = useAuthContext()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<SignInForm>()

    const onSubmit = async (data: SignInForm) => {
        try {
            await signIn(data.email, data.password)
            navigate("/")
        } catch (error) {
            setError("root", { message: "Sign in failed. Please try again" })
        }
    }
    
    return (
        <main className="flex flex-col border w-xl border-black p-8 rounded-lg shadow-2xl">
            <h1 className="font-bold pb-8">Sign in to Venue Vendor</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="email">Email:</label>
                    <input 
                        id="email"
                        className="border border-black rounded-sm p-1"
                        type="email" 
                        placeholder="Email" 
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+\.\S+$/,
                                message: "Enter a valid email address"
                            }
                        })}
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
                <div  className="flex flex-col">
                    <label htmlFor="password">Password:</label>
                    <input 
                        id="password"
                        className="border border-black rounded-sm p-1"
                        type="password" 
                        placeholder="Password" 
                        {...register("password", {
                            required: "Password is required"
                        })}
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
                {errors.root && <p className="text-red-500">{errors.root.message}</p>}

                <div className="flex items-center justify-center pt-4">
                    <button type="submit" className="flex-1 text-white border border-blue-500 rounded-xl px-2 py-1 bg-blue-500 hover:bg-blue-600 transition-colors">
                        {isSubmitting ? "Signing In..." : "Sign In"}
                    </button>
                </div>
            </form>
            <div className="pt-2 flex flex-col items-center justify-between space-y-8">
                <Link to="/register" className="w-full flex justify-center border border-blue-500 rounded-xl hover:bg-gray-200 px-2 py-1">Sign Up</Link>
            </div>
        </main>
    )
}