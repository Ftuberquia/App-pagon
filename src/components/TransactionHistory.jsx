import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

const TransactionHistory = ({ userId, setTotalRecargas }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalRecargas, setLocalTotalRecargas] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal cerrado por defecto

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
                setIsModalOpen(true); // Abre el modal después de cargar los datos
            } catch (error) {
                console.error('Error al obtener las transacciones', error);
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [userId, setTotalRecargas]);

    // const handleOverlayClick = (e) => {
    //     if (e.target === e.currentTarget) {
    //         setIsModalOpen(false);  // Cierra el modal si se hace clic fuera de él
    //     }
    // };

    const closeModal = () => {
        setIsModalOpen(false);  // Cierra el modal al hacer clic en el botón de cierre
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
        isModalOpen && (
            <div className="modal-overlay" >
                <div className="modal">
                    {/* Botón de cerrar en la parte superior */}
                    <button className="close-btn" onClick={closeModal}>X</button>

                    <h2 className="header">Historial de Transacciones</h2>
                    <p>Total Recarga: ${totalRecargas}</p>

                    {/* Tabla de transacciones */}
                    <table className="table">
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

                    {/* Gráfico */}
                    <Line data={chartData} />

                    {/* Botón de cerrar en la parte inferior */}
                    <button className="close-btn-bottom" onClick={closeModal}>Cerrar</button>
                </div>
            </div>
        )
    );
};

export default TransactionHistory;
