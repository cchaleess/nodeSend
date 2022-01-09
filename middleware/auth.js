const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});

module.exports = (req, res, next) => {
    
const authHeader = req.get('Authorization');

    if (authHeader) {
       //Obtengo token
         const token = authHeader.split(' ')[1];
         //Comparar token
      
         try {
            const usuario = jwt.verify(token, process.env.SECRETA);
            req.usuario = usuario;

            } catch (error) {
               console.log('Token no válido');
               console.log(error);
            }
        }
        next();
    }
