import React, { useState } from "react";
import "./AddEntryModal.css"; // Assuming you have some styles in this file

export default function AddEntryModal({ onClose, onSave, lastMeter, pricePerKWh }) {
    const [date, setDate] = useState(new Date().toISOString().slice(0,10));
    const [meter, setMeter] = useState(0);
    const [receiptNumber, setReceiptNumber] = useState("");
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
            receiptNumber
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h2>Add New Entry</h2>
                <div>
                    <label>Date: </label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} />
                </div>
                <div>
                    <label>Meter: </label>
                    <input type="number" value={meter} onChange={e => setMeter(parseInt(e.target.value))} />
                </div>
                <div>
                    <label>Receipt #: </label>
                    <input type="text" value={receiptNumber} onChange={e => setReceiptNumber(e.target.value)} />
                </div>
                {/* <div>
                <label>Receipt photo: </label>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                </div> */}
                <button className="save-btn" onClick={handleSave}>
                    Save
                </button>
                <button className="cancel-btn" onClick={onClose}>
                    Cancel
                </button>
            </div>
        </div>
    );
}
