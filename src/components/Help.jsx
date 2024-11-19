import React from 'react';
import './Help.scss';

const Help = () => {
    return (
        <div className="help">
            <header className="help__header">
                <h1>Ayuda y Soporte</h1>
                <p>Encuentra respuestas a tus preguntas y aprende a utilizar nuestra aplicación de pagos online.</p>
            </header>
            <section className="help__sections">
                <article className="help__section">
                    <h2>Preguntas Frecuentes (FAQ)</h2>
                    <ul>
                        <li>
                            <strong>¿Cómo realizo un pago?</strong>
                            <p>Selecciona "Pagar" en el menú principal, ingresa los detalles del pago y confirma la transacción.</p>
                        </li>
                        <li>
                            <strong>¿Es seguro usar la app para pagos?</strong>
                            <p>Sí, utilizamos tecnologías de encriptación avanzadas para garantizar tu seguridad.</p>
                        </li>
                        <li>
                            <strong>¿Qué hago si mi pago no se procesa?</strong>
                            <p>Verifica los detalles y tu saldo. Si el problema persiste, contacta a soporte.</p>
                        </li>
                    </ul>
                </article>
                <article className="help__section">
                    <h2>Manual de Funcionalidades</h2>
                    <ul>
                        <li><a href="/register">Registro y creación de cuenta</a></li>
                        <li><a href="/payments">Realización de Pagos</a></li>
                        <li><a href="/transactions">Historial de Transacciones</a></li>
                    </ul>
                </article>
                <article className="help__section">
                    <h2>Contacto y Soporte</h2>
                    <p>Accede a nuestro <a href="/support">chat en vivo</a> para asistencia inmediata o envíanos un correo a soporte@pagon.com.</p>
                </article>
                <article className="help__section">
                    <h2>Seguridad y Privacidad</h2>
                    <ul>
                        <li>Protección de Datos: Implementamos medidas de seguridad avanzadas como encriptación.</li>
                        <li><a href="/privacy-policy">Política de Privacidad</a></li>
                    </ul>
                </article>
                <article className="help__section">
                    <h2>Tutoriales y Videos</h2>
                    <p>Explora nuestros <a href="/tutorials">videos guiados</a> y tutoriales interactivos para aprender a usar la app.</p>
                </article>
            </section>
        </div>
    );
};

export default Help;
