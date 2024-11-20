import './Login.scss';
import React, { useState } from 'react';

const LoginPage = () => {
    const [showEmailTooltip, setShowEmailTooltip] = useState(false);
    const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();

        // Obtener valores de los inputs
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Validar que los campos no estén vacíos
        if (!email || !password) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        // Verificar las credenciales con los datos almacenados en localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find((u) => u.email === email && u.password === password);

        if (!user) {
            alert('Correo o contraseña incorrectos. Intenta nuevamente.');
            return;
        }

        // Almacenar el usuario autenticado en localStorage
        localStorage.setItem('authUser', JSON.stringify(user));
        alert('Inicio de sesión exitoso.');
        window.location.href = '/home'; // Redirigir a la página privada
    };

    return (
        <div className="login-page">
            <h1>Iniciar Sesión</h1>
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
