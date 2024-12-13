const jwt = require('jsonwebtoken');  // Para generar el token JWT
const User = require('../models/User');  // Importar el modelo de User
const bcrypt = require('bcryptjs');  // Para comparar las contraseñas

// Controlador de login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar al usuario por correo electrónico
        const users = await User.findOne({ email });
        if (!users) return res.status(400).json({ message: 'Credenciales inválidas' });

        // Comparar las contraseñas
        const isMatch = await bcrypt.compare(password, users.password);
        if (!isMatch) return res.status(400).json({ message: 'Credenciales inválidas' });

        // Generar el token JWT
        const token = jwt.sign({ id: users._id, role: users.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, users: { id: users._id, name: users.name, email: users.email } });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
