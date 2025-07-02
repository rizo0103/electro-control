import React, { useState } from "react";
import "./AuthCard.css";

export default function AuthCard() {
    const [isFlipped, setIsFlipped] = useState(false);

  return (
        <div className="auth-container">
            <div className={`auth-card ${isFlipped ? "flipped" : ""}`}>
                {/* Front — вход */}
                <div className="auth-face auth-front">
                    <h2>Вход</h2>
                    <input type="text" placeholder="Имя пользователя" />
                    <input type="password" placeholder="Пароль" />
                    <button>Войти</button>
                    <p>
                        Нет аккаунта?{" "}
                        <span onClick={() => setIsFlipped(true)}>Зарегистрироваться</span>
                    </p>
                </div>

                {/* Back — регистрация */}
                <div className="auth-face auth-back">
                    <h2>Регистрация</h2>
                    <input type="text" placeholder="Имя пользователя" />
                    <input type="email" placeholder="Электронная почта" />
                    <input type="password" placeholder="Пароль" />
                    <input type="password" placeholder="Повторите пароль" />
                    <button>Зарегистрироваться</button>
                    <p>
                        Уже есть аккаунт?{" "}
                        <span onClick={() => setIsFlipped(false)}>Войти</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
