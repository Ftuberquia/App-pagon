import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
// import Footer from './components/Footer';
import Home from './components/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;

