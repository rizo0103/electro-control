import React from "react";
import "./MonthlyTable.css";

export default function MonthlyTable({ entries, onDelete }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Дата</th>
                    <th>Счётчик</th>
                    <th>Сумма</th>
                    <th>Оплаченная сумма</th>
                    <th>+/-</th>
                    {/* <th>Чек</th> */}
                    <th>Номер чека</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {entries.map((e, i) => (
                    <tr key={i}>
                        <td>{e.date}</td>
                        <td>{e.meter}</td>
                        <td>{e.sum.toFixed(2)} c</td>
                        <td>{e.payed || "N/A"}</td>
                        <td> {+e.payed - e.sum.toFixed(2) || "N/A"} </td>
                        {/* <td style={{ textAlign: "center" }}>{e.receiptImage ? "✅" : "❌"}</td> */}
                        <td>{e.receiptNumber}</td>
                        <td>
                            <button className="delete-btn" onClick={() => onDelete(i)} title="Удалить">
                                🗑
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
