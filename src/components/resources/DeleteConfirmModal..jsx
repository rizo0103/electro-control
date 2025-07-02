import React from "react";
import "./DeleteConfirmModal..css";

export default function DeleteConfirmModal({ onClose, onConfirm }) {
    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h2>Удаление записи</h2>
                <p>Вы уверены, что хотите удалить эту запись? Это действие нельзя отменить.</p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <button className="delete-btn" onClick={onConfirm}>Удалить</button>
                    <button className="cancel-btn" onClick={onClose}>Отмена</button>
                </div>
            </div>
        </div>
    );
}
