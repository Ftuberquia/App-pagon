import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserHome.scss';

const UserHome = () => {
    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const [isLoggingOut, setIsLoggingOut] = useState(false);

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
                    <h4 className="message2">Realizar pagos</h4>
                    <h4 className="message1">Historial de transacciones</h4>
                    <h4 className="message1">Configuración de cuenta</h4>
                    <h4 className="message">Mensajes y noticias</h4>
                    <h4 className="message">Mensajes y promociones</h4>
                    <h4 className="message3">Ayuda</h4>
                    <h4 className="message6" onClick={handleLogout}>
                        Cerrar sesión
                    </h4>
                </>
            )}
        </div>
    );
};

export default UserHome;
