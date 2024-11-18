import React from 'react';
import './Home.scss';

const Home = () => {
    return (
        <div className="home">
            <header className="home__header">
                <h1>Bienvenidos a paGon</h1>
                <p>Tu aplicación de pagos fáciles online</p>
            </header>
            <div className="home__actions">
                <button className="home__btn" onClick={() => window.location.href = '/login'}>Ingresar</button>
                <button className="home__btn" onClick={() => window.location.href = '/register'}>Registrarse</button>
            </div>
            <section className="home__message">
                <h3>Espacio para mensajes o actualizaciones generales</h3>
            </section>
        </div>
    );
};

export default Home;
