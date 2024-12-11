const express = require('express');
const router = express.Router();

// Rutas de ejemplo
router.get('/', (req, res) => {
    res.send('User route working!');
});

module.exports = router;
