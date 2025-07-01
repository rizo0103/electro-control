import React, { useState } from "react";
import "./AddEntryModal.css"; // Assuming you have some styles in this file

export default function AddEntryModal({ onClose, onSave, lastMeter }) {
    const [date, setDate] = useState(new Date().toISOString().slice(0,10));
    const [meter, setMeter] = useState(0);
    const [receiptNumber, setReceiptNumber] = useState("");
    const [pricePerKWh, setPricePerKWh] = useState(localStorage.getItem("electricity-price") || 3.21); // Default price if not provided
    const [sum, setSum] = useState(0);
//   const [receiptImage, setReceiptImage] = useState(null);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onloadend = () => setReceiptImage(reader.result);
//     reader.readAsDataURL(file);
//   };

    const handleSave = () => {
        const delta = meter - lastMeter;
        const sum = delta * pricePerKWh;
        onSave({
            date,
            meter,
            sum,
            //   receiptImage,
            receiptNumber,
            pricePerKWh: parseFloat(pricePerKWh.toFixed(2)) // Ensure price is a number with 2 decimal places,
        });

        localStorage.setItem("electricity-price", pricePerKWh); // Save price to localStorage
    };

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h2> Добавить новую запись </h2>
                <div>
                    <label> Дата: </label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} />
                </div>
                <div>
                    <label> Показатель счётчика: </label>
                    <input type="number" value={meter} onChange={e => setMeter(parseInt(e.target.value))} />
                </div>
                <div>
                    <label> Цена за кВт·ч: </label>
                    <input type="number" value={pricePerKWh} onChange={(e) => setPricePerKWh(parseFloat(e.target.value))} step="0.01" />
                </div>
                <div>
                    <label> Оплаченная сумма: </label>
                    <input type="number" value={sum} onChange={(e) => setSum(e.target.value)} />
                </div>
                <div>
                    <label> Номер чека: </label>
                    <input type="text" value={receiptNumber} onChange={e => setReceiptNumber(e.target.value)} />
                </div>
                {/* <div>
                <label>Receipt photo: </label>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                </div> */}
                <button className="save-btn" onClick={handleSave}>
                    Сохранить
                </button>
                <button className="cancel-btn" onClick={onClose}>
                    Отмена
                </button>
            </div>
        </div>
    );
}
