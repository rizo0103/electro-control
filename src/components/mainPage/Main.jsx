import React, { useState, useEffect } from "react";
import Sidebar from "../resources/Sidebar";
import MonthlyTable from "./MonthlyTable";
import AddEntryModal from "../resources/AddEntryModal";
import DeleteConfirmModal from '../resources/DeleteConfirmModal.';

export default function Main() {
    const [entries, setEntries] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);

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
