const User = require('../models/User');  // Importar el modelo de User
const bcrypt = require('bcryptjs');      // Para cifrar contraseñas

// Controlador de registro
const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Comprobar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'El usuario ya existe' });

        // Crear el nuevo usuario
        const newUser = new User({
            name,
            email,
            password,  // La contraseña se cifrará automáticamente en el middleware del modelo
        });

        await newUser.save();  // Guardar el usuario en la base de datos
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
