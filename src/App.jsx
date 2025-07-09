import React, { useEffect, useState } from "react";
import "./App.css";
import Main from "./components/mainPage/Main";
import Sidebar from "./components/resources/Sidebar";
import AuthCard from "./components/auth/AuthCard";

export default function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState("");

    useEffect(() => {
        if (window.localStorage.getItem("token")) {
            const savedToken = window.localStorage.getItem("token");
            
            const fetchUserData = async () => {
                const apiUrl = import.meta.env.VITE_API_URL;

                const response = await fetch(`${apiUrl}/get-user-data`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${savedToken}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                    console.log("data:", data);
                } else {
                    console.error("Error occured");
                }
            };

            fetchUserData();
        }
    }, []);


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

            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onLogin={handleAuthClick} user={user} />
            <Main />
                
        </div>
    );
}
