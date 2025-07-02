import React, { useState } from "react";
import "./App.css";
import Main from "./components/mainPage/Main";
import Sidebar from "./components/resources/Sidebar";
import AuthCard from "./components/auth/AuthCard";

export default function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [auth, setAuth] = useState(false);

    const handleAuthClick = () => {
        setAuth(true);
    }

    if (auth) {
        return <AuthCard />;
    }

    return (
        <div>
            <button style={{ position: "fixed", top: "1rem", left: "1rem", background: "#2563eb", color: "#fff", padding: "0.6rem 1rem", borderRadius: "0.8rem", border: "none", fontSize: "1.2rem" }} onClick={() => setSidebarOpen(!sidebarOpen)} >
                ☰
            </button>

            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onLogin={handleAuthClick} />
            <Main />
                
        </div>
    );
}
