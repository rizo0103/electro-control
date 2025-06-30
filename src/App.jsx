import React, { useState, useEffect } from "react";
import MonthlyTable from "./components/MonthlyTable";
import AddEntryModal from "./components/AddEntryModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal.";
import "./App.css";

export default function App() {
    const [entries, setEntries] = useState([]);
    const [pricePerKWh, setPricePerKWh] = useState(3.21);
    const [showModal, setShowModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);

    // ✅ загрузка из localStorage при старте
    useEffect(() => {
        const savedEntries = localStorage.getItem("electricity-entries");
        if (savedEntries) {
            setEntries(JSON.parse(savedEntries));
        }

        const savedPrice = localStorage.getItem("electricity-price");
        if (savedPrice) {
            setPricePerKWh(parseFloat(savedPrice));
        }
    }, []);

    const addEntry = (entry) => {
        setEntries((prev) => {
            const updated = [...prev, entry];
            localStorage.setItem("electricity-entries", JSON.stringify(updated));
            localStorage.setItem("electricity-price", pricePerKWh);

            return updated;
        });
    };

    const confirmDelete = () => {
        setEntries((prev) => {
            const updated = prev.filter((_, i) => i !== deleteIndex);
            localStorage.setItem("electricity-entries", JSON.stringify(updated));
            localStorage.setItem("electricity-price", pricePerKWh);
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
        <div className="app-container">
            <h1>💡 Electricity Control</h1>
            <div className="price-input">
                <label>Цена за кВт·ч:</label>
                <input type="number" value={pricePerKWh} onChange={(e) => setPricePerKWh(parseFloat(e.target.value))} step="0.01" /> c
            </div>

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
                    pricePerKWh={pricePerKWh}
                />
            )}

            {deleteIndex !== null && (
                <DeleteConfirmModal
                    onClose={() => setDeleteIndex(null)}
                    onConfirm={confirmDelete}
                />
            )}
        </div>
    );
}
