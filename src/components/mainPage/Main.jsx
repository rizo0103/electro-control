import React, { useState, useEffect } from "react";
import MonthlyTable from "./MonthlyTable";
import AddEntryModal from "../resources/AddEntryModal";
import DeleteConfirmModal from "../resources/DeleteConfirmModal.";

export default function Main() {
    const [entries, setEntries] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");

    // ✅ Загрузка данных с сервера
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${apiUrl}/get-records`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    setEntries(data);
                } else {
                    console.error("Не удалось загрузить записи");
                }
            } catch (err) {
                console.error("Ошибка сети", err);
            }
        };

        if (token) {
            fetchData();
        }
    }, [token, apiUrl]);

    // ✅ Добавление записи
    const addEntry = async (entry) => {
        if (!token) {
            alert("Нет токена авторизации. Зарегистрируйтесь или войдите в систему.");
            return;
        }

        try {
            const res = await fetch(`${apiUrl}/add-record`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(entry)
            });

            if (res.ok) {
                setEntries((prev) => [...prev, entry]);
            } else {
                console.error("Ошибка при добавлении записи");
            }
        } catch (err) {
            console.error("Ошибка сети", err);
        }
    };

    // ✅ Удаление локально — сервер пока не трогаем
    const confirmDelete = async () => {
        try {
            const res = await fetch(`${apiUrl}/delete-record/${deleteIndex}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (res.ok) {
                setEntries(prev => prev.filter((_, i) => i !== deleteIndex));
            } else {
                console.error("Ошибка при удалении");
            }
        } catch (err) {
            console.error("Ошибка сети", err);
        }

        setDeleteIndex(null);
    };


    const handleDelete = (index) => {
        setDeleteIndex(index);
    };

    return (
        <main className="app-container">
            <h1>💡 Electricity Control</h1>

            <MonthlyTable entries={entries} onDelete={handleDelete} />

            <button className="add-button" onClick={() => setShowModal(true)}>
                + Добавить запись
            </button>

            {showModal && (
                <AddEntryModal
                    onClose={() => setShowModal(false)}
                    onSave={(entry) => {
                        addEntry(entry);
                        setShowModal(false);
                    }}
                    lastMeter={entries.length ? entries[entries.length - 1].meter : 0}
                />
            )}

            {deleteIndex !== null && (
                <DeleteConfirmModal
                    onClose={() => setDeleteIndex(null)}
                    onConfirm={confirmDelete}
                />
            )}
        </main>
    );
}
