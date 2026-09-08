import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function Sidebar() {
    const { loggedInUser, signOut } = useAuthContext()
    
    return (
        <aside className="w-56 h-screen flex flex-col justify-between bg-indigo-600">
            <div>
                <h1 className="text-white text-2xl font-bold p-4">Gawe</h1>
                <nav className="flex flex-col p-4 gap-1">
                    <Link
                        to="/"
                        className="px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 bg-indigo-700 text-white"
                    >
                        Home
                    </Link>
                </nav>
            </div>
            
            <div className="p-4 border-t border-indigo-500">
                <div className="mb-3">
                    <p className="text-white text-sm font-medium">
                        {loggedInUser?.firstName} {loggedInUser?.lastName}
                    </p>
                    <p className="text-indigo-200 text-xs">{loggedInUser?.email}</p>
                </div>
                <button
                    onClick={signOut}
                    className="text-white text-sm border-2 border-transparent hover:border-b-red-400 transition-colors duration-300 cursor-pointer"
                >
                    Sign Out
                </button>
            </div>
        </aside>
    )
}