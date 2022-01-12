const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//crear servidor
const app = express();

//Conectar a la BBDD
conectarDB();
//Habilitar cors
console.log(process.env.FRONTEND_URL);
const opcionesCors = {
    origin: process.env.FRONTEND_URL
}

app.use(cors(opcionesCors));
//puerto app
const port = process.env.PORT || 4000;

//Habilita lectura de valores
app.use(express.json() );

//Habilitar carpeta publica 
app.use(express.static('uploads'));

//Rutas de la app
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/enlaces', require('./routes/enlaces'));
app.use('/api/archivos', require('./routes/archivos'));

//Arrancar App
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});