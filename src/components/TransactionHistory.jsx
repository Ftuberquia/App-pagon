import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import './TransactionHistory.scss'; // Importa los estilos SCSS

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const TransactionHistory = ({ userId, setTotalRecargas, closeModal }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalRecargas, setLocalTotalRecargas] = useState(0);
    // const [isModalOpen, setIsModalOpen] = useState(true); // Modal abierto por defecto
    // const navigate = useNavigate(); // Hook para redirección

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/transactions/${userId}`);
                const data = response.data.transactions;
                const recargas = data.filter((t) => t.type === 'deposit');
                const total = recargas.reduce((sum, t) => sum + t.amount, 0);
                setTransactions(data);
                setLocalTotalRecargas(total);
                setTotalRecargas(total);
                setLoading(false); // Datos cargados, setea loading en false
            } catch (error) {
                console.error('Error al obtener las transacciones', error);
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [userId, setTotalRecargas]);


    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget || e.target.classList.contains('close-btn')) {
            closeModal(); // Llama al cierre si es un clic en el overlay o en el botón
        }
    };

    if (loading) return <div>Cargando...</div>; // Muestra un mensaje mientras carga


    const chartData = {
        labels: transactions.map((t) => `${new Date(t.createdAt).toLocaleDateString()} ${new Date(t.createdAt).toLocaleTimeString()}`),
        datasets: [
            {
                label: 'Monto de Transacciones',
                data: transactions.map((t) => t.amount),
                borderColor: '#00b50f',
                backgroundColor: 'rgba(0, 181, 15, 0.2)',
                borderWidth: 1,
            }
        ]
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-container">
                {/* Botón de cerrar */}
                <button className="close-btn" onClick={closeModal}>X</button>

                {/* Encabezado */}
                <h2 className="header">Historial de Transacciones</h2>
                <p className="balance">Saldo Total: <span>${totalRecargas}</span></p>

                {/* Gráfico */}
                <div className="chart-container">
                    <h3 className="chart-title">Resumen de Movimientos</h3>
                    <Line data={chartData} />

                </div>
                {/* Tabla de transacciones */}
                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Monto</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((t) => (
                            <tr key={t._id}>
                                <td>{t.type === 'deposit' ? 'Recarga' : 'Pago'}</td>
                                <td>${t.amount}</td>
                                <td>{new Date(t.createdAt).toLocaleDateString()}</td>
                                <td>{new Date(t.createdAt).toLocaleTimeString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );

};

export default TransactionHistory;
