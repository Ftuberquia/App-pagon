import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const TransactionHistory = ({ userId }) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            const response = await axios.get(`/api/transactions/${userId}`);
            setTransactions(response.data);
        };
        fetchTransactions();
    }, [userId]);

    const data = {
        labels: transactions.map((t) => new Date(t.createdAt).toLocaleDateString()),
        datasets: [
            {
                label: 'Monto de Transacciones',
                data: transactions.map((t) => t.amount),
                fill: false,
                borderColor: '#00b50f',
            },
        ],
    };

    return (
        <div>
            <h2>Historial de Transacciones</h2>
            <ul>
                {transactions.map((t) => (
                    <li key={t._id}>
                        {t.type === 'deposit' ? 'Recarga' : 'Pago'} de ${t.amount} - {new Date(t.createdAt).toLocaleDateString()}
                    </li>
                ))}
            </ul>
            <Line data={data} />
        </div>
    );
};

export default TransactionHistory;
