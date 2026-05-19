const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const SECRET_KEY = "mi_clave";

app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});

app.post('/login', (req, res) => {

    const { usuario, password } = req.body;

    if (usuario === "admin" && password === "1234") {

        const token = jwt.sign(
            { usuario: usuario },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.json({
            mensaje: "Login correcto",
            token: token
        });

    } else {
        res.status(401).json({
            mensaje: "Credenciales incorrectas"
        });
    }
});

function verificarToken(req, res, next) {

    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) {
        return res.status(403).json({
            mensaje: "Token requerido"
        });
    }

    const token = bearerHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err, datos) => {

        if (err) {
            return res.status(403).json({
                mensaje: "Token inválido"
            });
        }

        req.usuario = datos;
        next();
    });
}

app.get('/privado', verificarToken, (req, res) => {

    res.json({
        mensaje: "Acceso autorizado",
        usuario: req.usuario
    });

});

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});