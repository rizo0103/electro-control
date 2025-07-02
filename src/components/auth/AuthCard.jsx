import React, { useState } from "react";
import "./AuthCard.css";

export default function AuthCard() {
    const [isFlipped, setIsFlipped] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");

    return (
        <div className="auth-container">
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
        </div>
    );
}
