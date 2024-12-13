const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db"); // Archivo para conectar a MongoDB
const authRoutes = require('./routes/auth');  // Importar las rutas de autenticación

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Conectar a MongoDB
connectDB();

const app = express();

// Middlewares globales
app.use(cors()); // Habilitar CORS para permitir solicitudes desde el frontend
app.use(express.json()); // Habilitar JSON para manejar solicitudes con cuerpo JSON

// Rutas de la aplicación
app.use("/api/auth", require("./routes/auth")); // Rutas para autenticación
app.use("/api/users", require("./routes/users")); // Rutas para usuarios

// Ruta base para comprobar el estado del servidor
app.get("/", (req, res) => {
    res.send("¡Servidor del proyecto Pagon está funcionando correctamente!");
});

// Configuración del puerto desde el archivo .env o usar 5000 por defecto
const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
