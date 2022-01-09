const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');


exports.nuevoUsuario = async (req, res) => {

//Mostrar error Express-Validator
const errores = validationResult(req);
if(!errores.isEmpty()){
    return res.status(400).json({errores: errores.array() });
}

//verificar que no exista el usuario
    const {email, password} = req.body;

    let usuario = await Usuario.findOne({email});

    if (usuario) {
        return res.status(400).json({
            msg: 'El usuario ya existe'
        });        
    }

//Si no existe, crear nuevo usuario
    usuario = new Usuario(req.body);

//Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);

try {
      await usuario.save();
        res.json({
          msg: 'Usuario creado'
        });
    } catch (error) {
    console.log(error);
    }
    }