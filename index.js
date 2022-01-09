const express = require('express');
const conectarDB = require('./config/db');

//crear servidor
const app = express();

//Conectar a la BBDD
conectarDB();

//puerto app
const port = process.env.PORT || 4000;

//Habilita lectura de valores
app.use(express.json() );

//Rutas de la app
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/enlaces', require('./routes/enlaces'));
app.use('/api/archivos', require('./routes/archivos'));

//Arrancar App
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});