import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between p-4">
            <h1>Gawe</h1>
            <div>
                <Link to="/">Home</Link>
            </div>
        </nav>
    )
}