import React, { useState } from "react";
import "./AuthCard.css";

export default function AuthCard() {
    const [isFlipped, setIsFlipped] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");

    const register = async (username, password, email, fullName) => {
        const apiUrl = import.meta.env.VITE_API_URL;

        try {
            const response = await fetch(`${apiUrl}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                    email,
                    fullName,
                }),
            });

            if (response.ok) {
                const data = await response.json();

                if (data) {
                    login(username, password);
                }

            }
        } catch (e) {
            console.error(e);
        }
    }

    const login = async (username, password) => {
        const apiUrl = import.meta.env.VITE_API_URL;

        try {
            const response = await fetch(`${apiUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (response.ok) {
                const data = await response.json();

                window.localStorage.setItem("token", data.token);
                window.location.reload();
            } else {
                console.error("Ошибка входа:", response.statusText);
            }            
        } catch (error) {
            console.error("Ошибка входа:", error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFlipped) {
            // Registration logic
            if (password !== confirmPassword) {
                alert("Пароли не совпадают!");
                return;
            }
            // Here you would typically send the registration data to your server
            register(username, password, email, fullName);
        } else {
            // Login logic
            // Here you would typically send the login data to your server
            login(username, password);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="auth-container">
            <div className={`auth-card ${isFlipped ? "flipped" : ""}`}>
                {/* Front — вход */}
                <div className="auth-face auth-front">
                    <h2>Вход</h2>
                    <input type="text" placeholder="Имя пользователя" value = {username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder="Пароль" value = {password} onChange={(e) => setPassword(e.target.value)} />
                    <button> Войти </button>
                    <p>
                        Нет аккаунта ? {" "}
                        <span onClick={() => setIsFlipped(true)}>Зарегистрироваться</span>
                    </p>
                    <p>
                        <span onClick={() => location.reload()}> Обратно в главную страницу </span>
                    </p>
                </div>

                {/* Back — регистрация */}
                <div className="auth-face auth-back">
                    <h2>Регистрация</h2>
                    <input type="text" placeholder="Имя пользователя" value = {username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="email" placeholder="Электронная почта" value = {email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="text" placeholder="Полное имя" value = {fullName} onChange={(e) => setFullName(e.target.value)} />
                    <input type="password" placeholder="Пароль" value = {password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="password" placeholder="Повторите пароль" value = {confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button> Зарегистрироваться </button>
                    <p>
                        Уже есть аккаунт ?{" "}
                        <span onClick={() => setIsFlipped(false)}>Войти</span>
                    </p>
                    <p>
                        <span onClick={() => location.reload()}> Обратно в главную страницу </span>
                    </p>
                </div>
            </div>
        </form>
    );
}
