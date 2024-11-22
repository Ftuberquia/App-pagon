import './Login.scss';
import React, { useState } from 'react';

const LoginPage = () => {
    const [showEmailTooltip, setShowEmailTooltip] = useState(false);
    const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);
    const [alertMessage, setAlertMessage] = useState(''); // Estado para el mensaje de alerta
    const [alertType, setAlertType] = useState(''); // Estado para el tipo de alerta (error, éxito, etc.)

    const handleLogin = (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        if (!email || !password) {
            setAlertMessage('Por favor, completa todos los campos.');
            setAlertType('error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setAlertMessage('Por favor, ingresa un correo electrónico válido.');
            setAlertType('error');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find((u) => u.email === email && u.password === password);

        if (!user) {
            setAlertMessage('Correo o contraseña incorrectos. Intenta nuevamente.');
            setAlertType('error');
            return;
        }

        localStorage.setItem('authUser', JSON.stringify(user));
        setAlertMessage('Inicio de sesión exitoso');
        setAlertType('success');
        setTimeout(() => {
            window.location.href = '/home';
        }, 1000); // Redirigir después de un segundo
    };

    return (
        <div className="login-page">
            <h1>Iniciar Sesión</h1>

            {/* Alerta */}
            {alertMessage && (
                <div className={`alert ${alertType}`}>
                    {alertMessage}
                </div>
            )}

            <form className="login-form" onSubmit={handleLogin}>
                <div className="form-group" style={{ position: 'relative' }}>
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Ingresa tu correo electrónico"
                        onFocus={() => setShowEmailTooltip(true)}
                        onBlur={() => setShowEmailTooltip(false)}
                    />
                    {showEmailTooltip && (
                        <div className="tooltip">
                            El correo debe tener un formato válido, por ejemplo: usuario@dominio.com
                        </div>
                    )}
                </div>

                <div className="form-group" style={{ position: 'relative' }}>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Ingresa tu contraseña"
                        onFocus={() => setShowPasswordTooltip(true)}
                        onBlur={() => setShowPasswordTooltip(false)}
                    />
                    {showPasswordTooltip && (
                        <div className="tooltip">
                            La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, un número y un símbolo.
                        </div>
                    )}
                </div>

                <button type="submit" className="btn-submit">
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
