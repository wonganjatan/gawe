import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function Navbar() {
    const { loggedInUser } = useAuthContext()
    return (
        <nav className="flex items-center justify-between px-8 py-4 bg-indigo-600">
            <h1 className="text-white text-2xl">Gawe</h1>
            {loggedInUser ? (
                <div>
                    <Link to="/">Home</Link>
                </div>
            ) : (
                <div className="flex gap-4">
                    <Link to="/about" className="flex flex-col text-white border-2 border-transparent hover:border-b-red-500 transition-colors duration-300">
                        About
                    </Link>
                    <Link to="/login" className="flex flex-col text-white border-2 border-transparent hover:border-b-yellow-500 transition-colors duration-300">
                        Login
                    </Link>
                    <Link to="/register" className="text-white border-2 border-transparent hover:border-b-green-500 transition-colors duration-300">
                        Sign Up
                    </Link>
                </div>
            )}
            
        </nav>
    )
}