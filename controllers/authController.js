const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});
const {validationResult} = require('express-validator');


exports.autenticarUsuario = async (req, res, next) => {

//Revisar si hay errores
const errores = validationResult(req);
if(!errores.isEmpty()){
    return res.status(400).json({errores: errores.array() });
}
//Buscar el usuario
const {email, password} = req.body;
const usuario = await Usuario.findOne({email});


if (!usuario) {
    return res.status(400).json({msg: 'El usuario no existe'});
    next();
}

//Verificar si la contraseña es correcta

if (bcrypt.compareSync(password, usuario.password)) {    
    
    //Crear el JWT
    const token = jwt.sign({
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email
    }, process.env.SECRETA, {
        expiresIn: process.env.CADUCIDAD_TOKEN
    });

   res.json({token});
   

    }else{
    res.status(401).json({msg: 'Contraseña incorrecta'});
    next();
    }
    
}


exports.usuarioAutenticado = async (req, res, next) => {
   res.json( {usuario : req.usuario} );
}

