import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PaymentModal from '../components/PaymentModal';
import TransactionHistory from '../components/TransactionHistory';
import './UserHome.scss';

const UserHome = () => {
    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [totalRecargas, setTotalRecargas] = useState(0);
    const [loading, setLoading] = useState(true);

    // Obtener usuario autenticado desde localStorage
    const authUser = JSON.parse(localStorage.getItem('authUser'));
    const userId = authUser?.id; // Obtener el ID del usuario autenticado

    // Verificar si el usuario está autenticado
    useEffect(() => {
        if (!authUser) {
            setAlertMessage('Por favor, inicia sesión primero.');
            setAlertType('error');
            navigate('/login');
        } else {
            console.log('Usuario autenticado:', authUser);
        }
    }, [authUser, navigate]);

    // Función para obtener y calcular transacciones
    const fetchTransactions = async () => {
        if (!userId) {
            console.error('El userId no está disponible');
            return;
        }

        try {
            console.log('Solicitando transacciones para el userId:', userId);
            const response = await axios.get(`http://localhost:5000/api/transactions/${userId}`);
            const data = response.data.transactions;

            // Filtrar las transacciones de tipo 'deposit' y calcular el total
            const recargas = data.filter((t) => t.type === 'deposit');
            const total = recargas.reduce((sum, t) => sum + t.amount, 0);

            console.log('Recargas filtradas:', recargas);
            console.log('Total calculado de recargas:', total);

            setTransactions(data); // Guardar todas las transacciones
            setTotalRecargas(total); // Actualizar el total de recargas
        } catch (error) {
            console.error('Error al obtener las transacciones:', error.response?.data || error.message);
        } finally {
            setLoading(false); // Finalizar la carga
        }
    };

    // Ejecutar fetchTransactions al cargar el componente
    useEffect(() => {
        fetchTransactions();
    }, []);

    const handleLogout = () => {
        setIsLoggingOut(true);
        setAlertMessage('Cerrando sesión...');
        setAlertType('info');

        setTimeout(() => {
            localStorage.removeItem('authUser');
            setAlertMessage('Has cerrado sesión.');
            setAlertType('success');

            setTimeout(() => {
                navigate('/');
            }, 1000);
        }, 2000);
    };

    // Actualizar transacciones después de cerrar el modal
    const handleModalClose = () => {
        setIsTransactionModalOpen(false);
        fetchTransactions(); // Sincronizar después de posibles cambios en el modal
    };

    if (!authUser) return null;

    return (
        <div className="container">
            {alertMessage && (
                <div className={`alert ${alertType}`}>
                    {alertMessage}
                </div>
            )}

            {!isLoggingOut && (
                <>
                    <div className="Nav">
                        <span> || {authUser.name} || </span>
                    </div>
                    <hr />

                    <div className="title">
                        <h1>Bienvenido a tu Menú</h1>
                        <p>{authUser.email}</p>
                        {loading ? (
                            <p>Cargando saldo...</p>
                        ) : (
                            <p>Saldo Total: ${totalRecargas}</p>
                        )}
                    </div>

                    <h4 onClick={() => setIsPaymentModalOpen(true)}>Realizar pagos o recargas</h4>
                    <h4 onClick={() => setIsTransactionModalOpen(true)}>Historial de transacciones</h4>
                    <h4>Configuración de cuenta</h4>
                    <h4>Mensajes y noticias</h4>
                    <h4>Mensajes y promociones</h4>
                    <h4>Ayuda</h4>
                    <h4 className="message6" onClick={handleLogout}>
                        Cerrar sesión
                    </h4>

                    <PaymentModal
                        isOpen={isPaymentModalOpen}
                        closeModal={() => setIsPaymentModalOpen(false)}
                        userId={authUser.id}
                    />
                    {isTransactionModalOpen && (
                        <TransactionHistory
                            userId={authUser.id}
                            closeModal={handleModalClose}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default UserHome;
