import React, { useState } from 'react';
import './Register.scss';

const Register = () => {
    const [showNameTooltip, setShowNameTooltip] = useState(false);
    const [showEmailTooltip, setShowEmailTooltip] = useState(false);
    const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        // Obtén los valores del formulario
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Validar que no haya campos vacíos
        if (!name || !email || !password) {
            setAlertMessage('Por favor, completa todos los campos.');
            setAlertType('error');
            return;
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setAlertMessage('Por favor, ingresa un correo electrónico válido.');
            setAlertType('error');
            return;
        }

        // Validar requisitos de la contraseña
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setAlertMessage('La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, un número y un símbolo.');
            setAlertType('error');
            return;
        }

        // Enviar los datos al backend
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const result = await response.json();

            if (!response.ok) {
                setAlertMessage(result.message);
                setAlertType('error');
                return;
            }

            setAlertMessage('Registro exitoso. Ahora puedes iniciar sesión.');
            setAlertType('success');
            window.location.href = '/login'; // Redirigir a login
        } catch (error) {
            setAlertMessage('Error al registrar el usuario.');
            setAlertType('error');
        }
    };

    return (
        <div className="register-page">
            <h1>Registrarse</h1>

            {/* Alerta */}
            {alertMessage && (
                <div className={`alert ${alertType}`}>
                    {alertMessage}
                </div>
            )}

            <form className="register-form" onSubmit={handleRegister}>
                <div className="form-group" style={{ position: 'relative' }}>
                    <label htmlFor="name">Nombre Completo</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Ingresa tu nombre completo"
                        onFocus={() => setShowNameTooltip(true)}
                        onBlur={() => setShowNameTooltip(false)}
                    />
                    {showNameTooltip && (
                        <div className="tooltip">
                            Ingresa tu nombre completo tal como aparece en tu documento oficial.
                        </div>
                    )}
                </div>

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
                        placeholder="Crea una contraseña"
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
                    Registrarse
                </button>
            </form>
        </div>
    );
};

export default Register;
