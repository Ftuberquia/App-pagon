const express = require('express');
const router = express.Router();

// Rutas de ejemplo
router.get('/', (req, res) => {
    res.send('¡La ruta del usuario funciona!');
});

module.exports = router;
