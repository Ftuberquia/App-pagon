import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Help from './components/Help';
import Footer from './components/Footer';
import PublicHome from './components/PublicHome';
import Login from './pages/Login';
import Register from './pages/Register';
import UserHome from './pages/UserHome'; // Importa el componente de UserHome

// Componente para proteger rutas
const PrivateRoute = ({ element: Component }) => {
  const authUser = JSON.parse(localStorage.getItem('authUser'));
  return authUser ? <Component /> : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<PublicHome />} />
        <Route path="/help" element={<Help />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Ruta protegida */}
        <Route path="/home" element={<PrivateRoute element={UserHome} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
