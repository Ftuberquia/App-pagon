import React, { useState } from 'react';
import './Login.scss';

const LoginPage = () => {
    const [showEmailTooltip, setShowEmailTooltip] = useState(false);
    const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const handleLogin = async (e) => {
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

        // Enviar los datos al backend
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (!response.ok) {
                setAlertMessage(result.message);
                setAlertType('error');
                return;
            }

            // Guardar el token y el usuario en el almacenamiento local
            localStorage.setItem('authToken', result.token);
            localStorage.setItem('authUser', JSON.stringify(result.users));

            setAlertMessage('Inicio de sesión exitoso');
            setAlertType('success');
            setTimeout(() => {
                window.location.href = '/home'; // Redirigir a la página de inicio
            }, 1000);
        } catch (error) {
            setAlertMessage('Error al iniciar sesión.');
            setAlertType('error');
        }
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
