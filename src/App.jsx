import React, { useState, useEffect } from "react";
import MonthlyTable from "./components/mainPage/MonthlyTable";
import AddEntryModal from "./components/resources/AddEntryModal";
import DeleteConfirmModal from "./components/resources/DeleteConfirmModal.";
import "./App.css";
import Sidebar from "./components/resources/Sidebar";

export default function App() {
    const [entries, setEntries] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // ✅ загрузка из localStorage при старте
    useEffect(() => {
        const savedEntries = localStorage.getItem("electricity-entries");
        if (savedEntries) {
            setEntries(JSON.parse(savedEntries));
        }
    }, []);

    const addEntry = (entry) => {
        setEntries((prev) => {
            const updated = [...prev, entry];
            localStorage.setItem("electricity-entries", JSON.stringify(updated));

            return updated;
        });
    };

    const confirmDelete = () => {
        setEntries((prev) => {
            const updated = prev.filter((_, i) => i !== deleteIndex);
            localStorage.setItem("electricity-entries", JSON.stringify(updated));
            return updated;
        });
        
        setDeleteIndex(null);
    };


    const handleDelete = (index) => {
        setDeleteIndex(index);
    };

//   const confirmDelete = () => {
//     setEntries(entries.filter((_, i) => i !== deleteIndex));
//     setDeleteIndex(null);
//   };

    return (
        <div style={{ display: "flex" }}>
            <button style={{ position: "fixed", top: "1rem", left: "1rem", background: "#2563eb", color: "#fff", padding: "0.6rem 1rem", borderRadius: "0.8rem", border: "none", fontSize: "1.2rem" }} onClick={() => setSidebarOpen(!sidebarOpen)} >
                ☰
            </button>
    
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    
            <main className="app-container" onClick={() => setSidebarOpen(false)}>
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
        </div>
    );
}
