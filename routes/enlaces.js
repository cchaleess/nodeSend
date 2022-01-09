const express = require('express');
const router = express.Router();
const enlacesController = require('../controllers/enlacesController');
const archivosController = require('../controllers/archivosController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post('/',
[
    check('nombre_original', 'El nombre original del enlace es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre del enlace es obligatorio').not().isEmpty()
],
    auth,
    enlacesController.nuevoEnlace 
    );

router.get('/:url',
    enlacesController.obtenerEnlaces, 
    archivosController.eliminarArchivo
    );

    module.exports = router;