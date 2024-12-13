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
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener el historial de transacciones', error: err });
    }
});

module.exports = router;
