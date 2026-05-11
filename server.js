const express = require('express');

const app = express();
const PORT = 3000;

// Ruta GET
app.get('/saludo', (req, res) => {
    res.send('Hola desde mi servidor Express 🚀');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});