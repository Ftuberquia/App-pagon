import React from 'react';
import './Register.scss';

const Register = () => {
    const [showNameTooltip, setShowNameTooltip] = React.useState(false);
    const [showEmailTooltip, setShowEmailTooltip] = React.useState(false);
    const [showPasswordTooltip, setShowPasswordTooltip] = React.useState(false);

    const handleRegister = (e) => {
        e.preventDefault();

        // Obtén los valores del formulario
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Validar que no haya campos vacíos
        if (!name || !email || !password) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        // Validar requisitos de la contraseña
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            alert(
                'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, un número y un símbolo.'
            );
            return;
        }

        // Verificar si el correo ya está registrado
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some((user) => user.email === email)) {
            alert('Este correo ya está registrado. Intenta iniciar sesión.');
            return;
        }

        // Guardar el nuevo usuario
        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));

        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        window.location.href = '/login'; // Redirige a la página de inicio de sesión
    };

    return (
        <div className="register-page">
            <h1>Registrarse</h1>
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
