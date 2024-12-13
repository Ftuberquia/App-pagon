import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

    // Obtener el usuario autenticado desde localStorage
    const authUser = JSON.parse(localStorage.getItem('authUser'));

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!authUser) {
                setAlertMessage('Por favor, inicia sesión primero.');
                setAlertType('error');
                navigate('/login');
            }
        }, 1500);

        // Cleanup function
        return () => clearTimeout(timer);
    }, [authUser, navigate]);

    const handleLogout = () => {
        setIsLoggingOut(true);
        setAlertMessage('Cerrando sesión...');
        setAlertType('info');

        const logoutTimer = setTimeout(() => {
            localStorage.removeItem('authUser');
            setAlertMessage('Has cerrado sesión.');
            setAlertType('success');

            const redirectTimer = setTimeout(() => {
                navigate('/');
            }, 1000);

            return () => clearTimeout(redirectTimer);
        }, 2000);

        return () => clearTimeout(logoutTimer);
    };

    if (!authUser) return null;

    return (
        <div className="container">
            {/* Mensaje de alerta */}
            {alertMessage && (
                <div className={`alert ${alertType}`}>
                    {alertMessage}
                </div>
            )}

            {/* Contenido principal */}
            {!isLoggingOut && (
                <>
                    {/* Menú de navegación */}
                    <div className="Nav">
                        {/* <button className="nav-button" onClick={() => navigate('/home')}>
                            Inicio
                        </button> */}
                        <span> || {authUser.name} || </span>
                        {/* <button className="nav-button" onClick={() => navigate('/help')}>
                            Ayuda
                        </button> */}
                    </div>
                    <hr />
                    {/* Contenido principal */}

                    <div className="title">
                        <h1>Bienvenido a tu Menú</h1>
                        <p>{authUser.email}</p>
                    </div>
                    <h4 onClick={() => setIsPaymentModalOpen(true)}>Realizar pagos y recargas</h4>
                    <h4 onClick={() => setIsTransactionModalOpen(true)}>Historial de transacciones</h4>
                    <h4 >Configuración de cuenta</h4>
                    <h4 >Mensajes y noticias</h4>
                    <h4 >Mensajes y promociones</h4>
                    <h4 >Ayuda</h4>
                    <h4 className="message6" onClick={handleLogout}>
                        Cerrar sesión
                    </h4>
                    {/* Modales */}
                    <PaymentModal
                        isOpen={isPaymentModalOpen}
                        closeModal={() => setIsPaymentModalOpen(false)}
                        userId={authUser.id}
                    />
                    {isTransactionModalOpen && (
                        <div className="modal">
                            <TransactionHistory userId={authUser.id} />
                            <button onClick={() => setIsTransactionModalOpen(false)}>Cerrar</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default UserHome;
