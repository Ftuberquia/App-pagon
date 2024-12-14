const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Crear una nueva transacción
router.post('/', async (req, res) => {
    try {
        const { userId, amount, type } = req.body;
        if (amount < 2000) {
            return res.status(400).json({ message: 'La cantidad mínima es de 2000 pesos.' });
        }
        const newTransaction = new Transaction({
            userId,
            amount,
            type,
            status: 'completed',
            createdAt: new Date(),
        });
        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (err) {
        res.status(500).json({ message: 'Error al crear la transacción', error: err });
    }
});

// Endpoint para obtener el historial
// Ruta para obtener transacciones por userId
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // Validar si el userId tiene un formato correcto (opcional, si usas MongoDB ObjectId)
        if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'ID de usuario no válido.' });
        }

        // Buscar las transacciones del usuario
        const transactions = await Transaction.find({ userId })
            .sort({ createdAt: -1 })  // Ordenar por la fecha de creación (más recientes primero)
            .lean();  // Usar .lean() para obtener objetos puros de JavaScript

        if (!transactions || transactions.length === 0) {
            return res.status(404).json({ message: 'No se encontraron transacciones para este usuario.' });
        }

        // Responder con las transacciones
        res.status(200).json({ transactions });

    } catch (err) {
        // Manejo de errores
        console.error(err);  // Log de errores para debugging
        res.status(500).json({ message: 'Error al obtener el historial de transacciones', error: err.message });
    }
});

module.exports = router;
