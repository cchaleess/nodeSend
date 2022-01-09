const Enlaces = require('../models/Enlace');
const {validationResult} = require('express-validator');
const shortid = require('shortid');
const bcrypt = require('bcrypt');

exports.nuevoEnlace = async (req, res, next) => {

//Revisar si hay errores

const errores = validationResult(req);
if(!errores.isEmpty()){
    return res.status(400).json({errores: errores.array() });
}

const {nombre_original, password} = req.body;

//Crear objeto de enlace
const enlace = new Enlaces();
enlace.url = shortid.generate();
enlace.nombre = shortid.generate();
enlace.nombre_original = nombre_original;

//Si el usuario esta autenticado
if(req.usuario){
    const {password, descargas} = req.body;
    //Asignar a enlace el numero de descargas
    if(descargas){
        enlace.descargas = descargas;
    }
    //Asignar password
    if(password){
        const salt = await bcrypt.genSalt(10);
        enlace.password = await bcrypt.hash(password, salt);
    }
    //Asignar el autor
    enlace.autor = req.usuario.id;
}

//Almacenar en BBDD
try {
    await enlace.save();
     return res.json({ msg: `${enlace.url}`});
    next();
} catch (error) {
    console.log(error);
}

}

//Obtener todos los enlaces
exports.obtenerEnlaces = async (req, res, next) => {
    
    //Verificar si existe el enlace
    const {url} = req.params;

    const enlace = await Enlaces.findOne({url});

    if(!enlace){
        return res.status(404).json({msg: 'Enlace no encontrado'});
        next();
    }
    console.log(enlace);
    res.json({archivo: enlace.nombre});

    //Si las descargas son iguales a 1: BORRAR EL ARCHIVO
    const {descargas, nombre} = enlace;

    if(descargas === 1){
        console.log('Solo 1 descarga');

        //Eliminar el archivo
        req.archivo = nombre;
        //Eliminar referencia BBDD
        await Enlaces.findOneAndRemove(req.params.url);
        next();

    }else{
        console.log('Mas de 1 descarga');
        enlace.descargas--;
        await enlace.save();
    }
    //Si las descargas son > 1: RESTAR DESCARGA
}
