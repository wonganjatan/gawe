import { Link, useNavigate } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext"
import { useForm } from "react-hook-form"
import type { SignUpForm } from "../../types/Auth"

export default function SignUp() {
    const { signUp } = useAuthContext()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        watch, 
        setError,
        formState: { errors, isSubmitting }
    } = useForm<SignUpForm>()

    const onSubmit = async (data: SignUpForm) => {
        try {
            const { confirmPassword, ...input } = data
            await signUp(input)
            navigate("/login")  
        } catch (error) {
            setError("root", { message: "Sign up failed. Please try again" })
        }
    }
    
    return (
        <main className="flex flex-col min-h-screen w-full bg-gray-50">
            <div className="flex flex-col items-center justify-center py-12 px-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <div className="flex gap-3">
                            <div className="flex flex-col flex-1">
                                <label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-1">First Name:</label>
                                <input 
                                    type="text" 
                                    id="firstName"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                                    placeholder="John"
                                    pattern="[a-zA-Z]+"
                                    {...register("firstName", { 
                                        required: "First name is required",
                                        pattern: {
                                            value: /[a-zA-Z]+/,
                                            message: "Enter your valid first name"
                                        }
                                    })}
                                />
                                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                            </div>
                            <div className="flex flex-col flex-1">
                                <label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input 
                                    type="text" 
                                    id="lastName"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                                    placeholder="Doe"
                                    {...register("lastName", { 
                                        required: "Last name is required",
                                        pattern: {
                                            value: /[a-zA-Z]+/,
                                            message: "Enter your valid last name"
                                        }
                                    })}
                                />
                                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                            </div>
                        </div>
                        
                        <div className="flex gap-3">
                            <div className="flex flex-col">
                                <label htmlFor="username" className="text-sm font-medium text-gray-700 mb-1">Username:</label>
                                <input 
                                    type="text" 
                                    id="username"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                                    placeholder="johndoe123"
                                    {...register("username", {
                                        required: "Username is required"
                                    })}/>
                                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">Email:</label>
                                <input 
                                    type="email" 
                                    id="email"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                                    placeholder="your@email.com"
                                    {...register("email", { 
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+\.\S+$/,
                                            message: "Enter a valid email address"
                                        }
                                    })}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col">
                                <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">Password:</label>
                                <input 
                                    type="password" 
                                    id="password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                                    placeholder="••••••••"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters"
                                        },
                                        pattern: {
                                            value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&()_+\-=[\]{};':"\\|,.<>/?]).+$/,
                                            message: "Password must contain uppercase, lowercase, and special character"
                                        }
                                    })}
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 mb-1">Confirm Password:</label>
                                <input 
                                    type="password" 
                                    id="confirmPassword"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                                    placeholder="••••••••"
                                    {...register("confirmPassword", {
                                        required: "Confirm your password",
                                        validate: (value) => value === watch("password") || "Password do not match"
                                    })}
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                            </div>
                            {errors.root && <p className="text-red-500 text-sm text-center">{errors.root.message}</p>}
                        </div>

                        <button 
                            type='submit'
                            disabled={isSubmitting}
                            className='w-full bg-blue-500 hover:bg-blue-600 cursor-pointer transition-colors text-white font-semibold py-2 rounded-lg mt-2'>
                            {isSubmitting ? "Signing up..." : "Sign Up"}
                        </button>
                        <p className="text-center text-sm text-gray-500">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </main>
    )
}