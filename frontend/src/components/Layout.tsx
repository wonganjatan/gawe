import type React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen flex flex-col justify-between">
            <Navbar/>
            <main>{children}</main>
            <Footer/>
        </div>
    )
}