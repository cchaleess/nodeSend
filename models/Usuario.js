const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
    email: {
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria'],
        trim: true
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],
        trim: true
    },
});

    module.exports = mongoose.model('Usuarios', usuariosSchema);

