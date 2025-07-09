import React, { useEffect, useRef } from "react";
import "./Sidebar.css";

export default function Sidebar({ user, onLogin, onLogout, isOpen, onClose }) {
    const drawerRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && drawerRef.current && !drawerRef.current.contains(event.target)) {
                onClose();
            }
        };
        
        document.addEventListener("mousedown", handleClickOutside);
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);    
  
    return (
        <>
            <div className={`sidebar-overlay ${isOpen ? "show" : ""}`} onClick={onClose}></div>
                <div className={`sidebar-drawer ${isOpen ? "open" : ""}`}>
                    <h2 className="sidebar-title">Меню</h2>

                    {!user ? (
                        <button className="sidebar-btn" onClick={onLogin}>
                            🔑 Войти
                        </button>
                    ) : (
                        <div className="sidebar-user">
                            {user.avatarUrl && <img
                                src={user.avatarUrl || "https://via.placeholder.com/50"}
                                alt="avatar"
                                className="sidebar-avatar"
                            />}
                            <p className="sidebar-username">{user.username}</p>
                            <button className="sidebar-btn" onClick={() => alert("Профиль скоро :)")}>
                                👤 Профиль
                            </button>
                            <button className="sidebar-btn logout" onClick={() => { onLogout(); onClose(); }}>
                                🚪 Выйти
                            </button>
                        </div>
                    )}
            </div>
        </>
    );
}
