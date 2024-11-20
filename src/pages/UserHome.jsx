import React from 'react';
import './UserHome.scss'; // Asegúrate de crear estilos personalizados

const UserHome = () => {
    // Obtener el usuario autenticado desde localStorage
    const authUser = JSON.parse(localStorage.getItem('authUser'));

    const handleLogout = () => {
        // Elimina al usuario autenticado de localStorage
        localStorage.removeItem('authUser');
        alert('Has cerrado sesión.');
        window.location.href = '/login'; // Redirigir a la página de inicio de sesión
    };

    if (!authUser) {
        alert('Por favor, inicia sesión primero.');
        window.location.href = '/login';
        return null; // Evita que se renderice si no hay un usuario autenticado
    }

    return (
        <div className="container">
            <div className="Nav">
                Inicio || {authUser.name} || Ayuda
            </div>
            <hr />
            <div className="title">
                <h1>Bienvenido a tu Menú</h1>
                <p>{authUser.email}</p>
            </div>
            <h4 className="message2">Realizar pagos</h4>
            <h4 className="message1">Historial de transacciones</h4>
            <h4 className="message1">Configuración de cuenta</h4>
            <h4 className="message">Mensajes noticias</h4>
            <h4 className="message">Mensajes promociones</h4>
            <h4 className="message3">Ayuda</h4>
            <h4 className="message6" onClick={handleLogout}>
                Cerrar sesión
            </h4>
            <h5>paGon marca registrada</h5>
        </div>
    );
};

export default UserHome;
