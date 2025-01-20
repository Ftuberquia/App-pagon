const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Modelo de usuario


// Rutas de ejemplo
// router.get('/', (req, res) => {
//     res.send('¡La ruta del usuario funciona!');
// });

// module.exports = router;


// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const users = await User.find(); // Obtener todos los usuarios
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
});

// Ruta para suspender o habilitar un usuario
router.put('/:id/suspend', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        user.isSuspended = !user.isSuspended; // Alternar estado de suspensión
        await user.save();

        res.status(200).json({ message: `Usuario ${user.isSuspended ? 'suspendido' : 'habilitado'} exitosamente`, user });
    } catch (error) {
        console.error('Error al suspender/habilitar usuario:', error);
        res.status(500).json({ message: 'Error al modificar el estado del usuario' });
    }
});

// Ruta para actualizar información del usuario
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, otherFields } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Actualizar información del usuario
        user.name = name || user.name;
        user.email = email || user.email;
        user.balance = balance !== undefined ? balance : user.balance;
        if (otherFields) {
            Object.assign(user, otherFields);
        }

        await user.save();
        res.status(200).json({ message: 'Usuario actualizado exitosamente', user });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ message: 'Error al actualizar usuario' });
    }
});

module.exports = router;